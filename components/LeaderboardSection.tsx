import { 
  Heading
} from "frosted-ui";
import { LeaderboardEntry } from "@/lib/types";
import LeaderboardCard from "./LeaderboardCard";

interface LeaderboardSectionProps {
  weeklyLeaderboard: LeaderboardEntry[];
  monthlyLeaderboard: LeaderboardEntry[];
  allTimeLeaderboard: LeaderboardEntry[];
}

export default function LeaderboardSection({ 
  weeklyLeaderboard, 
  monthlyLeaderboard, 
  allTimeLeaderboard 
}: LeaderboardSectionProps) {
  return (
    <div className="space-y-6">
      <Heading size="6">Community Engagement Leaderboard</Heading>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeaderboardCard 
          title="Leaderboard (7-day)"
          entries={weeklyLeaderboard}
          type="weekly"
        />
        <LeaderboardCard 
          title="Leaderboard (30-day)"
          entries={monthlyLeaderboard}
          type="monthly"
        />
        <LeaderboardCard 
          title="Leaderboard (all-time)"
          entries={allTimeLeaderboard}
          type="alltime"
        />
      </div>
    </div>
  );
}
