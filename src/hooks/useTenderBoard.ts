import { useState, useEffect, useCallback } from 'react';
import { Tender, SessionVote, Poll, QuizVector, SEED_TENDERS, calculateOverall, getBadges, generateSessionId, DENY_LIST, PERSONALITY_BLURBS } from '@/data/tenderData';
import { useToast } from '@/hooks/use-toast';

interface SessionData {
  id: string;
  voted: Record<string, boolean>;
  pollVoted: boolean;
  lastSubmission: number;
}

interface TenderBoardState {
  tenders: Record<string, Tender>;
  communityVotes: SessionVote[];
  poll: Poll | null;
  session: SessionData;
}

const STORAGE_KEYS = {
  personal: 'tb:v1:personal',
  communityVotes: 'tb:v1:community:votes',
  poll: 'tb:v1:community:poll',
  session: 'tb:v1:session'
};

export function useTenderBoard() {
  const { toast } = useToast();
  const [state, setState] = useState<TenderBoardState>(() => {
    // Initialize from localStorage
    const personalData = JSON.parse(localStorage.getItem(STORAGE_KEYS.personal) || '{}');
    const communityVotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.communityVotes) || '[]');
    const poll = JSON.parse(localStorage.getItem(STORAGE_KEYS.poll) || 'null');
    let session = JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
    
    if (!session) {
      session = {
        id: generateSessionId(),
        voted: {},
        pollVoted: false,
        lastSubmission: 0
      };
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
    }

    // Merge seed data with personal data
    const tenders: Record<string, Tender> = {};
    SEED_TENDERS.forEach(tender => {
      const personal = personalData[tender.id];
      tenders[tender.id] = {
        ...tender,
        sub: personal?.sub || tender.sub,
        overall: personal?.overall || tender.overall,
        tries: personal?.tries || tender.tries,
        notes: personal?.notes || tender.notes
      };
    });

    return {
      tenders,
      communityVotes,
      poll,
      session
    };
  });

  const savePersonalData = useCallback(() => {
    const personalData: Record<string, any> = {};
    Object.values(state.tenders).forEach(tender => {
      personalData[tender.id] = {
        sub: tender.sub,
        overall: tender.overall,
        tries: tender.tries,
        notes: tender.notes
      };
    });
    localStorage.setItem(STORAGE_KEYS.personal, JSON.stringify(personalData));
  }, [state.tenders]);

  const saveCommunityData = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.communityVotes, JSON.stringify(state.communityVotes));
    localStorage.setItem(STORAGE_KEYS.poll, JSON.stringify(state.poll));
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(state.session));
  }, [state.communityVotes, state.poll, state.session]);

  useEffect(() => {
    savePersonalData();
  }, [savePersonalData]);

  useEffect(() => {
    saveCommunityData();
  }, [saveCommunityData]);

  const updateTender = useCallback((tenderId: string, updates: Partial<Tender>) => {
    setState(prev => ({
      ...prev,
      tenders: {
        ...prev.tenders,
        [tenderId]: {
          ...prev.tenders[tenderId],
          ...updates,
          overall: updates.sub ? calculateOverall(updates.sub) : prev.tenders[tenderId].overall
        }
      }
    }));
  }, []);

  const incrementTries = useCallback((tenderId: string) => {
    setState(prev => ({
      ...prev,
      tenders: {
        ...prev.tenders,
        [tenderId]: {
          ...prev.tenders[tenderId],
          tries: prev.tenders[tenderId].tries + 1
        }
      }
    }));
  }, []);

  const submitVote = useCallback(async (tenderId: string, stars: 1|2|3|4|5, emoji: string, blurb: string) => {
    // Validation
    if (state.session.voted[tenderId]) {
      toast({ title: "Already voted", description: "One vote per tender per session!", variant: "destructive" });
      return false;
    }

    if (blurb.length > 80) {
      toast({ title: "Too long", description: "Keep blurbs under 80 characters!", variant: "destructive" });
      return false;
    }

    // Throttling
    const now = Date.now();
    if (now - state.session.lastSubmission < 3000) {
      toast({ title: "Too fast—take a breath.", variant: "destructive" });
      return false;
    }

    // Deny list check
    const lowerBlurb = blurb.toLowerCase();
    if (DENY_LIST.some(word => lowerBlurb.includes(word))) {
      toast({ title: "Keep it classy.", variant: "destructive" });
      return false;
    }

    const vote: SessionVote = {
      tenderId,
      stars,
      emoji,
      blurb,
      ts: now
    };

    setState(prev => ({
      ...prev,
      communityVotes: [...prev.communityVotes, vote],
      session: {
        ...prev.session,
        voted: { ...prev.session.voted, [tenderId]: true },
        lastSubmission: now
      }
    }));

    toast({ title: "Vote submitted! 🍗" });
    return true;
  }, [state.session, toast]);

  const votePoll = useCallback((side: 'A' | 'B') => {
    if (!state.poll) return false;
    if (state.session.pollVoted) {
      toast({ title: "Already voted", description: "One poll vote per session!", variant: "destructive" });
      return false;
    }

    setState(prev => ({
      ...prev,
      poll: prev.poll ? {
        ...prev.poll,
        votesA: prev.poll.votesA + (side === 'A' ? 1 : 0),
        votesB: prev.poll.votesB + (side === 'B' ? 1 : 0)
      } : null,
      session: {
        ...prev.session,
        pollVoted: true
      }
    }));

    toast({ title: "Poll vote cast! 🗳️" });
    return true;
  }, [state.poll, state.session.pollVoted, toast]);

  const getPersonalLeaderboard = useCallback(() => {
    return Object.values(state.tenders)
      .sort((a, b) => {
        if (b.overall !== a.overall) return b.overall - a.overall;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 10);
  }, [state.tenders]);

  const getCommunityLeaderboard = useCallback(() => {
    const tenderVotes: Record<string, { stars: number[], count: number }> = {};
    
    state.communityVotes.forEach(vote => {
      if (!tenderVotes[vote.tenderId]) {
        tenderVotes[vote.tenderId] = { stars: [], count: 0 };
      }
      tenderVotes[vote.tenderId].stars.push(vote.stars);
      tenderVotes[vote.tenderId].count++;
    });

    return Object.entries(tenderVotes)
      .map(([tenderId, data]) => {
        const tender = state.tenders[tenderId];
        const avgStars = data.stars.reduce((sum, star) => sum + star, 0) / data.stars.length;
        return {
          tender,
          avgStars: Math.round(avgStars * 10) / 10,
          votes: data.count
        };
      })
      .sort((a, b) => {
        if (b.avgStars !== a.avgStars) return b.avgStars - a.avgStars;
        if (b.votes !== a.votes) return b.votes - a.votes;
        return a.tender.name.localeCompare(b.tender.name);
      })
      .slice(0, 10);
  }, [state.communityVotes, state.tenders]);

  const scoreQuiz = useCallback((answers: QuizVector) => {
    const scores = Object.values(state.tenders).map(tender => {
      let score = 0;
      
      // Calculate affinity score
      const tags = [tender.tags.heat, tender.tags.crunch, tender.tags.price, tender.tags.comfort, tender.tags.share, tender.tags.sauce];
      tags.forEach((tag, i) => {
        const diff = Math.abs(answers[i] - tag);
        if (diff === 0) score += 2;
        else if (diff === 1) score += 1;
      });
      
      // Icon bonus
      if (tender.name === "Canes" || tender.name === "Chick fil a" || tender.name === "Popeyes" || tender.name === "Kfc" || tender.name === "Albaik") {
        score += 1;
      }
      
      return { tender, score };
    });

    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.tender.name.localeCompare(b.tender.name);
    });

    const topResult = scores[0];
    const blurb = PERSONALITY_BLURBS[topResult.tender.id] || "Wildcard unit. You defy neat categories.";
    
    return {
      topMatch: { ...topResult.tender, blurb },
      top3: scores.slice(0, 3),
      recommendations: getRecommendations(answers)
    };
  }, [state.tenders]);

  const getRecommendations = useCallback((quizVector: QuizVector) => {
    const recommendations = Object.values(state.tenders).map(tender => {
      // Calculate affinity (0-12)
      const tags = [tender.tags.heat, tender.tags.crunch, tender.tags.price, tender.tags.comfort, tender.tags.share, tender.tags.sauce];
      const affinity = 12 - tags.reduce((sum, tag, i) => sum + Math.abs(quizVector[i] - tag), 0);
      
      // Blend with personal rating
      const prior = (tender.overall / 10) * 12;
      const final = 0.6 * affinity + 0.4 * prior;
      
      return { tender, affinity, final, prior: tender.overall };
    });

    return recommendations
      .sort((a, b) => b.final - a.final)
      .slice(0, 5)
      .map(rec => ({
        ...rec.tender,
        reason: `Affinity: ${rec.affinity}/12 • Your rating: ${rec.prior || 'n/a'}/10`
      }));
  }, [state.tenders]);

  const calculateTwinCompatibility = useCallback((vectorA: QuizVector, vectorB: QuizVector) => {
    const diff = vectorA.reduce((sum, val, i) => sum + Math.abs(val - vectorB[i]), 0);
    const compat = Math.round(100 - (diff / 12) * 100);
    
    let compatText = "Opposites snack-tract.";
    if (compat >= 90) compatText = "Sauce-mates.";
    else if (compat >= 70) compatText = "Crisp compatible.";
    
    return { compat, compatText };
  }, []);

  const getRandomTender = useCallback(() => {
    const tenderList = Object.values(state.tenders);
    return tenderList[Math.floor(Math.random() * tenderList.length)];
  }, [state.tenders]);

  const exportData = useCallback(() => {
    return JSON.stringify({
      personal: Object.fromEntries(
        Object.entries(state.tenders).map(([id, tender]) => [
          id,
          { sub: tender.sub, overall: tender.overall, tries: tender.tries, notes: tender.notes }
        ])
      ),
      community: state.communityVotes,
      poll: state.poll
    }, null, 2);
  }, [state]);

  const importData = useCallback((jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      
      // Update tenders with imported personal data
      const updatedTenders = { ...state.tenders };
      if (data.personal) {
        Object.entries(data.personal).forEach(([id, personalData]: [string, any]) => {
          if (updatedTenders[id]) {
            updatedTenders[id] = {
              ...updatedTenders[id],
              sub: personalData.sub || updatedTenders[id].sub,
              overall: personalData.overall || updatedTenders[id].overall,
              tries: personalData.tries || updatedTenders[id].tries,
              notes: personalData.notes || updatedTenders[id].notes
            };
          }
        });
      }

      setState(prev => ({
        ...prev,
        tenders: updatedTenders,
        communityVotes: data.community || prev.communityVotes,
        poll: data.poll || prev.poll
      }));

      toast({ title: "Data imported successfully! 🎉" });
      return true;
    } catch (error) {
      toast({ title: "Invalid JSON", description: "Please check your data format.", variant: "destructive" });
      return false;
    }
  }, [state.tenders, toast]);

  const resetAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      tenders: Object.fromEntries(SEED_TENDERS.map(tender => [tender.id, { ...tender }])),
      communityVotes: [],
      poll: null,
      session: {
        ...prev.session,
        voted: {},
        pollVoted: false
      }
    }));
    
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    
    toast({ title: "All data reset! 🔄" });
  }, [toast]);

  return {
    tenders: state.tenders,
    communityVotes: state.communityVotes,
    poll: state.poll,
    session: state.session,
    
    // Actions
    updateTender,
    incrementTries,
    submitVote,
    votePoll,
    
    // Computed data
    getPersonalLeaderboard,
    getCommunityLeaderboard,
    scoreQuiz,
    getRecommendations,
    calculateTwinCompatibility,
    getRandomTender,
    
    // I/O
    exportData,
    importData,
    resetAll,
    
    // Utilities
    getBadges: (tender: Tender) => getBadges(tender)
  };
}