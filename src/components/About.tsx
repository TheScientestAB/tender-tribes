import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BADGE_DEFINITIONS } from '@/data/tenderData';

export function About() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl">ℹ️ About TenderBoard</CardTitle>
          <CardDescription className="text-lg">
            The definitive guide to our rating system, badges, and methodology
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Rating Methodology */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">📊 Rating Methodology</CardTitle>
          <CardDescription>How we calculate the perfect tender score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-base leading-relaxed">
            <p className="mb-4">
              Every tender is evaluated across <strong>six key metrics</strong>, each rated from 0-10:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">👅</span>
                  <div>
                    <div className="font-semibold">Taste (40%)</div>
                    <div className="text-sm text-muted-foreground">The most important factor</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">🥨</span>
                  <div>
                    <div className="font-semibold">Crunch (15%)</div>
                    <div className="text-sm text-muted-foreground">That satisfying texture</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">💧</span>
                  <div>
                    <div className="font-semibold">Juiciness (15%)</div>
                    <div className="text-sm text-muted-foreground">Moisture is key</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">🍞</span>
                  <div>
                    <div className="font-semibold">Breading (10%)</div>
                    <div className="text-sm text-muted-foreground">Quality of the coating</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">🥫</span>
                  <div>
                    <div className="font-semibold">Sauce-Synergy (10%)</div>
                    <div className="text-sm text-muted-foreground">How well it pairs</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-2xl">💰</span>
                  <div>
                    <div className="font-semibold">Value (10%)</div>
                    <div className="text-sm text-muted-foreground">Bang for your buck</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">
              <p className="font-semibold mb-2">🧮 Overall Score Calculation:</p>
              <p className="text-sm">
                For simplicity in the app, we use a simple average of all six metrics. 
                The percentages above reflect our thinking process, but the displayed score 
                is: <code className="bg-muted px-2 py-1 rounded font-mono">(taste + crunch + juiciness + breading + sauce + value) ÷ 6</code>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge System */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏆 Badge System</CardTitle>
          <CardDescription>Special achievements and recognitions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(BADGE_DEFINITIONS).map(([emoji, badge]) => (
              <div key={emoji} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="text-3xl">{emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{badge.name}</div>
                  <div className="text-muted-foreground">{badge.description}</div>
                  <div className="text-sm mt-1 opacity-75">
                    {emoji === '🔥' && 'Awarded to tenders with maximum heat (spicy=2)'}
                    {emoji === '💸' && 'Budget-friendly (price=0) AND high quality (overall ≥ 8.0)'}
                    {emoji === '🧈' && 'Ultimate comfort food experience (comfort=0)'}
                    {emoji === '⭐' && 'Legendary status in the tender world'}
                    {emoji === '🧪' && 'High overall (≥8.0) despite mild heat AND soft crunch'}
                    {emoji === '🏆' && 'Dedication through repetition (3+ tries)'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz System */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🧪 Quiz & Recommendations</CardTitle>
          <CardDescription>How we match you with your perfect tender</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-base leading-relaxed space-y-4">
            <p>
              Our quiz analyzes your preferences across <strong>six personality axes</strong>:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>🌶️ <strong>Heat Tolerance:</strong> Mild → Medium → Spicy</div>
              <div>🥨 <strong>Crunch Preference:</strong> Soft → Balanced → Crispy</div>
              <div>💰 <strong>Budget Style:</strong> Budget → Flexible → Premium</div>
              <div>🎲 <strong>Chaos Level:</strong> Planned → Balanced → Freestyle</div>
              <div>🤝 <strong>Share Style:</strong> Solo → Sometimes → Host</div>
              <div>🥫 <strong>Sauce Identity:</strong> Dry → Classic → Signature</div>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">
              <p className="font-semibold mb-2">🎯 Matching Algorithm:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Exact match:</strong> +2 points per axis</li>
                <li>• <strong>Adjacent match:</strong> +1 point per axis</li>
                <li>• <strong>Icon bonus:</strong> +1 point for legendary brands</li>
                <li>• <strong>Recommendations blend:</strong> 60% quiz affinity + 40% your personal ratings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Community Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">👥 Community Features</CardTitle>
          <CardDescription>How the community leaderboard and voting works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-base leading-relaxed space-y-4">
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">🗳️ Voting System</h4>
                <ul className="text-sm space-y-1">
                  <li>• One vote per tender per session</li>
                  <li>• Rate 1-5 stars + optional emoji + 80-character blurb</li>
                  <li>• Community leaderboard based on average star ratings</li>
                  <li>• Content moderation for appropriate language</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">🥊 Poll of the Day</h4>
                <ul className="text-sm space-y-1">
                  <li>• Head-to-head battles between popular tenders</li>
                  <li>• One vote per session</li>
                  <li>• Live percentage and vote count updates</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">💕 Tender Twin</h4>
                <ul className="text-sm space-y-1">
                  <li>• Compatibility based on quiz answer differences</li>
                  <li>• Scale: 0-100% compatibility</li>
                  <li>• Shows shared favorite tender recommendations</li>
                  <li>• Fun compatibility messages based on score ranges</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-muted">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            All ratings and opinions expressed on TenderBoard are subjective and intended for entertainment purposes only. 
            We are not sponsored by any of the chicken tender establishments mentioned. 
            In class mode, all data is stored locally on your device and is not shared externally.
            Your mileage may vary, and remember - the best tender is the one you enjoy! 🍗
          </p>
          
          <div className="mt-4 pt-4 border-t border-muted-foreground/20">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for chicken tender enthusiasts everywhere
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}