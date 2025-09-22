import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenderBoard } from '@/hooks/useTenderBoard';
import { Home } from './Home';
import { Reviews } from './Reviews';
import { Quiz } from './Quiz';
import { Community } from './Community';
import { About } from './About';

export function TenderBoard() {
  const [activeTab, setActiveTab] = useState('home');
  const tenderBoard = useTenderBoard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
            <span className="bg-gradient-golden bg-clip-text text-transparent">
              TenderBoard 🍗
            </span>
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            The ultimate chicken tender rating experience
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger 
              value="home" 
              className="data-[state=active]:btn-golden transition-all duration-200"
            >
              🏆 Home
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:btn-golden transition-all duration-200"
            >
              📝 Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="quiz" 
              className="data-[state=active]:btn-golden transition-all duration-200"
            >
              🧪 Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:btn-golden transition-all duration-200"
            >
              👥 Community
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="data-[state=active]:btn-golden transition-all duration-200"
            >
              ℹ️ About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="animate-slide-up">
            <Home tenderBoard={tenderBoard} />
          </TabsContent>

          <TabsContent value="reviews" className="animate-slide-up">
            <Reviews tenderBoard={tenderBoard} />
          </TabsContent>

          <TabsContent value="quiz" className="animate-slide-up">
            <Quiz tenderBoard={tenderBoard} />
          </TabsContent>

          <TabsContent value="community" className="animate-slide-up">
            <Community tenderBoard={tenderBoard} />
          </TabsContent>

          <TabsContent value="about" className="animate-slide-up">
            <About />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}