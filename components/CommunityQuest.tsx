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
import EngagementTracker from "./EngagementTracker";
import CommunityLevelsBreakdown from "./CommunityLevelsBreakdown";
import { MOCK_USER, MOCK_LEADERBOARD_WEEKLY, MOCK_LEADERBOARD_MONTHLY, MOCK_LEADERBOARD_ALLTIME, MOCK_LEVELS } from "@/lib/types";

export default function CommunityQuest() {
  const [showLevelBreakdown, setShowLevelBreakdown] = useState(false);
  const [showRewardsPanel, setShowRewardsPanel] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Removed for app store readiness */}

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <TextField.Root>
                <TextField.Slot>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </TextField.Slot>
                <TextField.Input placeholder="Search members..." />
              </TextField.Root>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              <IconButton variant="ghost" size="2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </IconButton>
              
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
              
              <div className="relative">
                <IconButton variant="ghost" size="2" className="p-2">
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </IconButton>
                {/* No notification badge for fresh installation */}
              </div>

              <Avatar 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                fallback={MOCK_USER.name.charAt(0)}
                size="2"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Combined User Profile and Level Breakdown Section */}
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                <div className="flex gap-8">
                  {/* Left side - User Profile Section */}
                  <div className="flex flex-col items-center gap-4 w-64">
                    {/* MUCH BIGGER Profile Picture */}
                    <div className="relative">
                      {/* Outer gradient ring - Made much bigger */}
                      <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#FA4616'}}>
                        {/* Inner ring */}
                        <div className="p-2 rounded-full" style={{backgroundColor: '#FCF6F5'}}>
                          {/* Custom large avatar */}
                          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 flex items-center justify-center">
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
                                className="w-20 h-20"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Level Badge - positioned like Skool with better visibility */}
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center border-3 shadow-xl" style={{backgroundColor: '#1754D8', borderColor: 'white'}}>
                        <span className="text-xl font-extrabold" style={{color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{MOCK_USER.currentLevel}</span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col gap-2 text-center">
                      <div className="text-2xl font-bold" style={{color: '#000000'}}>{MOCK_USER.name}</div>
                      <div className="text-lg" style={{color: '#2563EB'}}>Level {MOCK_USER.currentLevel}</div>
                      <div className="text-sm" style={{color: '#4B5563'}}>{((MOCK_LEVELS.find(l => l.level === MOCK_USER.currentLevel + 1)?.requiredPoints || MOCK_USER.totalPoints) - MOCK_USER.totalPoints)} points to level up</div>
                    </div>

                    {/* Stats Below Avatar - Horizontal Layout */}
                    <div className="flex gap-6 w-full justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{color: '#000000'}}>{MOCK_USER.weeklyPoints}</div>
                        <div className="text-sm" style={{color: '#4B5563'}}>This Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{color: '#000000'}}>{MOCK_USER.monthlyPoints}</div>
                        <div className="text-sm" style={{color: '#4B5563'}}>This Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{color: '#000000'}}>{MOCK_USER.totalPoints}</div>
                        <div className="text-sm" style={{color: '#4B5563'}}>All Time</div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Level Breakdown in 2 Rows */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      {/* First Row - Levels 1-5 */}
                      <div className="grid grid-cols-5 gap-4">
                        {MOCK_LEVELS.slice(0, 5).map((level) => (
                          <div key={level.level} className="flex flex-col items-center gap-2">
                            {/* Level Badge */}
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                              level.level <= MOCK_USER.currentLevel 
                                ? 'border-blue-600' 
                                : 'bg-gray-200 border-gray-300'
                            }`} style={level.level <= MOCK_USER.currentLevel ? {backgroundColor: '#1754D8'} : {}}>
                              {level.level <= MOCK_USER.currentLevel ? (
                                <span className="text-lg font-bold" style={{color: '#FFFFFF'}}>{level.level}</span>
                              ) : (
                                <svg className="w-6 h-6" style={{color: '#6B7280'}} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            
                            {/* Level Info */}
                            <div className="flex flex-col items-center text-center">
                              <div className="text-sm font-medium" style={{color: '#000000'}}>Level {level.level}</div>
                              <div className="text-xs" style={{color: '#4B5563'}}>
                                {level.memberPercentage}% of members
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Second Row - Levels 6-9 */}
                      <div className="grid grid-cols-4 gap-4 ml-8">
                        {MOCK_LEVELS.slice(5, 9).map((level) => (
                          <div key={level.level} className="flex flex-col items-center gap-2">
                            {/* Level Badge */}
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                              level.level <= MOCK_USER.currentLevel 
                                ? 'border-blue-600' 
                                : 'bg-gray-200 border-gray-300'
                            }`} style={level.level <= MOCK_USER.currentLevel ? {backgroundColor: '#1754D8'} : {}}>
                              {level.level <= MOCK_USER.currentLevel ? (
                                <span className="text-lg font-bold" style={{color: '#FFFFFF'}}>{level.level}</span>
                              ) : (
                                <svg className="w-6 h-6" style={{color: '#6B7280'}} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            
                            {/* Level Info */}
                            <div className="flex flex-col items-center text-center">
                              <div className="text-sm font-medium" style={{color: '#000000'}}>Level {level.level}</div>
                              <div className="text-xs" style={{color: '#4B5563'}}>
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

      {/* Engagement Tracker (Demo) */}
      <EngagementTracker />
    </div>
  );
}
