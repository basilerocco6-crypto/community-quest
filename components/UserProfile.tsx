import { 
  Card, 
  Avatar, 
  Badge, 
  Button, 
  Progress, 
  Heading, 
  Text, 
  Separator
} from "frosted-ui";
import { User, Level } from "@/lib/types";

interface UserProfileProps {
  user: User;
  levels: Level[];
  onShowLevelBreakdown: () => void;
}

export default function UserProfile({ user, levels, onShowLevelBreakdown }: UserProfileProps) {
  const currentLevel = levels.find(level => level.level === user.currentLevel);
  const nextLevel = levels.find(level => level.level === user.currentLevel + 1);
  
  const pointsToNextLevel = nextLevel ? nextLevel.requiredPoints - user.totalPoints : 0;
  const progressPercentage = nextLevel && currentLevel
    ? ((user.totalPoints - currentLevel.requiredPoints) / (nextLevel.requiredPoints - currentLevel.requiredPoints)) * 100
    : 100;

  return (
    <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
      <div className="flex items-center justify-between">
        {/* Left side - Avatar and User Info */}
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar 
              src={user.avatar} 
              alt={user.name} 
              fallback={user.name.charAt(0)}
              size="5"
            />
            {/* Level Badge - positioned like Skool */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{user.currentLevel}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col gap-1">
            <Heading size="5" className="text-white font-semibold">{user.name}</Heading>
            <Text size="2" color="gray" className="text-muted-foreground">Level {user.currentLevel}</Text>
            <Text size="1" color="gray" className="text-muted-foreground">{pointsToNextLevel} points to level up</Text>
          </div>
        </div>

        {/* Right side - Stats */}
        <div className="flex items-center gap-8">
          {/* Stats - directly integrated like Skool */}
          <div className="flex items-center gap-8">
            <div className="text-left">
              <div className="text-white text-lg font-bold">{user.weeklyPoints}</div>
              <div className="text-muted-foreground text-sm">This Week</div>
            </div>
            <div className="text-left">
              <div className="text-white text-lg font-bold">{user.monthlyPoints}</div>
              <div className="text-muted-foreground text-sm">This Month</div>
            </div>
            <div className="text-left">
              <div className="text-white text-lg font-bold">{user.totalPoints}</div>
              <div className="text-muted-foreground text-sm">All Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
