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
    name: "Newcomer",
    requiredPoints: 0,
    perks: ["Access to community chat", "View leaderboard rankings", "Access to welcome resources and guides"],
    memberPercentage: 100, // Automatically unlocked for all members
    badgeColor: "bg-blue-400",
    isUnlocked: true
  },
  {
    level: 2,
    name: "Contributor",
    requiredPoints: 100,
    perks: ["5% discount on all products", "Early access to new content", "Priority support response"],
    discountPercentage: 5,
    memberPercentage: 25,
    badgeColor: "bg-green-400",
    isUnlocked: false
  },
  {
    level: 3,
    name: "Active Member",
    requiredPoints: 300,
    perks: ["10% discount on all products", "Access to exclusive community polls", "Monthly featured member opportunity"],
    discountPercentage: 10,
    memberPercentage: 15,
    badgeColor: "bg-purple-400",
    isUnlocked: false
  },
  {
    level: 4,
    name: "Community Builder",
    requiredPoints: 600,
    perks: ["15% discount on all products", "Access to beta features", "Double points on weekend activities"],
    discountPercentage: 15,
    memberPercentage: 8,
    badgeColor: "bg-orange-400",
    isUnlocked: false
  },
  {
    level: 5,
    name: "Expert",
    requiredPoints: 1000,
    perks: ["20% discount on all products", "Access to Expert-only masterminds", "Monthly group coaching call access", "Free access to one premium course/month"],
    discountPercentage: 20,
    memberPercentage: 5,
    badgeColor: "bg-red-400",
    isUnlocked: false
  },
  {
    level: 6,
    name: "Grandmaster",
    requiredPoints: 2000,
    perks: ["25% discount on all products", "Revenue share on referrals (5%)", "Access to founder's private content"],
    discountPercentage: 25,
    memberPercentage: 3,
    badgeColor: "bg-indigo-400",
    isUnlocked: false
  },
  {
    level: 7,
    name: "Community Leader",
    requiredPoints: 3500,
    perks: ["30% discount on all products", "Co-host community events", "Revenue share on referrals (10%)", "Direct access to founder"],
    discountPercentage: 30,
    memberPercentage: 2,
    badgeColor: "bg-pink-400",
    isUnlocked: false
  },
  {
    level: 8,
    name: "Wizard",
    requiredPoints: 5500,
    perks: ["35% discount on all products", "Monthly private mastermind with founder", "Revenue share on referrals (15%)", "Exclusive \"Wizard Council\" access", "Free lifetime access to all products"],
    discountPercentage: 35,
    memberPercentage: 1,
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 9,
    name: "GOAT",
    requiredPoints: 8000,
    perks: ["50% discount on all products", "Monthly 1:1 coaching session with founder (30 min)", "Revenue share on referrals (20%)", "Equity/partnership opportunities discussed", "Free ticket to annual in-person event", "Co-founder status consideration"],
    discountPercentage: 50,
    memberPercentage: 0.1,
    badgeColor: "bg-gradient-to-r from-purple-400 to-pink-400",
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
