import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { calculateOverall } from '@/data/tenderData';

interface ReviewsProps {
  tenderBoard: any;
}

export function Reviews({ tenderBoard }: ReviewsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTenders = Object.values(tenderBoard.tenders).filter((tender: any) =>
    tender.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateSubMetric = (tenderId: string, metric: string, value: number) => {
    const tender = tenderBoard.tenders[tenderId];
    const newSub = { ...tender.sub, [metric]: value };
    const newOverall = calculateOverall(newSub);
    
    tenderBoard.updateTender(tenderId, {
      sub: newSub,
      overall: newOverall
    });
  };

  const updateNotes = (tenderId: string, notes: string) => {
    tenderBoard.updateTender(tenderId, { notes });
  };

  const SubMetricSlider = ({ 
    label, 
    value, 
    onChange, 
    emoji 
  }: { 
    label: string; 
    value: number; 
    onChange: (value: number) => void;
    emoji: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        {emoji} {label}
        <span className="ml-auto font-bold text-primary">{value}/10</span>
      </Label>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={10}
        step={0.1}
        className="tender-slider"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📝 Personal Reviews</CardTitle>
          <CardDescription>
            Rate your chicken tender experiences across six key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              placeholder="Search tenders... 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tender Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenders.map((tender: any) => {
          const badges = tenderBoard.getBadges(tender);
          
          return (
            <Card key={tender.id} className="tender-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tender.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {tender.overall.toFixed(1)}
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {badges.map(badge => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Sub-Metrics Sliders */}
                <div className="space-y-3">
                  <SubMetricSlider
                    label="Taste"
                    emoji="👅"
                    value={tender.sub.taste}
                    onChange={(value) => updateSubMetric(tender.id, 'taste', value)}
                  />
                  <SubMetricSlider
                    label="Crunch"
                    emoji="🥨"
                    value={tender.sub.crunch}
                    onChange={(value) => updateSubMetric(tender.id, 'crunch', value)}
                  />
                  <SubMetricSlider
                    label="Juiciness"
                    emoji="💧"
                    value={tender.sub.juiciness}
                    onChange={(value) => updateSubMetric(tender.id, 'juiciness', value)}
                  />
                  <SubMetricSlider
                    label="Breading"
                    emoji="🍞"
                    value={tender.sub.breading}
                    onChange={(value) => updateSubMetric(tender.id, 'breading', value)}
                  />
                  <SubMetricSlider
                    label="Sauce"
                    emoji="🥫"
                    value={tender.sub.sauce}
                    onChange={(value) => updateSubMetric(tender.id, 'sauce', value)}
                  />
                  <SubMetricSlider
                    label="Value"
                    emoji="💰"
                    value={tender.sub.value}
                    onChange={(value) => updateSubMetric(tender.id, 'value', value)}
                  />
                </div>

                {/* Try Counter */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Button
                    onClick={() => tenderBoard.incrementTries(tender.id)}
                    variant="outline"
                    size="sm"
                    className="hover-lift"
                  >
                    +Tried ({tender.tries})
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Overall: <span className="font-bold text-primary">{tender.overall.toFixed(1)}/10</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor={`notes-${tender.id}`} className="text-sm">
                    📝 Notes
                  </Label>
                  <Textarea
                    id={`notes-${tender.id}`}
                    value={tender.notes}
                    onChange={(e) => updateNotes(tender.id, e.target.value)}
                    placeholder="Your thoughts on this tender..."
                    className="h-20 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTenders.length === 0 && (
        <Card className="text-center p-8">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-muted-foreground">
            No tenders found matching "{searchTerm}"
          </p>
        </Card>
      )}
    </div>
  );
}