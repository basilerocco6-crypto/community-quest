import { EngagementActivity, User } from "./types";

// Updated point system matching the comprehensive structure
export const ENGAGEMENT_POINTS = {
  // Chat & Communication (via Whop Chat App)
  chat_message: 2,
  chat_reply: 3,
  discussion_start: 10,
  chat_reaction_bonus: 5,
  chat_streak_bonus: 20,
  
  // Forum Activity (Quality Content)
  forum_post: 15,
  forum_reply: 8,
  forum_paywalled_post: 30,
  forum_engagement_bonus: 25,
  
  // Course & Learning
  course_module: 50,
  course_completion: 200,
  quiz_excellence: 30,
  course_progress_share: 20,
  
  // Community Value (Quality over Quantity)
  member_help: 40,
  resource_share: 25,
  self_introduction: 10,
  live_event_attendance: 75,
  weekly_checkin: 15,
  
  // Referrals & Growth
  referral: 100,
  referral_tier_bonus: 50,
  
  // Legacy support
  daily_login: 1,
  profile_completion: 5,
  first_post: 10,
  milestone_achievement: 25
} as const;

// Engagement tracking functions
export class EngagementTracker {
  private activities: EngagementActivity[] = [];
  private users: Map<string, User> = new Map();

  // Track a new engagement activity
  trackActivity(activity: Omit<EngagementActivity, 'id' | 'timestamp'>): EngagementActivity {
    const newActivity: EngagementActivity = {
      ...activity,
      id: this.generateId(),
      timestamp: new Date()
    };

    this.activities.push(newActivity);
    this.updateUserPoints(activity.userId, activity.points);
    
    // Emit event for real-time updates
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('engagementUpdate', {
        detail: {
          userId: activity.userId,
          activity: newActivity,
          type: activity.type,
          points: activity.points
        }
      });
      window.dispatchEvent(event);
    }
    
