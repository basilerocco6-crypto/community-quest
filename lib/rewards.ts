import { User, Level, Reward } from "./types";

// Reward system for managing tier-based benefits
export class RewardSystem {
  private rewards: Map<string, Reward> = new Map();
  private userRewards: Map<string, Set<string>> = new Map();

  constructor() {
    this.initializeDefaultRewards();
  }

  // Initialize default rewards for each level
  private initializeDefaultRewards(): void {
    const defaultRewards: Reward[] = [
      {
        id: 'level_2_discount',
        name: 'Member Discount',
        description: '5% discount on all purchases',
        type: 'discount',
        value: 5,
        requiredLevel: 2,
        isActive: true
      },
      {
        id: 'level_3_vip_support',
        name: 'VIP Support',
        description: 'Priority customer support',
        type: 'access',
        requiredLevel: 3,
        isActive: true
      },
      {
        id: 'level_3_early_access',
        name: 'Early Access',
        description: 'Early access to new features and content',
        type: 'access',
        requiredLevel: 3,
        isActive: true
      },
      {
        id: 'level_4_mentorship',
        name: 'Mentorship Program',
        description: 'Access to mentorship opportunities',
        type: 'access',
        requiredLevel: 4,
        isActive: true
      },
      {
        id: 'level_4_custom_badge',
        name: 'Custom Badge',
        description: 'Custom community badge',
        type: 'badge',
        requiredLevel: 4,
        isActive: true
      },
      {
        id: 'level_5_moderator',
        name: 'Moderator Privileges',
        description: 'Community moderation tools',
        type: 'access',
        requiredLevel: 5,
        isActive: true
      },
      {
        id: 'level_5_founder_access',
        name: 'Founder Access',
        description: 'Direct access to community founders',
        type: 'access',
        requiredLevel: 5,
        isActive: true
      },
      {
        id: 'level_6_revenue_sharing',
        name: 'Revenue Sharing',
        description: 'Eligibility for revenue sharing program',
        type: 'access',
        requiredLevel: 6,
        isActive: true
      },
      {
        id: 'level_7_cofounder',
        name: 'Co-founder Status',
        description: 'Official co-founder recognition',
        type: 'badge',
        requiredLevel: 7,
        isActive: true
      },
      {
        id: 'level_7_equity',
        name: 'Equity Opportunities',
        description: 'Eligibility for equity participation',
        type: 'access',
        requiredLevel: 7,
        isActive: true
      },
      {
        id: 'level_8_named_feature',
        name: 'Named Feature',
        description: 'Community feature named after you',
        type: 'badge',
        requiredLevel: 8,
        isActive: true
      },
      {
        id: 'level_8_lifetime',
        name: 'Lifetime Benefits',
        description: 'All benefits for life',
        type: 'access',
        requiredLevel: 8,
        isActive: true
      },
      {
        id: 'level_9_ultimate',
        name: 'Ultimate Recognition',
        description: 'Ultimate community recognition',
        type: 'badge',
        requiredLevel: 9,
        isActive: true
      }
    ];

    defaultRewards.forEach(reward => {
      this.rewards.set(reward.id, reward);
    });
  }

  // Get rewards for a specific level
  getRewardsForLevel(level: number): Reward[] {
    return Array.from(this.rewards.values())
      .filter(reward => reward.requiredLevel <= level && reward.isActive);
  }

  // Get available rewards for user (unlocked but not claimed)
  getAvailableRewardsForUser(user: User): Reward[] {
    const userRewards = this.userRewards.get(user.id) || new Set();
    return this.getRewardsForLevel(user.currentLevel)
      .filter(reward => !userRewards.has(reward.id));
  }

  // Get claimed rewards for user
  getClaimedRewardsForUser(user: User): Reward[] {
    const userRewards = this.userRewards.get(user.id) || new Set();
    return Array.from(this.rewards.values())
      .filter(reward => userRewards.has(reward.id));
  }

