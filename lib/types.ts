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
    | 'forum_post' | 'forum_reply' | 'forum_pinned' | 'forum_helpful_bonus' | 'forum_engagement_bonus'
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
  memberPercentage: number;
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

// Mock data for development
export const MOCK_LEVELS: Level[] = [
  {
    level: 1,
    name: "Noob",
    requiredPoints: 0,
    perks: ["Access to basic community channels", "View leaderboard rankings", "Access to welcome resources"],
    memberPercentage: 100, // Automatically unlocked for all members
    badgeColor: "bg-yellow-400",
    isUnlocked: true
  },
  {
    level: 2,
    name: "Contributor",
    requiredPoints: 100,
    perks: ["Access to exclusive 'Contributors Only' chat", "Custom 'Contributor' badge"],
    discountPercentage: 0,
    memberPercentage: 5, // Match original Skool percentages
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 3,
    name: "Action Taker",
    requiredPoints: 300,
    perks: ["Early access to new content/courses", "Priority support response", "Monthly spotlight feature opportunity"],
    discountPercentage: 0,
    memberPercentage: 2, // Match original Skool percentages
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 4,
    name: "Builder",
    requiredPoints: 600,
    perks: ["Featured member profile", "Double points on weekend activities"],
    discountPercentage: 0,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 5,
    name: "Expert",
    requiredPoints: 1000,
    perks: ["Access to Expert-only masterminds", "Monthly group coaching call access", "\"Expert\" role with special color/badge", "Ability to host community events", "Free access to one premium course/month"],
    discountPercentage: 0,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 6,
    name: "Grandmaster",
    requiredPoints: 2000,
    perks: ["Access to beta features first", "Revenue share on referrals (5%)", "Custom profile banner"],
    discountPercentage: 0,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 7,
    name: "Leader",
    requiredPoints: 3500,
    perks: ["Co-host community events", "Moderator privileges (if desired)", "Revenue share on referrals (10%)"],
    discountPercentage: 0,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 8,
    name: "Wizard",
    requiredPoints: 5500,
    perks: ["15% discount on all products", "Monthly private mastermind with owner", "Revenue share on referrals (15%)", "Exclusive \"Wizard Council\" access"],
    discountPercentage: 15,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 9,
    name: "GOAT",
    requiredPoints: 8000,
    perks: ["Monthly 1:1 coaching session with owner (30 min)", "Revenue share on referrals (20%)", "Equity/partnership opportunities discussed", "Free ticket to annual in-person event"],
    discountPercentage: 0,
    memberPercentage: 0, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  }
];

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
