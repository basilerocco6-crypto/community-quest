import { 
  Card, 
  Avatar, 
  Badge, 
  Button, 
  Heading, 
  Text, 
  Separator
} from "frosted-ui";
import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardCardProps {
  title: string;
  entries: LeaderboardEntry[];
  type: 'weekly' | 'monthly' | 'alltime';
}

const getRankBadgeColor = (rank: number): "yellow" | "gray" | "amber" => {
  switch (rank) {
    case 1:
      return "yellow";
    case 2:
      return "gray";
    case 3:
      return "amber";
    default:
      return "gray";
  }
};

export default function LeaderboardCard({ title, entries, type }: LeaderboardCardProps) {
  return (
    <Card>
      <div className="p-4 border-b border-border">
        <Heading size="4">{title}</Heading>
      </div>
      
      <div className="p-4">
        {entries.length === 0 ? (
          // Empty state for fresh installations
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <Text size="2" weight="medium" color="gray" className="mb-2">
              No activity yet
            </Text>
            <Text size="1" color="gray">
              {type === 'weekly' && "Start engaging this week to see the leaderboard!"}
              {type === 'monthly' && "Monthly leaderboard will appear as members engage!"}
              {type === 'alltime' && "All-time leaderboard will build as your community grows!"}
            </Text>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent-2 transition-colors">
                {/* Rank Badge */}
                <Badge color={getRankBadgeColor(entry.rank)} size="2" className="w-8 h-8 flex items-center justify-center">
                  {entry.rank}
                </Badge>
                
                {/* Avatar */}
                <Avatar 
                  src={entry.avatar} 
                  alt={entry.user.name} 
                  fallback={entry.user.name.charAt(0)}
                  size="3"
                />
                
                {/* User Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <Text size="2" weight="medium" className="truncate">
                    {entry.user.name}
                  </Text>
                  <Text size="1" color="gray">
                    Level {entry.user.currentLevel}
                  </Text>
                </div>
                
                {/* Points */}
                <div className="flex flex-col items-end">
                  <Text size="2" weight="bold">
                    {type === 'alltime' ? entry.points : `+${entry.points}`}
                  </Text>
                  {type !== 'alltime' && entry.change !== 0 && (
                    <Text 
                      size="1" 
                      color={entry.change > 0 ? "green" : "red"}
                    >
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* View More Button - only show if there are entries */}
      {entries.length > 0 && (
        <div className="p-4 pt-0">
          <Separator className="mb-3" />
          <Button variant="ghost" size="2" className="w-full">
            View All →
          </Button>
        </div>
      )}
    </Card>
  );
}
