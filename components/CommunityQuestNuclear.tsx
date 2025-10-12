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

export default function CommunityQuestNuclear() {
  const [showLevelBreakdown, setShowLevelBreakdown] = useState(false);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);
  const [showPointsGuide, setShowPointsGuide] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // NUCLEAR OPTION: Complete DOM reconstruction
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isChrome = /Chrome/.test(navigator.userAgent) && 
                     /Google Inc/.test(navigator.vendor) && 
                     !/Edge/.test(navigator.userAgent) &&
                     !/OPR/.test(navigator.userAgent);
    
    if (isChrome) {
      console.log('🚀 NUCLEAR OPTION: Complete DOM reconstruction for Chrome');
      
      const nuclearLayout = () => {
        // Find the main container
        const container = document.querySelector('.nuclear-container');
        if (!container) return;

        // Completely clear and rebuild the layout
        container.innerHTML = '';
        
        // Create the desktop layout structure
        const desktopLayout = document.createElement('div');
        desktopLayout.style.cssText = `
          display: flex !important;
          flex-direction: row !important;
          width: 100% !important;
          height: 500px !important;
          min-height: 500px !important;
          max-height: 500px !important;
          gap: 20px !important;
          position: relative !important;
          background-color: transparent !important;
        `;

        // Create profile section
        const profileSection = document.createElement('div');
        profileSection.style.cssText = `
          width: 30% !important;
          min-width: 30% !important;
          max-width: 30% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 15px !important;
          padding: 20px !important;
          box-sizing: border-box !important;
          background-color: transparent !important;
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
        `;

        // Create profile picture
        const profilePicture = document.createElement('div');
        profilePicture.style.cssText = `
          position: relative !important;
        `;
        profilePicture.innerHTML = `
          <div style="padding: 12px; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); background-color: #FA4616;">
            <div style="padding: 8px; border-radius: 50%; background-color: #FCF6F5;">
              <div style="width: 128px; height: 128px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); background-color: #f3f4f6; display: flex; align-items: center; justify-content: center;">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #60a5fa, #a855f7); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                  ${MOCK_USER.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
          <div style="position: absolute; bottom: -8px; right: -8px; width: 32px; height: 32px; background-color: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: bold; border: 2px solid white;">
            ${MOCK_USER.currentLevel}
          </div>
        `;

        // Create user info
        const userInfo = document.createElement('div');
        userInfo.style.cssText = `
          text-align: center !important;
        `;
        userInfo.innerHTML = `
          <div style="font-size: 0.875rem; color: #374151;">Community Member</div>
          <div style="font-size: 0.875rem; color: #2563eb;">Level ${MOCK_USER.currentLevel}</div>
          <div style="font-size: 0.75rem; color: #6b7280;">${((MOCK_LEVELS.find(l => l.level === MOCK_USER.totalPoints + 1)?.requiredPoints || MOCK_USER.totalPoints) - MOCK_USER.totalPoints)} points to level up</div>
        `;

        profileSection.appendChild(profilePicture);
        profileSection.appendChild(userInfo);

        // Create levels section
        const levelsSection = document.createElement('div');
        levelsSection.style.cssText = `
          width: 70% !important;
          min-width: 70% !important;
          max-width: 70% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: row !important;
          gap: 20px !important;
          padding: 20px !important;
          box-sizing: border-box !important;
          background-color: transparent !important;
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
        `;

        // Create left column
        const leftColumn = document.createElement('div');
        leftColumn.style.cssText = `
          width: 50% !important;
          min-width: 50% !important;
          max-width: 50% !important;
          height: 100% !important;
          overflow-y: auto !important;
          padding: 10px !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
        `;

        // Create right column
        const rightColumn = document.createElement('div');
        rightColumn.style.cssText = `
          width: 50% !important;
          min-width: 50% !important;
          max-width: 50% !important;
          height: 100% !important;
          overflow-y: auto !important;
          padding: 10px !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
        `;

        // Add levels to left column
        MOCK_LEVELS.slice(0, 5).forEach((level) => {
          const levelItem = document.createElement('div');
          levelItem.style.cssText = `
            display: flex !important;
            align-items: flex-start !important;
            gap: 12px !important;
            width: 100% !important;
            margin-bottom: 12px !important;
          `;
          
          const icon = level.level === 1 
            ? `<span style="font-size: 0.875rem; font-weight: bold; color: #10b981;">${level.level}</span>`
            : `<svg style="width: 16px; height: 16px; color: #9ca3af;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>`;
          
          levelItem.innerHTML = `
            <div style="width: 24px; height: 24px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              ${icon}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #374151;">
                Level ${level.level} - ${level.name}
              </div>
              <div style="font-size: 0.75rem; color: #6b7280;">
                ${level.requiredPoints}% of members
              </div>
            </div>
          `;
          
          leftColumn.appendChild(levelItem);
        });

        // Add levels to right column
        MOCK_LEVELS.slice(5).forEach((level) => {
          const levelItem = document.createElement('div');
          levelItem.style.cssText = `
            display: flex !important;
            align-items: flex-start !important;
            gap: 12px !important;
            width: 100% !important;
            margin-bottom: 12px !important;
          `;
          
          levelItem.innerHTML = `
            <div style="width: 24px; height: 24px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 16px; height: 16px; color: #9ca3af;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 0.875rem; font-weight: 500; color: #374151;">
                Level ${level.level} - ${level.name}
              </div>
              <div style="font-size: 0.75rem; color: #6b7280;">
                ${level.requiredPoints}% of members
              </div>
            </div>
          `;
          
          rightColumn.appendChild(levelItem);
        });

        levelsSection.appendChild(leftColumn);
        levelsSection.appendChild(rightColumn);

        desktopLayout.appendChild(profileSection);
        desktopLayout.appendChild(levelsSection);
        container.appendChild(desktopLayout);
      };

      // Apply nuclear layout
      nuclearLayout();
      
      // Reapply every 100ms
      const interval = setInterval(nuclearLayout, 100);
      
      // Watch for any changes
      const observer = new MutationObserver(() => {
        setTimeout(nuclearLayout, 50);
      });
      observer.observe(document.body, { 
        childList: true, 
        subtree: true
      });

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

      {/* Main Content with NUCLEAR DOM RECONSTRUCTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border border-border">
            {/* NUCLEAR CONTAINER - Will be completely rebuilt by JavaScript */}
            <div className="nuclear-container">
              {/* Fallback content for non-Chrome browsers */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  height: '500px',
                  minHeight: '500px',
                  maxHeight: '500px',
                  gap: '20px',
                  position: 'relative'
                }}
              >
                {/* Profile Section - 30% width */}
                <div 
                  style={{
                    width: '30%',
                    minWidth: '30%',
                    maxWidth: '30%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: 'transparent',
                    flexShrink: 0,
                    flexGrow: 0
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

                {/* Level Breakdown Section - 70% width */}
                <div 
                  style={{
                    width: '70%',
                    minWidth: '70%',
                    maxWidth: '70%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: 'transparent',
                    flexShrink: 0,
                    flexGrow: 0
                  }}
                >
                  {/* Left Column - Levels 1-5 - 50% width */}
                  <div 
                    style={{
                      width: '50%',
                      minWidth: '50%',
                      maxWidth: '50%',
                      height: '100%',
                      overflowY: 'auto',
                      padding: '10px',
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

                  {/* Right Column - Levels 6-9 - 50% width */}
                  <div 
                    style={{
                      width: '50%',
                      minWidth: '50%',
                      maxWidth: '50%',
                      height: '100%',
                      overflowY: 'auto',
                      padding: '10px',
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
