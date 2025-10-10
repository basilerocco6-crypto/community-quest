import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import CommunityQuestClient from "./CommunityQuestClient";
import { engagementTracker, initializeUser } from "@/lib/engagement";

export default async function CommunityQuestWrapper() {
  try {
    // Get headers for user token
    const headersList = await headers();
    
    // Verify user token and get user data
    const { userId } = await whopSdk.verifyUserToken(headersList);
    const user = await whopSdk.users.getUser({ userId });
    
    console.log("Whop user data:", {
      id: user.id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt
    });
    
    // Initialize user in engagement tracker if not already present
    initializeUser(userId, {
      name: user.name || user.username,
      avatar: (user.profilePicture as any)?.url || (user.profilePicture as any)?.sourceUrl || null,
      email: (user as any).email || null,
      joinDate: new Date(user.createdAt)
    });
    
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
      avatar: (user.profilePicture as any)?.url || (user.profilePicture as any)?.sourceUrl || null,
      email: (user as any).email || null,
      currentLevel,
      totalPoints: engagementData.totalPoints,
      weeklyPoints: weeklyEngagement.totalPoints,
      monthlyPoints: monthlyEngagement.totalPoints,
      joinDate: new Date(user.createdAt),
      lastActive: new Date((user as any).updatedAt || user.createdAt)
    };

    console.log("Transformed user data:", transformedUser);

    return <CommunityQuestClient user={transformedUser} />;
  } catch (error) {
    console.error("Error loading user data:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Fallback to mock data if there's an error
    const { MOCK_USER } = await import("@/lib/types");
    console.log("Falling back to mock user:", MOCK_USER);
    return <CommunityQuestClient user={MOCK_USER} />;
  }
}
