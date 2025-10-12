"use client";

import { useState, useEffect } from "react";
import { 
  Button, 
  TextField, 
  Avatar, 
  Badge, 
  Card, 
  Dialog, 
  Sheet,
  IconButton,
  Heading,
  Text,
  Separator
} from "frosted-ui";
import UserProfile from "./UserProfile";
import LeaderboardSection from "./LeaderboardSection";
import LevelBreakdown from "./LevelBreakdown";
import RewardsPanel from "./RewardsPanel";
import CommunityLevelsBreakdown from "./CommunityLevelsBreakdown";
import AdminPanel from "./AdminPanel";
import { MOCK_USER, MOCK_LEADERBOARD_WEEKLY, MOCK_LEADERBOARD_MONTHLY, MOCK_LEADERBOARD_ALLTIME, MOCK_LEVELS } from "@/lib/types";

export default function CommunityQuestPixelPerfect() {
  const [showLevelBreakdown, setShowLevelBreakdown] = useState(false);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);
  const [showPointsGuide, setShowPointsGuide] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Chrome-specific CSS injection to force desktop layout
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    if (isChrome) {
      // Inject Chrome-specific CSS with viewport units and transforms
      const style = document.createElement('style');
      style.textContent = `
        /* Chrome-specific overrides with viewport units */
        .chrome-desktop-force {
          display: flex !important;
          flex-direction: row !important;
          width: 100vw !important;
          height: 50vh !important;
          min-height: 50vh !important;
          max-height: 50vh !important;
          gap: 2vw !important;
          position: relative !important;
          transform: none !important;
        }
        .chrome-profile-force {
          width: 33.333vw !important;
          min-width: 33.333vw !important;
          max-width: 33.333vw !important;
          height: 50vh !important;
          min-height: 50vh !important;
          max-height: 50vh !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 1vh !important;
          padding: 1vh !important;
          box-sizing: border-box !important;
          background-color: transparent !important;
          flex-shrink: 0 !important;
          transform: translateX(0) !important;
        }
        .chrome-levels-force {
          width: 66.666vw !important;
          min-width: 66.666vw !important;
          max-width: 66.666vw !important;
          height: 50vh !important;
          min-height: 50vh !important;
          max-height: 50vh !important;
          display: flex !important;
          flex-direction: row !important;
          gap: 2vw !important;
          padding: 1vh !important;
          box-sizing: border-box !important;
          background-color: transparent !important;
          flex-shrink: 0 !important;
          transform: translateX(0) !important;
        }
        .chrome-levels-left {
          width: 50% !important;
          min-width: 50% !important;
          max-width: 50% !important;
          height: 100% !important;
          overflow-y: auto !important;
          padding: 0.5vh !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
        }
        .chrome-levels-right {
          width: 50% !important;
          min-width: 50% !important;
          max-width: 50% !important;
          height: 100% !important;
          overflow-y: auto !important;
          padding: 0.5vh !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
        }
        /* Force Chrome to respect our layout */
        * {
          box-sizing: border-box !important;
        }
        .chrome-main-container * {
          display: inherit !important;
        }
      `;
      document.head.appendChild(style);

      // Force Chrome layout with direct DOM manipulation using viewport units
      const forceChromeLayout = () => {
        const container = document.querySelector('.chrome-main-container') as HTMLElement;
        if (container) {
          container.style.setProperty('display', 'flex', 'important');
          container.style.setProperty('flex-direction', 'row', 'important');
          container.style.setProperty('width', '100vw', 'important');
          container.style.setProperty('height', '50vh', 'important');
          container.style.setProperty('min-height', '50vh', 'important');
          container.style.setProperty('max-height', '50vh', 'important');
          container.style.setProperty('gap', '2vw', 'important');
          container.style.setProperty('position', 'relative', 'important');
        }

        const profile = document.querySelector('.chrome-profile-section') as HTMLElement;
        if (profile) {
          profile.style.setProperty('width', '33.333vw', 'important');
          profile.style.setProperty('min-width', '33.333vw', 'important');
          profile.style.setProperty('max-width', '33.333vw', 'important');
          profile.style.setProperty('height', '50vh', 'important');
          profile.style.setProperty('min-height', '50vh', 'important');
          profile.style.setProperty('max-height', '50vh', 'important');
          profile.style.setProperty('display', 'flex', 'important');
          profile.style.setProperty('flex-direction', 'column', 'important');
          profile.style.setProperty('align-items', 'center', 'important');
          profile.style.setProperty('justify-content', 'center', 'important');
          profile.style.setProperty('gap', '1vh', 'important');
          profile.style.setProperty('padding', '1vh', 'important');
          profile.style.setProperty('box-sizing', 'border-box', 'important');
          profile.style.setProperty('flex-shrink', '0', 'important');
        }

        const levels = document.querySelector('.chrome-levels-section') as HTMLElement;
        if (levels) {
          levels.style.setProperty('width', '66.666vw', 'important');
          levels.style.setProperty('min-width', '66.666vw', 'important');
          levels.style.setProperty('max-width', '66.666vw', 'important');
          levels.style.setProperty('height', '50vh', 'important');
          levels.style.setProperty('min-height', '50vh', 'important');
          levels.style.setProperty('max-height', '50vh', 'important');
          levels.style.setProperty('display', 'flex', 'important');
          levels.style.setProperty('flex-direction', 'row', 'important');
          levels.style.setProperty('gap', '2vw', 'important');
          levels.style.setProperty('padding', '1vh', 'important');
          levels.style.setProperty('box-sizing', 'border-box', 'important');
          levels.style.setProperty('flex-shrink', '0', 'important');
        }

        const leftCol = document.querySelector('.chrome-levels-left') as HTMLElement;
        if (leftCol) {
          leftCol.style.setProperty('width', '50%', 'important');
          leftCol.style.setProperty('min-width', '50%', 'important');
          leftCol.style.setProperty('max-width', '50%', 'important');
          leftCol.style.setProperty('height', '100%', 'important');
          leftCol.style.setProperty('overflow-y', 'auto', 'important');
          leftCol.style.setProperty('padding', '0.5vh', 'important');
          leftCol.style.setProperty('box-sizing', 'border-box', 'important');
          leftCol.style.setProperty('flex-shrink', '0', 'important');
        }

        const rightCol = document.querySelector('.chrome-levels-right') as HTMLElement;
        if (rightCol) {
          rightCol.style.setProperty('width', '50%', 'important');
          rightCol.style.setProperty('min-width', '50%', 'important');
          rightCol.style.setProperty('max-width', '50%', 'important');
          rightCol.style.setProperty('height', '100%', 'important');
          rightCol.style.setProperty('overflow-y', 'auto', 'important');
          rightCol.style.setProperty('padding', '0.5vh', 'important');
          rightCol.style.setProperty('box-sizing', 'border-box', 'important');
          rightCol.style.setProperty('flex-shrink', '0', 'important');
        }
      };

      // Apply immediately and continuously for Chrome
      forceChromeLayout();
      const interval = setInterval(forceChromeLayout, 50); // More frequent for Chrome
      
      const observer = new MutationObserver(forceChromeLayout);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Removed for app store readiness */}

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4 sm:mx-8">
              <TextField.Root>
                <TextField.Slot>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </TextField.Slot>
                <TextField.Input placeholder="Search members..." />
              </TextField.Root>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <IconButton 
                variant="ghost" 
                size="2"
                onClick={() => setShowPointsGuide(true)}
                title="Points Guide"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </IconButton>

              <IconButton 
                variant="ghost" 
                size="2"
                onClick={() => setShowProfilePanel(true)}
                title="Profile"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                  C
                </div>
              </IconButton>

              <IconButton 
                variant="ghost" 
                size="2"
                onClick={() => setShowAdminPanel(true)}
                title="Admin Panel"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with PIXEL PERFECT DESKTOP LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border border-border">
            {/* PIXEL PERFECT DESKTOP LAYOUT - CSS GRID WITH EXPLICIT PIXELS */}
            <div 
              className="chrome-main-container chrome-desktop-force"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                height: '50vh',
                minHeight: '50vh',
                maxHeight: '50vh',
                gap: '2vw',
                position: 'relative'
              }}
            >
              {/* Profile Section - Fixed 400px width */}
              <div 
                className="chrome-profile-section chrome-profile-force"
                style={{
                  width: '33.333vw',
                  minWidth: '33.333vw',
                  maxWidth: '33.333vw',
                  height: '50vh',
                  minHeight: '50vh',
                  maxHeight: '50vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1vh',
                  padding: '1vh',
                  boxSizing: 'border-box',
                  backgroundColor: 'transparent',
                  flexShrink: 0
                }}
              >
                {/* Profile Picture */}
                <div className="relative">
                  <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                    <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
                        {MOCK_USER.avatar ? (
                          <img 
                            src={MOCK_USER.avatar} 
                            alt={MOCK_USER.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                            {MOCK_USER.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white">
                    {MOCK_USER.currentLevel}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center">
                  <div className="text-sm text-foreground">Community Member</div>
                  <div className="text-sm" style={{color: '#2563EB'}}>Level {MOCK_USER.currentLevel}</div>
                  <div className="text-xs text-muted-foreground">{((MOCK_LEVELS.find(l => l.level === MOCK_USER.totalPoints + 1)?.requiredPoints || MOCK_USER.totalPoints) - MOCK_USER.totalPoints)} points to level up</div>
                </div>
              </div>

              {/* Level Breakdown Section - Fixed 800px width */}
              <div 
                className="chrome-levels-section chrome-levels-force"
                style={{
                  width: '66.666vw',
                  minWidth: '66.666vw',
                  maxWidth: '66.666vw',
                  height: '50vh',
                  minHeight: '50vh',
                  maxHeight: '50vh',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '2vw',
                  padding: '1vh',
                  boxSizing: 'border-box',
                  backgroundColor: 'transparent',
                  flexShrink: 0
                }}
              >
                {/* Left Column - Levels 1-5 - Fixed 400px width */}
                <div 
                  className="chrome-levels-left"
                  style={{
                    width: '50%',
                    minWidth: '50%',
                    maxWidth: '50%',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '0.5vh',
                    boxSizing: 'border-box',
                    flexShrink: 0
                  }}
                >
                  <div className="space-y-3">
                    {MOCK_LEVELS.slice(0, 5).map((level) => (
                      <div key={level.level} className="flex items-start gap-3 w-full">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          {level.level === 1 ? (
                            <span className="text-sm font-bold" style={{color: '#10B981'}}>{level.level}</span>
                          ) : (
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">
                            Level {level.level} - {level.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {level.requiredPoints}% of members
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Levels 6-9 - Fixed 400px width */}
                <div 
                  className="chrome-levels-right"
                  style={{
                    width: '50%',
                    minWidth: '50%',
                    maxWidth: '50%',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '0.5vh',
                    boxSizing: 'border-box',
                    flexShrink: 0
                  }}
                >
                  <div className="space-y-3">
                    {MOCK_LEVELS.slice(5).map((level) => (
                      <div key={level.level} className="flex items-start gap-3 w-full">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">
                            Level {level.level} - {level.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {level.requiredPoints}% of members
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learn how points work button */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowPointsGuide(true)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Learn how points work
            </Button>
          </div>

          {/* Leaderboard Section */}
          <LeaderboardSection 
            weeklyLeaderboard={MOCK_LEADERBOARD_WEEKLY}
            monthlyLeaderboard={MOCK_LEADERBOARD_MONTHLY}
            allTimeLeaderboard={MOCK_LEADERBOARD_ALLTIME}
          />
        </div>
      </main>

      {/* Points Guide Modal */}
      {showPointsGuide && (
        <Dialog.Root open={showPointsGuide} onOpenChange={setShowPointsGuide}>
          <Dialog.Content size="4" className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold mb-6">How Points & Levels Work</Dialog.Title>
            
            <div className="space-y-6">
              {/* Points System */}
              <div>
                <Heading size="6" className="mb-4">Points System - How Members Earn Points</Heading>
                
                <div className="space-y-4">
                  <div>
                    <Heading size="5" className="mb-2">Chat & Communication (Daily Engagement)</Heading>
                    <ul className="space-y-1 text-sm">
                      <li>• Send a message in chat: 2 points</li>
                      <li>• Reply to someone's message: 3 points (encourages interaction)</li>
                      <li>• Start a meaningful discussion thread: 10 points</li>
                      <li>• Get 5+ reactions on your message: 5 bonus points</li>
                      <li>• Daily chat streak (7 days): 20 bonus points</li>
                    </ul>
                  </div>

                  <div>
                    <Heading size="5" className="mb-2">Forum Activity (Quality Content)</Heading>
                    <ul className="space-y-1 text-sm">
                      <li>• Create a forum post: 15 points</li>
                      <li>• Reply to a forum post: 8 points</li>
                      <li>• Get your post pinned by admin: 50 points</li>
                      <li>• Receive "helpful" reaction from 3+ members: 15 bonus points</li>
                      <li>• Create a post with 10+ replies: 25 bonus points</li>
                    </ul>
                  </div>

                  <div>
                    <Heading size="5" className="mb-2">Course & Learning</Heading>
                    <ul className="space-y-1 text-sm">
                      <li>• Complete a course module: 50 points</li>
                      <li>• Complete an entire course: 200 points</li>
                      <li>• Score 90%+ on a quiz: 30 bonus points</li>
                      <li>• Share course progress/wins: 20 points</li>
                    </ul>
                  </div>

                  <div>
                    <Heading size="5" className="mb-2">Community Value (Quality over Quantity)</Heading>
                    <ul className="space-y-1 text-sm">
                      <li>• Help another member (verified by admin): 40 points</li>
                      <li>• Share a valuable resource: 25 points</li>
                      <li>• Introduce yourself (one-time): 10 points</li>
                      <li>• Attend a live event/call: 75 points</li>
                      <li>• Weekly check-in post: 15 points</li>
                    </ul>
                  </div>

                  <div>
                    <Heading size="5" className="mb-2">Referrals & Growth</Heading>
                    <ul className="space-y-1 text-sm">
                      <li>• Refer a new member who joins: 100 points</li>
                      <li>• Referred member reaches Contributor tier: 50 bonus points</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tier Structure */}
              <div>
                <Heading size="6" className="mb-4">Tier Structure & Benefits</Heading>
                
                <div className="space-y-4">
                  {MOCK_LEVELS.map((level) => (
                    <div key={level.level} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-primary">{level.level}.</span>
                        <Heading size="5">{level.name}</Heading>
                        <Badge variant="soft" size="1">
                          {level.requiredPoints} points
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {level.perks}
                      </div>
                      {level.discountPercentage && level.discountPercentage > 0 && (
                        <div className="text-sm font-medium text-green-600">
                          {level.discountPercentage}% discount on all products
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Anti-Gaming */}
              <div>
                <Heading size="6" className="mb-4">Anti-Gaming Mechanisms</Heading>
                <ul className="space-y-1 text-sm">
                  <li>• Point decay: Lose 5% of points monthly if inactive (no activity for 30 days)</li>
                  <li>• Quality filters: Admin can revoke points for spam or low-quality posts</li>
                  <li>• Diminishing returns: After 10 chat messages per day, points reduce to 1 point per message</li>
                  <li>• Manual review: Posts earning 50+ points trigger admin review</li>
                  <li>• Cooldowns: Can only earn course completion points once per course</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button variant="soft" onClick={() => setShowPointsGuide(false)}>
                Got it!
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Rewards Panel */}
      {showRewardsPanel && (
        <RewardsPanel 
          user={MOCK_USER}
          isOpen={showRewardsPanel}
          onClose={() => setShowRewardsPanel(false)}
        />
      )}

      {/* Profile Panel */}
      {showProfilePanel && (
        <Sheet.Root open={showProfilePanel} onOpenChange={setShowProfilePanel}>
          <Sheet.Content className="max-w-md h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <Sheet.Title className="text-xl font-semibold">Profile</Sheet.Title>
              <Sheet.Close />
            </div>
            <div className="flex-1 p-4 overflow-y-auto min-h-0">
              <UserProfile 
                user={MOCK_USER}
                levels={MOCK_LEVELS}
                onShowLevelBreakdown={() => setShowLevelBreakdown(true)}
              />
            </div>
          </Sheet.Content>
        </Sheet.Root>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel 
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)} 
        />
      )}
    </div>
  );
}
