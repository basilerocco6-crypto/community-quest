"use client";

import { 
  Text
} from "frosted-ui";
import { Level, User } from "@/lib/types";

interface CommunityLevelsBreakdownProps {
  levels: Level[];
  user: User;
}

export default function CommunityLevelsBreakdown({ levels, user }: CommunityLevelsBreakdownProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
      <div className="space-y-3">
        {levels.map((level) => (
          <div key={level.level} className="flex items-center gap-3">
            {/* Level Badge */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              level.level <= user.currentLevel 
                ? level.badgeColor || 'bg-yellow-400' 
                : 'bg-muted'
            }`}>
              {level.level <= user.currentLevel ? (
                <span className="text-card-foreground text-sm font-semibold">{level.level}</span>
              ) : (
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {/* Level Info */}
            <div className="flex flex-col">
              <Text size="2" className="text-white">Level {level.level}</Text>
              <Text size="1" color="gray" className="text-muted-foreground">
                {level.memberPercentage}% of members
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
