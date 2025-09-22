import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

interface HomeProps {
  tenderBoard: any;
}

export function Home({ tenderBoard }: HomeProps) {
  const [leaderboardMode, setLeaderboardMode] = useState<'personal' | 'community'>('personal');
  const [randomPick, setRandomPick] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [importExportData, setImportExportData] = useState('');
  const [showIOPanel, setShowIOPanel] = useState(false);

  const personalLeaderboard = tenderBoard.getPersonalLeaderboard();
  const communityLeaderboard = tenderBoard.getCommunityLeaderboard();

  const handleRandomTender = () => {
    const random = tenderBoard.getRandomTender();
    setRandomPick(random);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleExport = () => {
    const data = tenderBoard.exportData();
    setImportExportData(data);
    setShowIOPanel(true);
  };

  const handleImport = () => {
    if (importExportData.trim()) {
      tenderBoard.importData(importExportData);
      setImportExportData('');
      setShowIOPanel(false);
    }
  };

  const CountUpNumber = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      const duration = 600;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current * 10) / 10);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <span className="count-up font-bold tabular-nums">
        {displayValue.toFixed(1)}{suffix}
      </span>
    );
  };

  const renderPersonalLeaderboard = () => (
    <div className="space-y-4">
      {personalLeaderboard.map((tender, index) => {
        const badges = tenderBoard.getBadges(tender);
        const podiumClass = index === 0 ? 'podium-gold' : index === 1 ? 'podium-silver' : index === 2 ? 'podium-bronze' : '';
        
        return (
          <Card key={tender.id} className={`hover-lift ${podiumClass} transition-all duration-200`}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{tender.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {badges.map(badge => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  <CountUpNumber value={tender.overall} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {tender.tries} {tender.tries === 1 ? 'try' : 'tries'}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderCommunityLeaderboard = () => (
    <div className="space-y-4">
      {communityLeaderboard.map((entry, index) => {
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
                    {badges.map(badge => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  <CountUpNumber value={entry.avgStars} />⭐
                </div>
                <div className="text-sm text-muted-foreground">
                  {entry.votes} {entry.votes === 1 ? 'vote' : 'votes'}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Random Tender of the Day */}
      <Card className="tender-card text-center">
        <CardHeader>
          <CardTitle className="text-2xl">🎲 Random Tender of the Day</CardTitle>
          <CardDescription>Feeling lucky? Let fate choose your next tender adventure!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleRandomTender}
            className="btn-golden text-lg px-8 py-3"
            size="lg"
          >
            🎰 Roll the Dice
          </Button>
          
          {randomPick && (
            <div className={`text-center p-4 rounded-lg bg-gradient-golden text-primary-foreground ${showConfetti ? 'animate-star-pop' : 'animate-slide-up'}`}>
              <div className="text-3xl font-bold mb-2">{randomPick.name} 🍗</div>
              <div className="text-lg opacity-90">Your destiny awaits!</div>
              {showConfetti && (
                <div className="animate-confetti">🎉 🍗 🎉 🍗 🎉</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leaderboard Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Leaderboards</CardTitle>
          <RadioGroup 
            value={leaderboardMode} 
            onValueChange={(value: 'personal' | 'community') => setLeaderboardMode(value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personal" id="personal" />
              <Label htmlFor="personal">Personal Ratings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="community" id="community" />
              <Label htmlFor="community">Community Votes</Label>
            </div>
          </RadioGroup>
        </CardHeader>
        <CardContent>
          <div aria-live="polite">
            {leaderboardMode === 'personal' ? renderPersonalLeaderboard() : renderCommunityLeaderboard()}
          </div>
        </CardContent>
      </Card>

      {/* I/O Controls */}
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button 
              onClick={handleExport}
              variant="outline"
              className="hover-lift"
            >
              📤 Export Data
            </Button>
            <Button 
              onClick={() => setShowIOPanel(true)}
              variant="outline"
              className="hover-lift"
            >
              📥 Import Data
            </Button>
            <Button 
              onClick={tenderBoard.resetAll}
              variant="destructive"
              className="hover-lift"
            >
              🔄 Reset All
            </Button>
          </div>

          {showIOPanel && (
            <div className="space-y-4 animate-slide-up">
              <Separator />
              <div>
                <Label htmlFor="ioBox">Import/Export JSON Data</Label>
                <Textarea
                  id="ioBox"
                  value={importExportData}
                  onChange={(e) => setImportExportData(e.target.value)}
                  placeholder="Paste your JSON data here to import..."
                  className="mt-2 h-32 font-mono text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleImport} className="btn-golden">
                  Import
                </Button>
                <Button onClick={() => setShowIOPanel(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}