    return newActivity;
  }

  // === CHAT & COMMUNICATION (via Whop Chat App) ===
  
  // Track chat message
  trackChatMessage(userId: string, messageLength: number = 0): EngagementActivity {
    const points = ENGAGEMENT_POINTS.chat_message;
    return this.trackActivity({
      userId,
      type: 'chat_message',
      points,
      description: `Sent a chat message${messageLength > 50 ? ' (detailed)' : ''}`,
      metadata: { messageLength }
    });
  }

  // Track chat reply
  trackChatReply(userId: string, originalMessageId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.chat_reply;
    return this.trackActivity({
      userId,
      type: 'chat_reply',
      points,
      description: 'Replied to someone\'s message',
      metadata: { originalMessageId }
    });
  }

  // Track discussion start
  trackDiscussionStart(userId: string, discussionId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.discussion_start;
    return this.trackActivity({
      userId,
      type: 'discussion_start',
      points,
      description: 'Started a meaningful discussion thread',
      metadata: { discussionId }
    });
  }

  // Track chat reaction bonus
  trackChatReactionBonus(userId: string, messageId: string, reactionCount: number): EngagementActivity {
    const points = ENGAGEMENT_POINTS.chat_reaction_bonus;
    return this.trackActivity({
      userId,
      type: 'chat_reaction_bonus',
      points,
      description: `Got ${reactionCount}+ reactions on message`,
      metadata: { messageId, reactionCount }
    });
  }

  // Track chat streak bonus
  trackChatStreakBonus(userId: string, streakDays: number): EngagementActivity {
    const points = ENGAGEMENT_POINTS.chat_streak_bonus;
    return this.trackActivity({
      userId,
      type: 'chat_streak_bonus',
      points,
      description: `Daily chat streak (${streakDays} days)`,
      metadata: { streakDays }
    });
  }

  // === FORUM ACTIVITY (Quality Content) ===

  // Track forum post
  trackForumPost(userId: string, postLength: number = 0): EngagementActivity {
    const points = ENGAGEMENT_POINTS.forum_post;
    return this.trackActivity({
      userId,
      type: 'forum_post',
      points,
      description: `Created a forum post${postLength > 200 ? ' (detailed)' : ''}`,
      metadata: { postLength }
    });
  }

  // Track forum reply
  trackForumReply(userId: string, postId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.forum_reply;
    return this.trackActivity({
      userId,
      type: 'forum_reply',
      points,
      description: 'Replied to a forum post',
      metadata: { postId }
    });
  }

  // Track paywalled forum post
  trackForumPaywalledPost(userId: string, postId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.forum_paywalled_post;
    return this.trackActivity({
      userId,
      type: 'forum_paywalled_post',
      points,
      description: 'Created paywalled post for premium members',
      metadata: { postId }
    });
  }

  // Track forum engagement bonus
  trackForumEngagementBonus(userId: string, postId: string, replyCount: number): EngagementActivity {
    const points = ENGAGEMENT_POINTS.forum_engagement_bonus;
    return this.trackActivity({
      userId,
      type: 'forum_engagement_bonus',
      points,
      description: `Created post with ${replyCount}+ replies`,
      metadata: { postId, replyCount }
    });
  }

  // === COURSE & LEARNING ===

  // Track course module completion
  trackCourseModule(userId: string, moduleId: string, moduleName: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.course_module;
    return this.trackActivity({
      userId,
      type: 'course_module',
      points,
      description: `Completed course module: ${moduleName}`,
      metadata: { moduleId, moduleName }
    });
  }

  // Track course completion
  trackCourseCompletion(userId: string, courseId: string, courseName: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.course_completion;
    return this.trackActivity({
      userId,
      type: 'course_completion',
      points,
      description: `Completed entire course: ${courseName}`,
      metadata: { courseId, courseName }
    });
  }

  // Track quiz excellence
  trackQuizExcellence(userId: string, quizId: string, score: number): EngagementActivity {
    const points = ENGAGEMENT_POINTS.quiz_excellence;
    return this.trackActivity({
      userId,
      type: 'quiz_excellence',
      points,
      description: `Scored ${score}%+ on quiz`,
      metadata: { quizId, score }
    });
  }

  // Track course progress share
  trackCourseProgressShare(userId: string, courseId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.course_progress_share;
    return this.trackActivity({
      userId,
      type: 'course_progress_share',
      points,
      description: 'Shared course progress/wins',
      metadata: { courseId }
    });
  }

  // === COMMUNITY VALUE (Quality over Quantity) ===

  // Track member help
  trackMemberHelp(userId: string, helpedUserId: string, helpType: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.member_help;
    return this.trackActivity({
      userId,
      type: 'member_help',
      points,
      description: `Helped another member (verified by admin)`,
      metadata: { helpedUserId, helpType }
    });
  }

  // Track resource share
  trackResourceShare(userId: string, resourceType: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.resource_share;
    return this.trackActivity({
      userId,
      type: 'resource_share',
      points,
      description: 'Shared a valuable resource',
      metadata: { resourceType }
    });
  }

  // Track self introduction
  trackSelfIntroduction(userId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.self_introduction;
    return this.trackActivity({
      userId,
      type: 'self_introduction',
      points,
      description: 'Introduced yourself (one-time)',
      metadata: { oneTime: true }
    });
  }

  // Track live event attendance
  trackLiveEventAttendance(userId: string, eventId: string, eventName: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.live_event_attendance;
    return this.trackActivity({
      userId,
      type: 'live_event_attendance',
      points,
      description: `Attended live event: ${eventName}`,
      metadata: { eventId, eventName }
    });
  }

  // Track weekly check-in
  trackWeeklyCheckin(userId: string, weekNumber: number): EngagementActivity {
    const points = ENGAGEMENT_POINTS.weekly_checkin;
    return this.trackActivity({
      userId,
      type: 'weekly_checkin',
      points,
      description: 'Weekly check-in post',
      metadata: { weekNumber }
    });
  }

  // === REFERRALS & GROWTH ===

  // Track referral
  trackReferral(userId: string, referredUserId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.referral;
    return this.trackActivity({
      userId,
      type: 'referral',
      points,
      description: 'Referred a new member who joined',
      metadata: { referredUserId }
    });
  }

  // Track referral tier bonus
  trackReferralTierBonus(userId: string, referredUserId: string, tier: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.referral_tier_bonus;
    return this.trackActivity({
      userId,
      type: 'referral_tier_bonus',
      points,
      description: `Referred member reached ${tier} tier`,
      metadata: { referredUserId, tier }
    });
  }

  // Update user points
  private updateUserPoints(userId: string, points: number): void {
    let user = this.users.get(userId);
    
    // Initialize user if they don't exist
    if (!user) {
      user = {
        id: userId,
        name: "Community Member",
        currentLevel: 1,
        totalPoints: 0,
        weeklyPoints: 0,
        monthlyPoints: 0,
        joinDate: new Date(),
        lastActive: new Date()
      };
      this.users.set(userId, user);
      console.log(`Auto-initialized new user: ${userId}`);
    }
    
    user.totalPoints += points;
    user.weeklyPoints += points;
    user.monthlyPoints += points;
    user.lastActive = new Date();
    
    console.log(`Updated points for user ${userId}: +${points} (total: ${user.totalPoints})`);
  }

  // Get user data
  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  // Get all users
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Reset user points (for testing)
  resetUserPoints(userId: string): void {
    const user = this.users.get(userId);
    if (user) {
      user.totalPoints = 0;
      user.weeklyPoints = 0;
      user.monthlyPoints = 0;
      console.log(`Reset points for user ${userId}`);
    }
  }

  // Get user engagement summary
  getUserEngagement(userId: string, timeframe: 'week' | 'month' | 'all' = 'all'): {
    totalPoints: number;
    activities: EngagementActivity[];
    activityBreakdown: Record<string, number>;
  } {
    const now = new Date();
    const cutoff = new Date();
    
    switch (timeframe) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      default:
        cutoff.setFullYear(2000); // All time
    }

    const userActivities = this.activities.filter(
      activity => activity.userId === userId && activity.timestamp >= cutoff
    );

    const totalPoints = userActivities.reduce((sum, activity) => sum + activity.points, 0);
    
    const activityBreakdown = userActivities.reduce((breakdown, activity) => {
      breakdown[activity.type] = (breakdown[activity.type] || 0) + 1;
      return breakdown;
    }, {} as Record<string, number>);

    console.log(`Engagement data for user ${userId} (${timeframe}):`, {
      totalPoints,
      activitiesCount: userActivities.length,
      activityBreakdown
    });

    return {
      totalPoints,
      activities: userActivities,
      activityBreakdown
    };
  }

  // Get leaderboard data
  getLeaderboard(timeframe: 'week' | 'month' | 'all' = 'all'): Array<{
    userId: string;
    points: number;
    activities: number;
  }> {
    const userPoints = new Map<string, { points: number; activities: number }>();
    
    const now = new Date();
    const cutoff = new Date();
    
    switch (timeframe) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      default:
        cutoff.setFullYear(2000); // All time
    }

    this.activities
      .filter(activity => activity.timestamp >= cutoff)
      .forEach(activity => {
        const current = userPoints.get(activity.userId) || { points: 0, activities: 0 };
        userPoints.set(activity.userId, {
          points: current.points + activity.points,
          activities: current.activities + 1
        });
      });

    return Array.from(userPoints.entries())
      .map(([userId, data]) => ({ userId, ...data }))
      .sort((a, b) => b.points - a.points);
  }

  // Helper to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Initialize a new user in the engagement tracker
