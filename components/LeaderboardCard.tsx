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
      </div>
      
      {/* View More Button */}
      <div className="p-4 pt-0">
        <Separator className="mb-3" />
        <Button variant="ghost" size="2" className="w-full">
          View All →
        </Button>
      </div>
    </Card>
  );
}
