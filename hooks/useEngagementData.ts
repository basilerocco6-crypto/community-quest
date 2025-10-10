"use client";

import { useState, useEffect } from "react";
import { engagementTracker } from "@/lib/engagement";
import { User } from "@/lib/types";

export function useEngagementData(initialUser: User) {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  // Function to refresh user engagement data
  const refreshEngagementData = async () => {
    setIsLoading(true);
    try {
      // Get fresh engagement data
      const engagementData = engagementTracker.getUserEngagement(user.id, 'all');
      const weeklyEngagement = engagementTracker.getUserEngagement(user.id, 'week');
      const monthlyEngagement = engagementTracker.getUserEngagement(user.id, 'month');
      
      // Calculate current level based on total points
      const { MOCK_LEVELS } = await import("@/lib/types");
      let currentLevel = 1;
      for (const level of MOCK_LEVELS) {
        if (engagementData.totalPoints >= level.requiredPoints) {
          currentLevel = level.level;
        }
      }
      
      // Update user with fresh engagement data
      setUser(prevUser => ({
        ...prevUser,
        currentLevel,
        totalPoints: engagementData.totalPoints,
        weeklyPoints: weeklyEngagement.totalPoints,
        monthlyPoints: monthlyEngagement.totalPoints,
      }));
    } catch (error) {
      console.error("Error refreshing engagement data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for engagement tracking events
  useEffect(() => {
    // Create a custom event listener for engagement updates
    const handleEngagementUpdate = (event: CustomEvent) => {
      if (event.detail.userId === user.id) {
        refreshEngagementData();
      }
    };

    // Add event listener
    window.addEventListener('engagementUpdate', handleEngagementUpdate as EventListener);
    
    // Refresh data on mount
    refreshEngagementData();

    return () => {
      window.removeEventListener('engagementUpdate', handleEngagementUpdate as EventListener);
    };
  }, [user.id]);

  return {
    user,
    refreshEngagementData,
    isLoading
  };
}