export const initializeUser = (userId: string, userData: Partial<User>) => {
  const existingUser = engagementTracker['users'].get(userId);
  if (!existingUser) {
    engagementTracker['users'].set(userId, {
      id: userId,
      name: userData.name || "Community Member",
      avatar: userData.avatar,
      email: userData.email,
      currentLevel: 1,
      totalPoints: 0,
      weeklyPoints: 0,
      monthlyPoints: 0,
      joinDate: userData.joinDate || new Date(),
      lastActive: new Date()
    });
    console.log(`Initialized new user: ${userId}`);
  }
};

// Singleton instance
export const engagementTracker = new EngagementTracker();

// Helper functions for integration with Whop SDK
export const trackWhopActivity = async (userId: string, activityType: string, metadata?: any) => {
  // This integrates with Whop's webhook system to track real activities from external apps
  
  switch (activityType) {
    // === WHOP MEMBERSHIP EVENTS ===
    case 'membership_went_valid':
      return engagementTracker.trackActivity({
        userId,
        type: 'self_introduction',
        points: ENGAGEMENT_POINTS.self_introduction,
        description: 'New member joined the community',
        metadata: { event: 'membership_went_valid' }
      });
    case 'membership_went_invalid':
      return engagementTracker.trackActivity({
        userId,
        type: 'member_help',
        points: -ENGAGEMENT_POINTS.member_help,
        description: 'Member cancelled membership',
        metadata: { event: 'membership_went_invalid' }
      });
    case 'app_payment_succeeded':
      return engagementTracker.trackActivity({
        userId,
        type: 'member_help',
        points: ENGAGEMENT_POINTS.member_help,
        description: 'Successful payment processed',
        metadata: { event: 'app_payment_succeeded' }
      });
    case 'membership_experience_claimed':
      return engagementTracker.trackActivity({
        userId,
        type: 'member_help',
        points: ENGAGEMENT_POINTS.member_help,
        description: 'Member claimed experience/reward',
        metadata: { event: 'membership_experience_claimed' }
      });
    case 'membership_metadata_updated':
      return engagementTracker.trackActivity({
        userId,
        type: 'self_introduction',
        points: ENGAGEMENT_POINTS.self_introduction,
        description: 'Member updated profile information',
        metadata: { event: 'membership_metadata_updated' }
      });
    
    // === LEGACY SUPPORT (for manual tracking) ===
    case 'forum_post':
      return engagementTracker.trackForumPost(userId, metadata?.postLength);
    case 'forum_reply':
      return engagementTracker.trackForumReply(userId, metadata?.postId);
    case 'forum_paywalled_post':
      return engagementTracker.trackForumPaywalledPost(userId, metadata?.postId);
    case 'forum_engagement_bonus':
      return engagementTracker.trackForumEngagementBonus(userId, metadata?.postId, metadata?.replyCount);
    
    // === COURSE & LEARNING ===
    case 'course_module':
      return engagementTracker.trackCourseModule(userId, metadata?.moduleId, metadata?.moduleName);
    case 'course_completion':
      return engagementTracker.trackCourseCompletion(userId, metadata?.courseId, metadata?.courseName);
    case 'quiz_excellence':
      return engagementTracker.trackQuizExcellence(userId, metadata?.quizId, metadata?.score);
    case 'course_progress_share':
      return engagementTracker.trackCourseProgressShare(userId, metadata?.courseId);
    
    // === COMMUNITY VALUE ===
    case 'member_help':
      return engagementTracker.trackMemberHelp(userId, metadata?.helpedUserId, metadata?.helpType);
    case 'resource_share':
      return engagementTracker.trackResourceShare(userId, metadata?.resourceType);
    case 'self_introduction':
      return engagementTracker.trackSelfIntroduction(userId);
    case 'live_event_attendance':
      return engagementTracker.trackLiveEventAttendance(userId, metadata?.eventId, metadata?.eventName);
    case 'weekly_checkin':
      return engagementTracker.trackWeeklyCheckin(userId, metadata?.weekNumber);
    
    // === REFERRALS & GROWTH ===
    case 'referral':
      return engagementTracker.trackReferral(userId, metadata?.referredUserId);
    case 'referral_tier_bonus':
      return engagementTracker.trackReferralTierBonus(userId, metadata?.referredUserId, metadata?.tier);
    
    // === LEGACY SUPPORT ===
    case 'forum_comment':
      return engagementTracker.trackForumReply(userId, metadata?.postId);
    case 'event_attendance':
      return engagementTracker.trackLiveEventAttendance(userId, metadata?.eventId, metadata?.eventName);
    
    default:
      console.warn(`Unknown activity type: ${activityType} from ${metadata?.sourceApp || 'unknown'}`);
  }
};
