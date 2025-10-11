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
import EngagementTracker from "./EngagementTracker";
import NotificationDropdown from "./NotificationDropdown";
import { MOCK_USER, MOCK_LEADERBOARD_WEEKLY, MOCK_LEADERBOARD_MONTHLY, MOCK_LEADERBOARD_ALLTIME, MOCK_LEVELS, User } from "@/lib/types";
import { useEngagementData } from "@/hooks/useEngagementData";

interface CommunityQuestProps {
  user: User;
}

export default function CommunityQuestClient({ user: initialUser }: CommunityQuestProps) {
  const { user, refreshEngagementData, isLoading } = useEngagementData(initialUser);
  const [showLevelBreakdown, setShowLevelBreakdown] = useState(false);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);
  const [showPointsGuide, setShowPointsGuide] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showWebhookSetup, setShowWebhookSetup] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("CommunityQuestClient received user:", initialUser);
    console.log("Current user state:", user);
  }, [initialUser, user]);

  // Safari dark theme fix + Chrome desktop layout fix
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isChrome = /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
    
    if (isSafari) {
      // Only apply dark theme for Safari if it's actually in dark mode
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        window.matchMedia('(prefers-color-scheme: dark)').matches ||
                        document.body.style.backgroundColor === 'rgb(0, 0, 0)' ||
                        document.body.style.backgroundColor === '#000000' ||
                        getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)';
      
      if (isDarkMode) {
        // Force dark theme for Safari only when in dark mode
        const style = document.createElement('style');
        style.id = 'safari-dark-theme';
        style.textContent = `
          .bg-card {
            background-color: #1a1a1a !important;
            border-color: #333333 !important;
          }
          .text-foreground {
            color: #ffffff !important;
          }
          .text-muted-foreground {
            color: #9ca3af !important;
          }
          .border-border {
            border-color: #333333 !important;
          }
        `;
        document.head.appendChild(style);
        
        return () => {
          const existing = document.getElementById('safari-dark-theme');
          if (existing) existing.remove();
        };
      }
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
                <TextField.Input placeholder="Search members..." className="hidden lg:block" />
                <TextField.Input placeholder="Search..." className="block sm:hidden" />
              </TextField.Root>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <IconButton 
                variant="ghost" 
                size="2"
                onClick={() => setShowRewardsPanel(true)}
                title="View Rewards"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
              
              <NotificationDropdown userId={user.id} />

              {/* Webhook Setup Button - Only show if webhook not configured */}
              <button 
                onClick={() => setShowWebhookSetup(true)}
                className="cursor-pointer"
                title="Setup Webhook Connection"
              >
                <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
                  🔗 Setup Connection
                </div>
              </button>

              <button 
                onClick={() => setShowProfilePanel(true)}
                className="cursor-pointer"
                title="Open Profile"
              >
              <Avatar 
                src={user.avatar} 
                alt={user.name} 
                fallback={user.name.charAt(0)}
                size="2"
              />
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Force Desktop Layout with Inline Styles */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .mobile-layout {
            display: none !important;
          }
          .desktop-layout {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-layout {
            display: block !important;
          }
          .desktop-layout {
            display: none !important;
          }
        }
        
        /* ULTRA AGGRESSIVE WHOP IFRAME OVERRIDES - ONLY FOR DESKTOP */
        @media (min-width: 1024px) {
          iframe[src*="whop.com"] .mobile-layout {
            display: none !important;
          }
          iframe[src*="whop.com"] .desktop-layout {
            display: block !important;
          }
          
          body[data-whop-app] .mobile-layout {
            display: none !important;
          }
          body[data-whop-app] .desktop-layout {
            display: block !important;
          }
          
          .whop-embed .mobile-layout {
            display: none !important;
          }
          .whop-embed .desktop-layout {
            display: block !important;
          }
        }
        
        /* FORCE MOBILE LAYOUT ON MOBILE - EVEN IN WHOP */
        @media (max-width: 1023px) {
          iframe[src*="whop.com"] .mobile-layout {
            display: block !important;
          }
          iframe[src*="whop.com"] .desktop-layout {
            display: none !important;
          }
          
          body[data-whop-app] .mobile-layout {
            display: block !important;
          }
          body[data-whop-app] .desktop-layout {
            display: none !important;
          }
          
          .whop-embed .mobile-layout {
            display: block !important;
          }
          .whop-embed .desktop-layout {
            display: none !important;
          }
        }
        
        /* CHROME DESKTOP NUCLEAR OPTION - FORCE DESKTOP LAYOUT */
        @media (min-width: 1024px) {
          .mobile-layout {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          .desktop-layout {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            overflow: visible !important;
          }
        }
      `}</style>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="space-y-6">
            {/* Mobile Combined Card */}
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
              <div className="space-y-6">
                {/* Mobile User Profile Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                      <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img 
                              src="/construction-illo.svg" 
                              alt="Construction placeholder"
                              className="w-16 h-16"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-xl" style={{backgroundColor: '#1754D8', borderColor: 'white'}}>
                      <span className="text-sm font-extrabold" style={{color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{user.currentLevel}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <div className="text-sm font-medium text-foreground">Community Member</div>
                    <div className="text-sm font-semibold" style={{color: '#2563EB'}}>Level {user.currentLevel}</div>
                    <div className="text-xs text-muted-foreground">{((MOCK_LEVELS.find(l => l.level === user.currentLevel + 1)?.requiredPoints || user.totalPoints) - user.totalPoints)} points to level up</div>
                  </div>
                </div>

                {/* Mobile Levels Section */}
                <div className="space-y-3">
                  {MOCK_LEVELS.map((level) => (
                    <div key={level.level} className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        {level.level === 1 ? (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">{level.level}</span>
                          </div>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          Level {level.level} - {level.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {level.memberPercentage}% of members
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learn How Points Work Link */}
            <div className="text-center">
              <button 
                onClick={() => setShowPointsGuide(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Learn how points work
              </button>
            </div>

            {/* Leaderboard Section */}
            <LeaderboardSection 
              weeklyLeaderboard={MOCK_LEADERBOARD_WEEKLY}
              monthlyLeaderboard={MOCK_LEADERBOARD_MONTHLY}
              allTimeLeaderboard={MOCK_LEADERBOARD_ALLTIME}
            />
          </div>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-layout">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="space-y-6 sm:space-y-8">
              {/* Combined User Profile and Level Breakdown Section */}
              <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border border-border">
                <div className="flex flex-row gap-8" style={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                  {/* Left side - User Profile Section (1/3 width) */}
                  <div className="flex flex-col items-center gap-4" style={{width: '33.333333%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                    {/* MUCH BIGGER Profile Picture */}
                    <div className="relative">
                      {/* Outer gradient ring - Made much bigger */}
                      <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                        {/* Inner ring */}
                        <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                          {/* Custom large avatar */}
                          <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
                            {user.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img 
                                src="/construction-illo.svg" 
                                alt="Construction placeholder"
                                className="w-32 h-32 lg:w-36 lg:h-36"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Level Badge - positioned like Skool with better visibility */}
                      <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-3 shadow-xl" style={{backgroundColor: '#1754D8', borderColor: 'white'}}>
                        <span className="text-lg lg:text-xl font-extrabold" style={{color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{user.currentLevel}</span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col gap-2 text-center">
                      <div className="text-xl lg:text-2xl font-bold text-foreground">{user.name}</div>
                      <div className="text-base lg:text-lg" style={{color: '#2563EB'}}>Level {user.currentLevel}</div>
                      <div className="text-xs lg:text-sm" style={{color: '#9CA3AF'}}>{((MOCK_LEVELS.find(l => l.level === user.currentLevel + 1)?.requiredPoints || user.totalPoints) - user.totalPoints)} points to level up</div>
                    </div>

                  </div>

                  {/* Right side - Level Breakdown in List Format (2/3 width) */}
                  <div style={{width: '66.666667%'}}>
                    <div className="grid grid-cols-2 gap-8" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem'}}>
                      {/* Left Column - Levels 1-5 */}
                      <div className="space-y-3">
                        {MOCK_LEVELS.slice(0, 5).map((level) => (
                          <div key={level.level} className="flex items-start gap-3 w-full">
                            {/* Lock Icon Container - Fixed width */}
                            <div className="w-10 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#1754D8'}}>
                                {level.isUnlocked ? (
                                  <span className="text-white text-sm font-semibold">{level.level}</span>
                                ) : (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                )}
                              </div>
                            </div>
                            
                            {/* Vertical Text Stack */}
                            <div className="flex flex-col">
                              <div className="text-xs font-medium text-foreground">
                                Level {level.level} - {level.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {level.memberPercentage}% of members
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right Column - Levels 6-9 */}
                      <div className="space-y-3">
                        {MOCK_LEVELS.slice(5, 9).map((level) => (
                          <div key={level.level} className="flex items-start gap-3 w-full">
                            {/* Lock Icon Container - Fixed width */}
                            <div className="w-10 flex-shrink-0">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#1754D8'}}>
                                {level.isUnlocked ? (
                                  <span className="text-white text-sm font-semibold">{level.level}</span>
                                ) : (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                )}
                              </div>
                            </div>
                            
                            {/* Vertical Text Stack */}
                            <div className="flex flex-col">
                              <div className="text-xs font-medium text-foreground">
                                Level {level.level} - {level.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {level.memberPercentage}% of members
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learn How Points Work Link */}
              <div className="text-center">
                <button 
                  onClick={() => setShowPointsGuide(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer"
                >
                  Learn how points work
                </button>
              </div>

              {/* Leaderboard Section */}
              <LeaderboardSection 
                weeklyLeaderboard={MOCK_LEADERBOARD_WEEKLY}
                monthlyLeaderboard={MOCK_LEADERBOARD_MONTHLY}
                allTimeLeaderboard={MOCK_LEADERBOARD_ALLTIME}
              />
            </div>

        {/* Last Updated - Removed for app store readiness */}
      </main>
      </div>

      {/* Level Breakdown Modal */}
      {showLevelBreakdown && (
        <LevelBreakdown 
          levels={MOCK_LEVELS}
          onClose={() => setShowLevelBreakdown(false)}
        />
      )}

      {/* Rewards Panel */}
      <RewardsPanel 
        user={user}
        isOpen={showRewardsPanel}
        onClose={() => setShowRewardsPanel(false)}
      />

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />

      {/* Profile Panel */}
      {showProfilePanel && (
        <Sheet.Root open onOpenChange={() => setShowProfilePanel(false)}>
          <Sheet.Content className="max-w-md h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <Sheet.Title className="text-xl font-semibold">Profile</Sheet.Title>
              <Sheet.Close />
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto min-h-0">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Avatar 
                      src={user.avatar} 
                      alt={user.name} 
                      fallback={user.name.charAt(0)}
                      size="5"
                    />
                  </div>
                  <Heading size="4" className="mb-2">{user.name}</Heading>
                  <Badge color="blue">Level {user.currentLevel} • {user.totalPoints} points</Badge>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <Heading size="3" className="mb-3">Quick Stats</Heading>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Text>Current Level</Text>
                          <Badge color="blue">Level {user.currentLevel}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <Text>Total Points</Text>
                          <Text weight="medium">{user.totalPoints}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text>Join Date</Text>
                          <Text>Recently joined</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-4">
                      <Heading size="3" className="mb-3">Quick Actions</Heading>
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          size="2" 
                          className="w-full justify-start"
                          onClick={() => {
                            setShowProfilePanel(false);
                            setShowRewardsPanel(true);
                          }}
                        >
                          🏆 View Rewards
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="2" 
                          className="w-full justify-start"
                          onClick={() => {
                            setShowProfilePanel(false);
                            setShowPointsGuide(true);
                          }}
                        >
                          📖 Learn How Points Work
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="2" 
                          className="w-full justify-start"
                          onClick={() => {
                            setShowProfilePanel(false);
                            setShowLevelBreakdown(true);
                          }}
                        >
                          📊 View All Levels
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
            </div>
          </Sheet.Content>
        </Sheet.Root>
      )}

      {/* Points Guide Modal */}
      {showPointsGuide && (
        <Dialog.Root open onOpenChange={() => setShowPointsGuide(false)}>
          <Dialog.Content size="4" className="max-h-[90vh] max-w-4xl">
            <Dialog.Title className="text-2xl font-bold mb-4">How Points & Levels Work</Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-6">
              Learn how to earn points and progress through community levels
            </Dialog.Description>
            <Dialog.Close />

            <div className="overflow-y-auto max-h-[70vh] space-y-6">
              {/* How to Earn Points */}
              <Card>
                <div className="p-6">
                  <Heading size="4" className="mb-4">🎯 How Members Earn Points</Heading>
                  
                  <div className="space-y-6">
                    {/* Chat & Communication */}
                    <div>
                      <Heading size="3" className="mb-3 text-blue-600">💬 Chat & Communication (via Whop Chat App)</Heading>
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <Text size="2" color="blue" className="font-medium">
                          💡 These activities are automatically tracked from your community's Whop Chat App
                        </Text>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Send a message in chat</span>
                          <Badge color="blue">2 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Reply to someone's message</span>
                          <Badge color="blue">3 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Share helpful resource in chat</span>
                          <Badge color="blue">10 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Get 5+ reactions on your message</span>
                          <Badge color="green">5 bonus points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Daily chat streak (7 days)</span>
                          <Badge color="green">20 bonus points</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Forum Activity */}
                    <div>
                      <Heading size="3" className="mb-3 text-purple-600">📝 Forum Activity (Quality Content) - via Forums App</Heading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">Create a forum post</span>
                          <Badge color="purple">15 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">Reply to a forum post</span>
                          <Badge color="purple">8 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Get 10+ upvotes on your post</span>
                          <Badge color="green">25 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Receive \"helpful\" reaction from 3+ members</span>
                          <Badge color="green">15 bonus points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Create a post with 10+ replies</span>
                          <Badge color="green">25 bonus points</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Course & Learning */}
                    <div>
                      <Heading size="3" className="mb-3 text-orange-600">🎓 Course & Learning - via Course App</Heading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">Complete a course module</span>
                          <Badge color="orange">50 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">Complete an entire course</span>
                          <Badge color="orange">200 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Score 90%+ on a quiz</span>
                          <Badge color="green">30 bonus points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="font-medium">Share course progress/wins</span>
                          <Badge color="orange">20 points</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Livestreaming */}
                    <div>
                      <Heading size="3" className="mb-3 text-pink-600">📺 Livestreaming - via Livestreaming App</Heading>
                      <div className="mb-3 p-3 bg-pink-50 rounded-lg">
                        <Text size="2" color="pink" className="font-medium">
                          💡 These activities are automatically tracked from your community's Whop Livestreaming App
                        </Text>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                          <span className="font-medium">Start a livestream</span>
                          <Badge color="pink">75 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                          <span className="font-medium">Attend a livestream</span>
                          <Badge color="pink">75 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                          <span className="font-medium">Send chat message during stream</span>
                          <Badge color="pink">2 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                          <span className="font-medium">React during livestream</span>
                          <Badge color="pink">5 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Attend full livestream session</span>
                          <Badge color="green">50 points</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Community Value */}
                    <div>
                      <Heading size="3" className="mb-3 text-green-600">🤝 Community Value (Quality over Quantity) - via Chat App & Custom</Heading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Help another member (verified by admin)</span>
                          <Badge color="green">40 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Share a valuable resource</span>
                          <Badge color="green">25 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Introduce yourself (one-time)</span>
                          <Badge color="green">10 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Attend a live event/call</span>
                          <Badge color="green">75 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Weekly check-in post</span>
                          <Badge color="green">15 points</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Referrals & Growth */}
                    <div>
                      <Heading size="3" className="mb-3 text-red-600">🚀 Referrals & Growth - via Whop Affiliates</Heading>
                      <div className="mb-3 p-3 bg-red-50 rounded-lg">
                        <Text size="2" color="red" className="font-medium">
                          💡 These activities are tracked via Whop's Consumer Affiliates program
                        </Text>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Refer a new member who joins</span>
                          <Badge color="red">100 points</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Referred member reaches Contributor tier</span>
                          <Badge color="green">50 bonus points</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Anti-Gaming Mechanisms */}
              <Card>
                <div className="p-6">
                  <Heading size="4" className="mb-4">🛡️ Anti-Gaming Mechanisms</Heading>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text size="2"><strong>Point decay:</strong> Lose 5% of points monthly if inactive (no activity for 30 days)</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text size="2"><strong>Quality filters:</strong> Admin can revoke points for spam or low-quality posts</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text size="2"><strong>Diminishing returns:</strong> After 10 chat messages per day, points reduce to 1 point per message</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text size="2"><strong>Manual review:</strong> Posts earning 50+ points trigger admin review</Text>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <Text size="2"><strong>Cooldowns:</strong> Can only earn course completion points once per course</Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Level Progression Examples */}
              <Card>
                <div className="p-6">
                  <Heading size="4" className="mb-4">📈 Level Progression Examples</Heading>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge color="blue">Level 2</Badge>
                        <span className="font-semibold">Contributor (100 points needed)</span>
                      </div>
                      <Text size="2" color="gray">
                        Introduce yourself (10) + Create 6 forum posts (90) = <strong>100 points</strong> ✅
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge color="green">Level 3</Badge>
                        <span className="font-semibold">Action Taker (300 points needed)</span>
                      </div>
                      <Text size="2" color="gray">
                        Complete profile (10) + Complete 1 course (200) + Attend 1 live event (75) = <strong>285 points</strong> ✅
                      </Text>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge color="purple">Level 4</Badge>
                        <span className="font-semibold">Builder (600 points needed)</span>
                      </div>
                      <Text size="2" color="gray">
                        Complete 2 courses (400) + Help 5 members (200) = <strong>600 points</strong> ✅
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Level Benefits */}
              <Card>
                <div className="p-6">
                  <Heading size="4" className="mb-4">🏆 Level Benefits</Heading>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="yellow">Level 1</Badge>
                      <div>
                        <span className="font-medium">Noob (0-99 points)</span>
                        <Text size="1" color="gray"> Access to community chat, View leaderboard rankings, Access to welcome resources and guides</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="yellow">Level 2</Badge>
                      <div>
                        <span className="font-medium">Contributor (100-299 points)</span>
                        <Text size="1" color="gray"> Access to exclusive 'Contributors Only' chat, Custom 'Contributor' badge</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="yellow">Level 3</Badge>
                      <div>
                        <span className="font-medium">Action Taker (300-599 points)</span>
                        <Text size="1" color="gray"> Early access to new content/courses, Priority support response, Monthly spotlight feature opportunity</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="gray">Level 4</Badge>
                      <div>
                        <span className="font-medium">Builder (600-999 points)</span>
                        <Text size="1" color="gray"> Featured member profile, Double points on weekend activities</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="gray">Level 5</Badge>
                      <div>
                        <span className="font-medium">Expert (1,000-1,999 points)</span>
                        <Text size="1" color="gray">Access to Expert-only forum discussions, Monthly group coaching sessions, Free access to one premium course/month</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="gray">Level 6-9</Badge>
                      <div>
                        <span className="font-medium">Grandmaster → GOAT (2,000+ points)</span>
                        <Text size="1" color="gray">Revenue sharing on referrals, Access to founder's exclusive course library, Monthly 1:1 coaching, Equity opportunities, Co-founder consideration</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Features */}
              <Card>
                <div className="p-6">
                  <Heading size="4" className="mb-4">✨ Key Features</Heading>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Points are cumulative</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Multiple paths to level up</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Real-time point updates</Text>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Rewards consistent engagement</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Scalable progression system</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Text size="2">Automatic level unlocking</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-end">
                <Button onClick={() => setShowPointsGuide(false)} size="2">
                  Close
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Webhook Setup Modal */}
      {showWebhookSetup && (
        <Dialog.Root open={showWebhookSetup} onOpenChange={setShowWebhookSetup}>
          <Dialog.Content className="max-w-2xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              🔗 Connect to Your Whop Community
            </Dialog.Title>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Text weight="medium" className="text-blue-900 mb-2">
                  Quick Setup (2 minutes)
                </Text>
                <Text size="2" className="text-blue-800 mb-4">
                  To start tracking member activity and awarding points, connect this app to your Whop community.
                </Text>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <Text size="2" className="text-blue-800">
                      Copy this webhook URL:
                    </Text>
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Text size="1" className="font-mono text-blue-900 break-all">
                      {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks` : 'Loading...'}
                    </Text>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <Text size="2" className="text-blue-800">
                      Go to your Whop Dashboard → Developer → Create Webhook
                    </Text>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <Text size="2" className="text-blue-800">
                      Paste the URL and select these events:
                    </Text>
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded-lg ml-9">
                    <Text size="1" className="text-blue-900 font-medium mb-2">Enable these events:</Text>
                    <div className="space-y-1 text-blue-800">
                      <div>• <code>chat.message_sent</code> - Track chat messages</div>
                      <div>• <code>forum.post_created</code> - Track forum posts</div>
                      <div>• <code>course.module_completed</code> - Track course progress</div>
                      <div>• <code>event.attended</code> - Track event attendance</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <Text size="2" className="text-blue-800">
                      Click "Save" - that's it!
                    </Text>
                  </div>
                </div>
                
                <Text size="2" className="text-blue-700 mt-4 font-medium">
                  💡 Once connected, your members will automatically earn points for chat messages, forum posts, course completions, and more!
                </Text>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-end">
                <Button onClick={() => setShowWebhookSetup(false)} size="2">
                  Got it!
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Engagement Tracker for testing */}
      <EngagementTracker userId={user.id} />
    </div>
  );
}