  // Claim a reward for a user
  claimReward(userId: string, rewardId: string): boolean {
    const reward = this.rewards.get(rewardId);
    if (!reward || !reward.isActive) {
      return false;
    }

    const userRewards = this.userRewards.get(userId) || new Set();
    if (userRewards.has(rewardId)) {
      return false; // Already claimed
    }

    userRewards.add(rewardId);
    this.userRewards.set(userId, userRewards);
    return true;
  }

  // Check if user has a specific reward
  hasReward(userId: string, rewardId: string): boolean {
    const userRewards = this.userRewards.get(userId) || new Set();
    return userRewards.has(rewardId);
  }

  // Calculate discount percentage for user
  calculateDiscount(user: User): number {
    const discounts = this.getRewardsForLevel(user.currentLevel)
      .filter(reward => reward.type === 'discount')
      .map(reward => reward.value || 0);
    
    return Math.max(...discounts, 0);
  }

  // Get next reward to unlock
  getNextReward(user: User, levels: Level[]): Reward | null {
    const nextLevel = levels.find(level => level.level === user.currentLevel + 1);
    if (!nextLevel) return null;

    const nextLevelRewards = this.getRewardsForLevel(nextLevel.level)
      .filter(reward => reward.requiredLevel === nextLevel.level);
    
    return nextLevelRewards[0] || null;
  }

  // Get progress to next reward
  getProgressToNextReward(user: User, levels: Level[]): {
    nextReward: Reward | null;
    pointsNeeded: number;
    progressPercentage: number;
  } {
    const nextReward = this.getNextReward(user, levels);
    if (!nextReward) {
      return {
        nextReward: null,
        pointsNeeded: 0,
        progressPercentage: 100
      };
    }

    const currentLevel = levels.find(level => level.level === user.currentLevel);
    const nextLevel = levels.find(level => level.level === nextReward.requiredLevel);
    
    if (!currentLevel || !nextLevel) {
      return {
        nextReward,
        pointsNeeded: 0,
        progressPercentage: 0
      };
    }

    const pointsNeeded = nextLevel.requiredPoints - user.totalPoints;
    const totalPointsNeeded = nextLevel.requiredPoints - currentLevel.requiredPoints;
    const progressPercentage = Math.max(0, Math.min(100, 
      ((user.totalPoints - currentLevel.requiredPoints) / totalPointsNeeded) * 100
    ));

    return {
      nextReward,
      pointsNeeded: Math.max(0, pointsNeeded),
      progressPercentage
    };
  }

  // Auto-unlock rewards when user levels up
  autoUnlockRewards(user: User): Reward[] {
    const newlyUnlocked: Reward[] = [];
    const availableRewards = this.getAvailableRewardsForUser(user);
    
    // Auto-claim certain types of rewards
    availableRewards.forEach(reward => {
      if (reward.type === 'discount' || reward.type === 'access') {
        if (this.claimReward(user.id, reward.id)) {
          newlyUnlocked.push(reward);
        }
      }
    });

    return newlyUnlocked;
  }

  // Create custom reward
  createReward(reward: Omit<Reward, 'id'>): Reward {
    const newReward: Reward = {
      ...reward,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    this.rewards.set(newReward.id, newReward);
    return newReward;
  }

  // Update reward
  updateReward(rewardId: string, updates: Partial<Reward>): boolean {
    const reward = this.rewards.get(rewardId);
    if (!reward) return false;

    const updatedReward = { ...reward, ...updates };
    this.rewards.set(rewardId, updatedReward);
    return true;
  }

  // Delete reward
  deleteReward(rewardId: string): boolean {
    return this.rewards.delete(rewardId);
  }
}

// Singleton instance
export const rewardSystem = new RewardSystem();

// Helper functions for integration
export const applyDiscount = (originalPrice: number, user: User): number => {
  const discountPercentage = rewardSystem.calculateDiscount(user);
  return originalPrice * (1 - discountPercentage / 100);
};

export const formatRewardDescription = (reward: Reward): string => {
  switch (reward.type) {
    case 'discount':
      return `${reward.value}% discount on all purchases`;
    case 'access':
      return reward.description;
    case 'badge':
      return `Special badge: ${reward.description}`;
    case 'content':
      return `Exclusive content: ${reward.description}`;
    default:
      return reward.description;
  }
};
