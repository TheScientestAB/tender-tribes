import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { QUIZ_QUESTIONS, QuizVector } from '@/data/tenderData';

interface QuizProps {
  tenderBoard: any;
}

export function Quiz({ tenderBoard }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(6).fill(null));
  const [result, setResult] = useState<any>(null);
  const [showTwinFlow, setShowTwinFlow] = useState(false);
  const [twinAnswers, setTwinAnswers] = useState<(number | null)[]>(new Array(6).fill(null));
  const [twinResult, setTwinResult] = useState<any>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPartnerMatch, setShowPartnerMatch] = useState(false);
  const [partnerResult, setPartnerResult] = useState<any>(null);

  const isQuizComplete = answers.every(answer => answer !== null);
  const isTwinQuizComplete = twinAnswers.every(answer => answer !== null);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleTwinAnswerChange = (questionIndex: number, value: string) => {
    const newTwinAnswers = [...twinAnswers];
    newTwinAnswers[questionIndex] = parseInt(value);
    setTwinAnswers(newTwinAnswers);
  };

  const submitQuiz = () => {
    if (!isQuizComplete) return;
    
    const quizVector = answers as QuizVector;
    const quizResult = tenderBoard.scoreQuiz(quizVector);
    
    setResult({ ...quizResult, vector: quizVector });
    setIsFlipped(true);
  };

  const submitTwinQuiz = () => {
    if (!isTwinQuizComplete || !result) return;
    
    const twinVector = twinAnswers as QuizVector;
    const compatibility = tenderBoard.calculateTwinCompatibility(result.vector, twinVector);
    
    // Get shared recommendations
    const userRecs = result.recommendations;
    const twinRecs = tenderBoard.getRecommendations(twinVector);
    const sharedRecs = userRecs.filter((rec: any) => 
      twinRecs.some((twinRec: any) => twinRec.id === rec.id)
    ).slice(0, 3);
    
    setTwinResult({
      compatibility,
      sharedRecs,
      twinVector
    });
  };

  const findMyPartner = () => {
    if (!result) return;
    
    const partnerMatch = tenderBoard.findPartnerMatch(result.vector);
    setPartnerResult(partnerMatch);
    setShowPartnerMatch(true);
  };

  const resetQuiz = () => {
    setAnswers(new Array(6).fill(null));
    setResult(null);
    setIsFlipped(false);
    setShowTwinFlow(false);
    setTwinAnswers(new Array(6).fill(null));
    setTwinResult(null);
    setShowPartnerMatch(false);
    setPartnerResult(null);
  };

  const renderQuizForm = (
    currentAnswers: (number | null)[], 
    onAnswerChange: (index: number, value: string) => void,
    title: string,
    description: string
  ) => (
    <Card className="tender-card">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {QUIZ_QUESTIONS.map((question, index) => (
          <div key={index} className="space-y-3">
            <Label className="text-lg font-semibold">
              {index + 1}. {question.question}
            </Label>
            <RadioGroup
              value={currentAnswers[index]?.toString() || ''}
              onValueChange={(value) => onAnswerChange(index, value)}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value.toString()} 
                    id={`${title}-q${index}-${option.value}`}
                  />
                  <Label 
                    htmlFor={`${title}-q${index}-${option.value}`}
                    className="cursor-pointer hover:text-primary transition-colors"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">🧪 Tender Personality Quiz</CardTitle>
          <CardDescription className="text-lg">
            Discover your perfect tender match based on your taste preferences and eating style!
          </CardDescription>
        </CardHeader>
      </Card>

      {!result && renderQuizForm(
        answers, 
        handleAnswerChange, 
        "🍗 What's Your Tender Type?", 
        "Answer these questions to find your perfect match"
      )}

      {!result && (
        <div className="text-center">
          <Button
            onClick={submitQuiz}
            disabled={!isQuizComplete}
            className="btn-golden text-lg px-8 py-3"
            size="lg"
          >
            🎯 Find My Match
          </Button>
        </div>
      )}

      {/* Quiz Result */}
      {result && (
        <div className="space-y-6">
          <Card className={`tender-card text-center quiz-flip ${isFlipped ? 'flipped' : ''}`}>
            <CardContent className="p-8">
              <div className="text-6xl mb-4">🍗</div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                You are: {result.topMatch.name}
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                {result.topMatch.blurb}
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                {tenderBoard.getBadges(result.topMatch).map((badge: string) => (
                  <Badge key={badge} variant="secondary" className="text-lg p-2">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top 3 Matches */}
          <Card>
            <CardHeader>
              <CardTitle>🏆 Your Top 3 Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {result.top3.map((match: any, index: number) => (
                  <div key={match.tender.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </div>
                      <span className="font-semibold">{match.tender.name}</span>
                    </div>
                    <div className="text-sm font-mono">
                      Score: {match.score}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Personalized Recommendations</CardTitle>
              <CardDescription>Based on your quiz results and personal ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {result.recommendations.map((rec: any, index: number) => (
                  <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg bg-card border">
                    <div>
                      <div className="font-semibold">{rec.name}</div>
                      <div className="text-sm text-muted-foreground">{rec.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tender Twin CTA */}
          {!showTwinFlow && !showPartnerMatch && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">💕 Find Your Tender Twin</h3>
                  <p className="text-muted-foreground mb-4">
                    Get a friend to take the quiz and see your compatibility!
                  </p>
                  <Button
                    onClick={() => setShowTwinFlow(true)}
                    className="btn-spicy text-lg px-6 py-3"
                  >
                    🔍 Find My Twin
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">💘 Find My Partner</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover your ideal life partner based on tender preferences!
                  </p>
                  <Button
                    onClick={findMyPartner}
                    className="btn-golden text-lg px-6 py-3"
                  >
                    💞 Find My Match
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Partner Match Result */}
      {showPartnerMatch && partnerResult && (
        <div className="space-y-6">
          <Separator />
          <Card className="tender-card text-center">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Your Tender Life Partner is...
              </h2>
              
              <div className="text-8xl mb-6">{partnerResult.emoji}</div>
              <h3 className="text-4xl font-bold mb-4 text-primary">
                {partnerResult.name}
              </h3>
              
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">
                  {partnerResult.compatibility}% Compatible
                </div>
                <div className="w-full bg-muted rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${partnerResult.compatibility}%` }}
                  ></div>
                </div>
                <p className="text-xl font-semibold text-primary mb-4">
                  {partnerResult.compatText}
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {partnerResult.blurb}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tender Twin Flow */}
      {showTwinFlow && (
        <div className="space-y-6">
          <Separator />
          
          {renderQuizForm(
            twinAnswers,
            handleTwinAnswerChange,
            "👯 Twin Quiz",
            "Have your friend answer the same questions"
          )}

          <div className="text-center">
            <Button
              onClick={submitTwinQuiz}
              disabled={!isTwinQuizComplete}
              className="btn-spicy text-lg px-8 py-3"
              size="lg"
            >
              💕 Calculate Compatibility
            </Button>
          </div>

          {/* Twin Result */}
          {twinResult && (
            <Card className="tender-card text-center">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">💕</div>
                <h2 className="text-3xl font-bold mb-2">
                  {twinResult.compatibility.compat}% Compatible
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  {twinResult.compatibility.compatText}
                </p>
                
                {twinResult.sharedRecs.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">🤝 Shared Favorites</h3>
                    <div className="grid gap-2">
                      {twinResult.sharedRecs.map((rec: any) => (
                        <div key={rec.id} className="p-2 rounded bg-primary/10 text-primary font-semibold">
                          {rec.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Reset Button */}
      {(result || showTwinFlow || showPartnerMatch) && (
        <div className="text-center">
          <Button onClick={resetQuiz} variant="outline" className="hover-lift">
            🔄 Take Quiz Again
          </Button>
        </div>
      )}
    </div>
  );
}