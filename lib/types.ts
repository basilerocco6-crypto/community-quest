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
  type: 'chat' | 'forum_post' | 'forum_comment' | 'course_completion' | 'event_attendance' | 'referral';
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
    perks: ["Basic community access"],
    memberPercentage: 100, // Automatically unlocked for all members
    badgeColor: "bg-yellow-400",
    isUnlocked: true
  },
  {
    level: 2,
    name: "Contributor",
    requiredPoints: 25,
    perks: ["Access to exclusive content"],
    discountPercentage: 5,
    memberPercentage: 5, // Match original Skool percentages
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 3,
    name: "Builder",
    requiredPoints: 50,
    perks: ["VIP support", "Early access to new features"],
    discountPercentage: 10,
    memberPercentage: 2, // Match original Skool percentages
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 4,
    name: "Craftsperson",
    requiredPoints: 100,
    perks: ["Mentorship opportunities", "Custom badge"],
    discountPercentage: 15,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 5,
    name: "Architect",
    requiredPoints: 200,
    perks: ["Moderator privileges", "Direct access to founders"],
    discountPercentage: 20,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 6,
    name: "Grandmaster",
    requiredPoints: 350,
    perks: ["Revenue sharing opportunities"],
    discountPercentage: 25,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 7,
    name: "Goat",
    requiredPoints: 500,
    perks: ["Co-founder status", "Equity opportunities"],
    discountPercentage: 30,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 8,
    name: "Wizard",
    requiredPoints: 750,
    perks: ["Named community feature", "Lifetime benefits"],
    discountPercentage: 40,
    memberPercentage: 1, // Match original Skool percentages
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 9,
    name: "God",
    requiredPoints: 1000,
    perks: ["Ultimate recognition", "All previous benefits"],
    discountPercentage: 50,
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
