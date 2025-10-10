import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import CommunityQuestClient from "./CommunityQuestClient";
import { engagementTracker } from "@/lib/engagement";

export default async function CommunityQuestWrapper() {
  try {
    // Get headers for user token
    const headersList = await headers();
    
    // Verify user token and get user data
    const { userId } = await whopSdk.verifyUserToken(headersList);
    const user = await whopSdk.users.getUser({ userId });
    
    // Get engagement data for this user
    const engagementData = engagementTracker.getUserEngagement(userId, 'all');
    const weeklyEngagement = engagementTracker.getUserEngagement(userId, 'week');
    const monthlyEngagement = engagementTracker.getUserEngagement(userId, 'month');
    
    // Calculate current level based on total points
    const { MOCK_LEVELS } = await import("@/lib/types");
    let currentLevel = 1;
    for (const level of MOCK_LEVELS) {
      if (engagementData.totalPoints >= level.requiredPoints) {
        currentLevel = level.level;
      }
    }
    
    // Transform Whop user data to our User interface with real engagement data
    const transformedUser = {
      id: user.id,
      name: user.name || user.username || "Community Member",
      avatar: user.profile_picture_url,
      email: user.email,
      currentLevel,
      totalPoints: engagementData.totalPoints,
      weeklyPoints: weeklyEngagement.totalPoints,
      monthlyPoints: monthlyEngagement.totalPoints,
      joinDate: new Date(user.created_at),
      lastActive: new Date(user.updated_at || user.created_at)
    };

    return <CommunityQuestClient user={transformedUser} />;
  } catch (error) {
    console.error("Error loading user data:", error);
    
    // Fallback to mock data if there's an error
    const { MOCK_USER } = await import("@/lib/types");
    return <CommunityQuestClient user={MOCK_USER} />;
  }
}
