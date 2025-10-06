"use client";

import { useState } from "react";
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

export default function CommunityQuestSimple() {
  const [showLevelBreakdown, setShowLevelBreakdown] = useState(false);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);
  const [showPointsGuide, setShowPointsGuide] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

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

      {/* Single Responsive Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-card rounded-lg p-4 sm:p-6 shadow-lg border border-border">
            {/* Use CSS Grid for reliable responsive layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Profile Section - Takes full width on mobile, 1 column on desktop */}
              <div className="lg:col-span-1 flex flex-col items-center gap-4">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                    <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                      <div className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
                        {MOCK_USER.avatar ? (
                          <img 
                            src={MOCK_USER.avatar} 
                            alt={MOCK_USER.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img 
                            src="/construction-illo.svg" 
                            alt="Construction placeholder"
                            className="w-24 h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-3 shadow-xl" style={{backgroundColor: '#1754D8', borderColor: 'white'}}>
                    <span className="text-lg lg:text-xl font-extrabold" style={{color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{MOCK_USER.currentLevel}</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col gap-2 text-center">
                  <div className="text-lg lg:text-xl xl:text-2xl font-bold text-foreground">{MOCK_USER.name}</div>
                  <div className="text-sm lg:text-base xl:text-lg" style={{color: '#2563EB'}}>Level {MOCK_USER.currentLevel}</div>
                  <div className="text-xs lg:text-sm" style={{color: '#9CA3AF'}}>{((MOCK_LEVELS.find(l => l.level === MOCK_USER.currentLevel + 1)?.requiredPoints || MOCK_USER.totalPoints) - MOCK_USER.totalPoints)} points to level up</div>
                </div>
              </div>

              {/* Level Breakdown Section - Takes full width on mobile, 2 columns on desktop */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  {/* Left Column - Levels 1-5 */}
                  <div className="space-y-3">
                    {MOCK_LEVELS.slice(0, 5).map((level) => (
                      <div key={level.level} className="flex items-start gap-3 w-full">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          {level.level === 1 ? (
                            <span className="text-sm font-bold" style={{color: '#10B981'}}>{level.level}</span>
                          ) : (
                            <svg className="w-4 h-4" style={{color: '#6B7280'}} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
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
                    {MOCK_LEVELS.slice(5).map((level) => (
                      <div key={level.level} className="flex items-start gap-3 w-full">
                        <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                          {level.isUnlocked ? (
                            <span className="text-white text-sm font-semibold">{level.level}</span>
                          ) : (
                            <svg className="w-4 h-4" style={{color: '#6B7280'}} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
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
      </main>

      {/* Level Breakdown Modal */}
      {showLevelBreakdown && (
        <LevelBreakdown 
          levels={MOCK_LEVELS}
          onClose={() => setShowLevelBreakdown(false)}
        />
      )}

      {/* Rewards Panel */}
      {showRewardsPanel && (
        <RewardsPanel 
          onClose={() => setShowRewardsPanel(false)}
        />
      )}

      {/* Points Guide Modal */}
      {showPointsGuide && (
        <Dialog.Root open={showPointsGuide} onOpenChange={setShowPointsGuide}>
          <Dialog.Content size="4">
            <Dialog.Title>How Points Work</Dialog.Title>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Points System - How Members Earn Points</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Chat & Communication (Daily Engagement):</strong></div>
                  <div>• Send a message in chat: 2 points</div>
                  <div>• Reply to someone's message: 3 points (encourages interaction)</div>
                  <div>• Start a meaningful discussion thread: 10 points</div>
                  <div>• Get 5+ reactions on your message: 5 bonus points</div>
                  <div>• Daily chat streak (7 days): 20 bonus points</div>
                  
                  <div className="mt-3"><strong>Forum Activity (Quality Content):</strong></div>
                  <div>• Create a forum post: 15 points</div>
                  <div>• Reply to a forum post: 8 points</div>
                  <div>• Get your post pinned by admin: 50 points</div>
                  <div>• Receive "helpful" reaction from 3+ members: 15 bonus points</div>
                  <div>• Create a post with 10+ replies: 25 bonus points</div>
                  
                  <div className="mt-3"><strong>Course & Learning:</strong></div>
                  <div>• Complete a course module: 50 points</div>
                  <div>• Complete an entire course: 200 points</div>
                  <div>• Score 90%+ on a quiz: 30 bonus points</div>
                  <div>• Share course progress/wins: 20 points</div>
                  
                  <div className="mt-3"><strong>Community Value (Quality over Quantity):</strong></div>
                  <div>• Help another member (verified by admin): 40 points</div>
                  <div>• Share a valuable resource: 25 points</div>
                  <div>• Introduce yourself (one-time): 10 points</div>
                  <div>• Attend a live event/call: 75 points</div>
                  <div>• Weekly check-in post: 15 points</div>
                  
                  <div className="mt-3"><strong>Referrals & Growth:</strong></div>
                  <div>• Refer a new member who joins: 100 points</div>
                  <div>• Referred member reaches Contributor tier: 50 bonus points</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tier Structure & Benefits</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>1. Noob (0-99 points)</strong> - Just getting started</div>
                  <div>Benefits: Access to basic community channels, View leaderboard rankings, Access to welcome resources</div>
                  
                  <div><strong>2. Contributor (100-299 points)</strong> - Starting to engage</div>
                  <div>Benefits: Everything from Noob + Access to exclusive "Contributors Only" chat, Custom "Contributor" badge</div>
                  
                  <div><strong>3. Action Taker (300-599 points)</strong> - Consistently active</div>
                  <div>Benefits: Everything from Contributor + Early access to new content/courses, Priority support response, Monthly spotlight feature opportunity</div>
                  
                  <div><strong>4. Builder (600-999 points)</strong> - Building momentum</div>
                  <div>Benefits: Everything from Action Taker + Featured member profile, Double points on weekend activities</div>
                  
                  <div><strong>5. Expert (1,000-1,999 points)</strong> - Proven contributor</div>
                  <div>Benefits: Everything from Builder + Access to Expert-only masterminds, Monthly group coaching call access, "Expert" role with special color/badge, Ability to host community events, Free access to one premium course/month</div>
                  
                  <div><strong>6. Grandmaster (2,000-3,499 points)</strong> - Top-tier member</div>
                  <div>Benefits: Everything from Expert + Access to beta features first, Revenue share on referrals (5%), Custom profile banner</div>
                  
                  <div><strong>7. Leader (3,500-5,499 points)</strong> - Community pillar</div>
                  <div>Benefits: Everything from Grandmaster + Co-host community events, Moderator privileges (if desired), Revenue share on referrals (10%)</div>
                  
                  <div><strong>8. Wizard (5,500-7,999 points)</strong> - Elite status</div>
                  <div>Benefits: Everything from Leader + 15% discount on all products, Monthly private mastermind with owner, Revenue share on referrals (15%), Exclusive "Wizard Council" access</div>
                  
                  <div><strong>9. GOAT (8,000+ points)</strong> - Greatest of all time</div>
                  <div>Benefits: Everything from Wizard + Monthly 1:1 coaching session with owner (30 min), Revenue share on referrals (20%), Equity/partnership opportunities discussed, Free ticket to annual in-person event</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Anti-Gaming Mechanisms</h3>
                <div className="space-y-1 text-sm">
                  <div>• Point decay: Lose 5% of points monthly if inactive (no activity for 30 days)</div>
                  <div>• Quality filters: Admin can revoke points for spam or low-quality posts</div>
                  <div>• Diminishing returns: After 10 chat messages per day, points reduce to 1 point per message</div>
                  <div>• Manual review: Posts earning 50+ points trigger admin review</div>
                  <div>• Cooldowns: Can only earn course completion points once per course</div>
                </div>
              </div>
            </div>
            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Root>
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
              <UserProfile />
            </div>
          </Sheet.Content>
        </Sheet.Root>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}
