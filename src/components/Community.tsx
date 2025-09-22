import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

interface CommunityProps {
  tenderBoard: any;
}

export function Community({ tenderBoard }: CommunityProps) {
  const [voteStars, setVoteStars] = useState<Record<string, number>>({});
  const [voteEmojis, setVoteEmojis] = useState<Record<string, string>>({});
  const [voteBlurbs, setVoteBlurbs] = useState<Record<string, string>>({});

  const communityLeaderboard = tenderBoard.getCommunityLeaderboard();
  
  // Sample poll - in real app this would be dynamic
  const samplePoll = {
    aTenderId: 'canes',
    bTenderId: 'popeyes',
    votesA: 12,
    votesB: 8
  };

  const handleStarClick = (tenderId: string, stars: number) => {
    setVoteStars(prev => ({ ...prev, [tenderId]: stars }));
  };

  const handleVoteSubmit = async (tenderId: string) => {
    const stars = voteStars[tenderId];
    const emoji = voteEmojis[tenderId] || '👍';
    const blurb = voteBlurbs[tenderId] || '';

    if (!stars) return;

    const success = await tenderBoard.submitVote(tenderId, stars as any, emoji, blurb);
    
    if (success) {
      // Clear form
      setVoteStars(prev => ({ ...prev, [tenderId]: 0 }));
      setVoteEmojis(prev => ({ ...prev, [tenderId]: '' }));
      setVoteBlurbs(prev => ({ ...prev, [tenderId]: '' }));
    }
  };

  const handlePollVote = (side: 'A' | 'B') => {
    tenderBoard.votePoll(side);
  };

  const renderStarRating = (tenderId: string, currentRating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => handleStarClick(tenderId, star)}
          className={`star-rating transition-all duration-150 ${
            star <= currentRating ? 'text-yellow-400' : 'text-muted-foreground'
          }`}
        >
          <Star 
            size={20} 
            fill={star <= currentRating ? 'currentColor' : 'none'}
            className="hover:scale-110"
          />
        </button>
      ))}
    </div>
  );

  const VoteCard = ({ tender }: { tender: any }) => {
    const badges = tenderBoard.getBadges(tender);
    const hasVoted = tenderBoard.session.voted[tender.id];
    const currentStars = voteStars[tender.id] || 0;
    const currentEmoji = voteEmojis[tender.id] || '';
    const currentBlurb = voteBlurbs[tender.id] || '';

    return (
      <Card className="tender-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{tender.name}</CardTitle>
            {hasVoted && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ✅ Voted
              </Badge>
            )}
          </div>
          <div className="flex gap-1 flex-wrap">
            {badges.map((badge: string) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!hasVoted ? (
            <>
              {/* Star Rating */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">⭐ Your Rating</Label>
                {renderStarRating(tender.id, currentStars)}
              </div>

              {/* Emoji Picker */}
              <div className="space-y-2">
                <Label htmlFor={`emoji-${tender.id}`} className="text-sm font-medium">
                  😊 Emoji (optional)
                </Label>
                <Input
                  id={`emoji-${tender.id}`}
                  value={currentEmoji}
                  onChange={(e) => setVoteEmojis(prev => ({ 
                    ...prev, 
                    [tender.id]: e.target.value.slice(0, 2) 
                  }))}
                  placeholder="😋"
                  className="w-20 text-center text-lg"
                  maxLength={2}
                />
              </div>

              {/* Blurb */}
              <div className="space-y-2">
                <Label htmlFor={`blurb-${tender.id}`} className="text-sm font-medium">
                  💬 One-liner ({80 - currentBlurb.length} chars left)
                </Label>
                <Textarea
                  id={`blurb-${tender.id}`}
                  value={currentBlurb}
                  onChange={(e) => setVoteBlurbs(prev => ({ 
                    ...prev, 
                    [tender.id]: e.target.value.slice(0, 80) 
                  }))}
                  placeholder="Your hot take on this tender..."
                  className="h-20 text-sm"
                  maxLength={80}
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={() => handleVoteSubmit(tender.id)}
                disabled={!currentStars}
                className="w-full btn-golden"
              >
                🗳️ Submit Vote
              </Button>
            </>
          ) : (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-sm text-muted-foreground">
                Thanks for voting! One vote per tender per session.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">👥 Community Hub</CardTitle>
          <CardDescription className="text-lg">
            Vote, share opinions, and see what the community thinks!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Community Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Community Leaderboard</CardTitle>
          <CardDescription>Based on community votes and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" aria-live="polite">
            {communityLeaderboard.length > 0 ? communityLeaderboard.map((entry, index) => {
              const badges = tenderBoard.getBadges(entry.tender);
              const podiumClass = index === 0 ? 'podium-gold' : index === 1 ? 'podium-silver' : index === 2 ? 'podium-bronze' : '';
              
              return (
                <Card key={entry.tender.id} className={`hover-lift ${podiumClass} transition-all duration-200`}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{entry.tender.name}</h3>
                        <div className="flex gap-2 mt-1">
                          {badges.map((badge: string) => (
                            <Badge key={badge} variant="secondary" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {entry.avgStars.toFixed(1)}⭐
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.votes} {entry.votes === 1 ? 'vote' : 'votes'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }) : (
              <div className="text-center p-8 text-muted-foreground">
                <div className="text-4xl mb-4">🗳️</div>
                <p>No community votes yet. Be the first to vote!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Poll of the Day */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🥊 Poll of the Day</CardTitle>
          <CardDescription>The eternal debate: which reigns supreme?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => handlePollVote('A')}
              disabled={tenderBoard.session.pollVoted}
              className="h-20 text-xl btn-golden"
              variant={tenderBoard.session.pollVoted ? "outline" : "default"}
            >
              <div className="text-center">
                <div className="font-bold">🍗 Canes</div>
                <div className="text-sm opacity-75">
                  {samplePoll.votesA} votes
                </div>
              </div>
            </Button>
            
            <Button
              onClick={() => handlePollVote('B')}
              disabled={tenderBoard.session.pollVoted}
              className="h-20 text-xl btn-spicy"
              variant={tenderBoard.session.pollVoted ? "outline" : "default"}
            >
              <div className="text-center">
                <div className="font-bold">🔥 Popeyes</div>
                <div className="text-sm opacity-75">
                  {samplePoll.votesB} votes
                </div>
              </div>
            </Button>
          </div>
          
          {/* Poll Results */}
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold">Current Results:</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                Canes: {Math.round((samplePoll.votesA / (samplePoll.votesA + samplePoll.votesB)) * 100)}%
              </div>
              <div>
                Popeyes: {Math.round((samplePoll.votesB / (samplePoll.votesA + samplePoll.votesB)) * 100)}%
              </div>
            </div>
            {tenderBoard.session.pollVoted && (
              <Badge variant="secondary" className="mt-2">
                ✅ You've voted in this poll
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Voting Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">🗳️ Cast Your Votes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(tenderBoard.tenders).slice(0, 9).map((tender: any) => (
            <VoteCard key={tender.id} tender={tender} />
          ))}
        </div>
      </div>

      {/* Community Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">💬 Recent Hot Takes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tenderBoard.communityVotes.slice(-5).reverse().map((vote: any, index: number) => {
              const tender = tenderBoard.tenders[vote.tenderId];
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-xl">{vote.emoji || '👤'}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{tender?.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: vote.stars }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" className="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {vote.blurb && (
                      <p className="text-sm text-muted-foreground">{vote.blurb}</p>
                    )}
                  </div>
                </div>
              );
            })}
            
            {tenderBoard.communityVotes.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <div className="text-4xl mb-4">💬</div>
                <p>No comments yet. Share your thoughts!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}