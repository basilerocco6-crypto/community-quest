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

export default function CommunityQuest() {
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
                onClick={() => setShowAdminPanel(true)}
                title="Admin Panel"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </IconButton>
              
              <div className="relative">
                <IconButton variant="ghost" size="2" className="p-2">
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </IconButton>
                {/* No notification badge for fresh installation */}
              </div>

              <button 
                onClick={() => setShowProfilePanel(true)}
                className="cursor-pointer"
                title="Open Profile"
              >
              <Avatar 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                fallback={MOCK_USER.name.charAt(0)}
                size="2"
              />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="space-y-6 sm:space-y-8">
              {/* Combined User Profile and Level Breakdown Section */}
              <div className="bg-black rounded-lg p-4 sm:p-6 shadow-lg border border-gray-700">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left side - User Profile Section (1/3 width on desktop, full width on mobile) */}
                  <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
                    {/* MUCH BIGGER Profile Picture */}
                    <div className="relative">
                      {/* Outer gradient ring - Made much bigger */}
                      <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                        {/* Inner ring */}
                        <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                          {/* Custom large avatar */}
                          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
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
                                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Level Badge - positioned like Skool with better visibility */}
                      <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-3 shadow-xl" style={{backgroundColor: '#1754D8', borderColor: 'white'}}>
                        <span className="text-lg lg:text-xl font-extrabold" style={{color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{MOCK_USER.currentLevel}</span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col gap-2 text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: '#FFFFFF'}}>{MOCK_USER.name}</div>
                      <div className="text-sm sm:text-base lg:text-lg" style={{color: '#2563EB'}}>Level {MOCK_USER.currentLevel}</div>
                      <div className="text-xs sm:text-xs lg:text-sm" style={{color: '#9CA3AF'}}>{((MOCK_LEVELS.find(l => l.level === MOCK_USER.currentLevel + 1)?.requiredPoints || MOCK_USER.totalPoints) - MOCK_USER.totalPoints)} points to level up</div>
                    </div>

                  </div>

                  {/* Right side - Level Breakdown in List Format (2/3 width on desktop, full width on mobile) */}
                  <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
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
                              <div className="text-sm sm:text-xs font-medium" style={{color: '#FFFFFF'}}>
                                Level {level.level} - {level.name}
                              </div>
                              <div className="text-sm sm:text-xs text-gray-400">
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
                              <div className="text-sm sm:text-xs font-medium" style={{color: '#FFFFFF'}}>
                                Level {level.level} - {level.name}
                              </div>
                              <div className="text-sm sm:text-xs text-gray-400">
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

      {/* Level Breakdown Modal */}
      {showLevelBreakdown && (
        <LevelBreakdown 
          levels={MOCK_LEVELS}
          onClose={() => setShowLevelBreakdown(false)}
        />
      )}

      {/* Rewards Panel */}
      <RewardsPanel 
        user={MOCK_USER}
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
                      src={MOCK_USER.avatar} 
                      alt={MOCK_USER.name} 
                      fallback={MOCK_USER.name.charAt(0)}
                      size="5"
                    />
                  </div>
                  <Heading size="4" className="mb-2">{MOCK_USER.name}</Heading>
                  <Badge color="blue">Level {MOCK_USER.currentLevel} • {MOCK_USER.totalPoints} points</Badge>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <Heading size="3" className="mb-3">Quick Stats</Heading>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Text>Current Level</Text>
                          <Badge color="blue">Level {MOCK_USER.currentLevel}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <Text>Total Points</Text>
                          <Text weight="medium">{MOCK_USER.totalPoints}</Text>
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
                          <span className="font-medium">Start a meaningful discussion thread</span>
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
                      <Heading size="3" className="mb-3 text-purple-600">📝 Forum Activity (Quality Content)</Heading>
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
                          <span className="font-medium">Get your post pinned by admin</span>
                          <Badge color="green">50 points</Badge>
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
                      <Heading size="3" className="mb-3 text-orange-600">🎓 Course & Learning</Heading>
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

                    {/* Community Value */}
                    <div>
                      <Heading size="3" className="mb-3 text-green-600">🤝 Community Value (Quality over Quantity)</Heading>
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
                      <Heading size="3" className="mb-3 text-red-600">🚀 Referrals & Growth</Heading>
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
                        <Text size="1" color="gray"> Access to basic community channels, View leaderboard rankings, Access to welcome resources</Text>
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
                        <Text size="1" color="gray"> Access to Expert-only masterminds, Monthly group coaching call access, "Expert" role with special color/badge, Ability to host community events, Free access to one premium course/month</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge color="gray">Level 6-9</Badge>
                      <div>
                        <span className="font-medium">Grandmaster → GOAT (2,000+ points)</span>
                        <Text size="1" color="gray"> Revenue sharing, Beta access, Moderator privileges, 15% discount, Monthly 1:1 coaching, Equity opportunities</Text>
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
    </div>
  );
}
