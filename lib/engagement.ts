import { EngagementActivity, User } from "./types";

// Point system for different engagement activities
export const ENGAGEMENT_POINTS = {
  chat_message: 1,
  forum_post: 5,
  forum_comment: 2,
  course_completion: 10,
  event_attendance: 3,
  referral: 15,
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
    
    return newActivity;
  }

  // Track chat message
  trackChatMessage(userId: string, messageLength: number = 0): EngagementActivity {
    const points = ENGAGEMENT_POINTS.chat_message;
    return this.trackActivity({
      userId,
      type: 'chat',
      points,
      description: `Sent a chat message${messageLength > 50 ? ' (detailed)' : ''}`,
      metadata: { messageLength }
    });
  }

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

  // Track forum comment
  trackForumComment(userId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.forum_comment;
    return this.trackActivity({
      userId,
      type: 'forum_comment',
      points,
      description: 'Commented on a forum post'
    });
  }

  // Track course completion
  trackCourseCompletion(userId: string, courseId: string, courseName: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.course_completion;
    return this.trackActivity({
      userId,
      type: 'course_completion',
      points,
      description: `Completed course: ${courseName}`,
      metadata: { courseId, courseName }
    });
  }

  // Track event attendance
  trackEventAttendance(userId: string, eventId: string, eventName: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.event_attendance;
    return this.trackActivity({
      userId,
      type: 'event_attendance',
      points,
      description: `Attended event: ${eventName}`,
      metadata: { eventId, eventName }
    });
  }

  // Track referral
  trackReferral(userId: string, referredUserId: string): EngagementActivity {
    const points = ENGAGEMENT_POINTS.referral;
    return this.trackActivity({
      userId,
      type: 'referral',
      points,
      description: 'Referred a new member',
      metadata: { referredUserId }
    });
  }

  // Update user points
  private updateUserPoints(userId: string, points: number): void {
    const user = this.users.get(userId);
    if (user) {
      user.totalPoints += points;
      user.weeklyPoints += points;
      user.monthlyPoints += points;
      user.lastActive = new Date();
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

// Singleton instance
export const engagementTracker = new EngagementTracker();

// Helper functions for integration with Whop SDK
export const trackWhopActivity = async (userId: string, activityType: string, metadata?: any) => {
  // This would integrate with Whop's webhook system to track real activities
  // For now, we'll simulate the tracking
  
  switch (activityType) {
    case 'chat_message':
      return engagementTracker.trackChatMessage(userId, metadata?.messageLength);
    case 'forum_post':
      return engagementTracker.trackForumPost(userId, metadata?.postLength);
    case 'forum_comment':
      return engagementTracker.trackForumComment(userId);
    case 'course_completion':
      return engagementTracker.trackCourseCompletion(userId, metadata?.courseId, metadata?.courseName);
    case 'event_attendance':
      return engagementTracker.trackEventAttendance(userId, metadata?.eventId, metadata?.eventName);
    case 'referral':
      return engagementTracker.trackReferral(userId, metadata?.referredUserId);
    default:
      console.warn(`Unknown activity type: ${activityType}`);
  }
};
