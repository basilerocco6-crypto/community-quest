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
    name: "Newcomer",
    requiredPoints: 0,
    perks: ["Basic community access"],
    memberPercentage: 94,
    badgeColor: "bg-yellow-400",
    isUnlocked: true
  },
  {
    level: 2,
    name: "Active Member",
    requiredPoints: 25,
    perks: ["Access to exclusive content"],
    discountPercentage: 5,
    memberPercentage: 2,
    badgeColor: "bg-yellow-400",
    isUnlocked: true
  },
  {
    level: 3,
    name: "Community Champion",
    requiredPoints: 50,
    perks: ["VIP support", "Early access to new features"],
    discountPercentage: 10,
    memberPercentage: 1,
    badgeColor: "bg-yellow-400",
    isUnlocked: true
  },
  {
    level: 4,
    name: "Engagement Expert",
    requiredPoints: 100,
    perks: ["Mentorship opportunities", "Custom badge"],
    discountPercentage: 15,
    memberPercentage: 1,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 5,
    name: "Community Leader",
    requiredPoints: 200,
    perks: ["Moderator privileges", "Direct access to founders"],
    discountPercentage: 20,
    memberPercentage: 1,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 6,
    name: "Elite Member",
    requiredPoints: 350,
    perks: ["Revenue sharing opportunities"],
    discountPercentage: 25,
    memberPercentage: 0,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 7,
    name: "Community Legend",
    requiredPoints: 500,
    perks: ["Co-founder status", "Equity opportunities"],
    discountPercentage: 30,
    memberPercentage: 0,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 8,
    name: "Community Icon",
    requiredPoints: 750,
    perks: ["Named community feature", "Lifetime benefits"],
    discountPercentage: 40,
    memberPercentage: 0,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  },
  {
    level: 9,
    name: "Community God",
    requiredPoints: 1000,
    perks: ["Ultimate recognition", "All previous benefits"],
    discountPercentage: 50,
    memberPercentage: 0,
    badgeColor: "bg-gray-400",
    isUnlocked: false
  }
];

export const MOCK_USER: User = {
  id: "1",
  name: "John Simeone",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  currentLevel: 3,
  totalPoints: 164,
  weeklyPoints: 26,
  monthlyPoints: 40,
  joinDate: new Date("2024-01-15"),
  lastActive: new Date()
};

export const MOCK_LEADERBOARD_WEEKLY: LeaderboardEntry[] = [
  {
    rank: 1,
    user: MOCK_USER,
    points: 26,
    change: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 2,
    user: {
      id: "2",
      name: "Benjamin Ewert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      currentLevel: 2,
      totalPoints: 101,
      weeklyPoints: 19,
      monthlyPoints: 58,
      joinDate: new Date("2024-02-01"),
      lastActive: new Date()
    },
    points: 19,
    change: -2,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 3,
    user: {
      id: "3",
      name: "Rannie Turingan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      currentLevel: 2,
      totalPoints: 78,
      weeklyPoints: 14,
      monthlyPoints: 45,
      joinDate: new Date("2024-01-20"),
      lastActive: new Date()
    },
    points: 14,
    change: 3,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 4,
    user: {
      id: "4",
      name: "William Hernandez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      currentLevel: 1,
      totalPoints: 45,
      weeklyPoints: 12,
      monthlyPoints: 32,
      joinDate: new Date("2024-02-15"),
      lastActive: new Date()
    },
    points: 12,
    change: 1,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

export const MOCK_LEADERBOARD_MONTHLY: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: "5",
      name: "Antonio C",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      currentLevel: 4,
      totalPoints: 164,
      weeklyPoints: 15,
      monthlyPoints: 109,
      joinDate: new Date("2024-01-01"),
      lastActive: new Date()
    },
    points: 109,
    change: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 2,
    user: {
      id: "6",
      name: "Josias S",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      currentLevel: 3,
      totalPoints: 142,
      weeklyPoints: 8,
      monthlyPoints: 58,
      joinDate: new Date("2024-01-10"),
      lastActive: new Date()
    },
    points: 58,
    change: -5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 3,
    user: {
      id: "7",
      name: "Catchy Cartoons",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      currentLevel: 3,
      totalPoints: 98,
      weeklyPoints: 10,
      monthlyPoints: 52,
      joinDate: new Date("2024-01-25"),
      lastActive: new Date()
    },
    points: 52,
    change: 8,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 4,
    user: MOCK_USER,
    points: 40,
    change: 7,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const MOCK_LEADERBOARD_ALLTIME: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: "5",
      name: "Antonio C",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      currentLevel: 4,
      totalPoints: 164,
      weeklyPoints: 15,
      monthlyPoints: 109,
      joinDate: new Date("2024-01-01"),
      lastActive: new Date()
    },
    points: 164,
    change: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 2,
    user: {
      id: "2",
      name: "Benjamin Ewert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      currentLevel: 3,
      totalPoints: 101,
      weeklyPoints: 19,
      monthlyPoints: 58,
      joinDate: new Date("2024-02-01"),
      lastActive: new Date()
    },
    points: 101,
    change: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 3,
    user: {
      id: "8",
      name: "Chuck Hart",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      currentLevel: 3,
      totalPoints: 94,
      weeklyPoints: 5,
      monthlyPoints: 28,
      joinDate: new Date("2024-01-05"),
      lastActive: new Date()
    },
    points: 94,
    change: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    rank: 4,
    user: {
      id: "9",
      name: "Music Nation",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      currentLevel: 2,
      totalPoints: 79,
      weeklyPoints: 3,
      monthlyPoints: 15,
      joinDate: new Date("2024-01-12"),
      lastActive: new Date()
    },
    points: 79,
    change: 0,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  }
];
