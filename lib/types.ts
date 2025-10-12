export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  currentLevel: number;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  joinDate: Date;
  lastActive: Date;
}

export interface EngagementActivity {
  id: string;
  userId: string;
  type: 
    // Chat & Communication
    | 'chat_message' | 'chat_reply' | 'discussion_start' | 'chat_reaction_bonus' | 'chat_streak_bonus'
    // Forum Activity
    | 'forum_post' | 'forum_reply' | 'forum_paywalled_post' | 'forum_engagement_bonus'
    // Course & Learning
    | 'course_module' | 'course_completion' | 'quiz_excellence' | 'course_progress_share'
    // Community Value
    | 'member_help' | 'resource_share' | 'self_introduction' | 'live_event_attendance' | 'weekly_checkin'
    // Referrals & Growth
    | 'referral' | 'referral_tier_bonus'
    // Legacy support
    | 'chat' | 'forum_comment' | 'event_attendance';
  points: number;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Level {
  level: number;
  name: string;
  requiredPoints: number;
  perks: string[];
  discountPercentage?: number;
  badgeColor: string;
  isUnlocked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  points: number;
  change: number; // +/- change from previous period
  avatar: string;
}

export interface Leaderboard {
  type: 'weekly' | 'monthly' | 'alltime';
  entries: LeaderboardEntry[];
  lastUpdated: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'access' | 'badge' | 'content';
  value?: number; // percentage for discounts, or other value
  requiredLevel: number;
  isActive: boolean;
}

// Import the configurable level system
import { getConfiguredLevels } from './level-config';

// Get the configured levels (with custom names if set via environment variables)
export const MOCK_LEVELS: Level[] = getConfiguredLevels();

// Legacy export for backward compatibility - now uses configurable system
// @deprecated Use getConfiguredLevels() from './level-config' instead

export const MOCK_USER: User = {
  id: "1",
  name: "Community Member",
  avatar: undefined, // No avatar for fresh install
  currentLevel: 1,
  totalPoints: 0,
  weeklyPoints: 0,
  monthlyPoints: 0,
  joinDate: new Date(),
  lastActive: new Date()
};

export const MOCK_LEADERBOARD_WEEKLY: LeaderboardEntry[] = [];

export const MOCK_LEADERBOARD_MONTHLY: LeaderboardEntry[] = [];

export const MOCK_LEADERBOARD_ALLTIME: LeaderboardEntry[] = [];
