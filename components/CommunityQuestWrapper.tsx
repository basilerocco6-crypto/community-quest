import { whopSdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";
import CommunityQuestClient from "./CommunityQuestClient";

export default async function CommunityQuestWrapper() {
  try {
    // Get headers for user token
    const headersList = await headers();
    
    // Verify user token and get user data
    const { userId } = await whopSdk.verifyUserToken(headersList);
    const user = await whopSdk.users.getUser({ userId });
    
    // Transform Whop user data to our User interface
    const transformedUser = {
      id: user.id,
      name: user.name || user.username || "Community Member",
      avatar: user.profile_picture_url,
      email: user.email,
      currentLevel: 1, // Default level, will be calculated based on engagement
      totalPoints: 0, // Will be calculated from engagement data
      weeklyPoints: 0,
      monthlyPoints: 0,
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
