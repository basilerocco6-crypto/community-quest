import { 
  Sheet, 
  Card, 
  Badge, 
  Button, 
  Heading, 
  Text, 
  Separator
} from "frosted-ui";
import { User, Reward } from "@/lib/types";
import { rewardSystem, formatRewardDescription } from "@/lib/rewards";

interface RewardsPanelProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export default function RewardsPanel({ user, isOpen, onClose }: RewardsPanelProps) {
  const availableRewards = rewardSystem.getAvailableRewardsForUser(user);
  const claimedRewards = rewardSystem.getClaimedRewardsForUser(user);
  const currentDiscount = rewardSystem.calculateDiscount(user);

  const handleClaimReward = (rewardId: string) => {
    if (rewardSystem.claimReward(user.id, rewardId)) {
      // Refresh the component or show success message
      console.log(`Claimed reward: ${rewardId}`);
    }
  };

  return (
    <Sheet.Root open={isOpen} onOpenChange={onClose}>
      <Sheet.Content className="max-h-[80vh] max-w-4xl">
        <Sheet.Title>Your Rewards</Sheet.Title>
        <Sheet.Description>
          Level {user.currentLevel} • {user.totalPoints} points
        </Sheet.Description>
        <Sheet.Close />

        <div className="overflow-y-auto max-h-[60vh]">
          {/* Current Benefits */}
          {currentDiscount > 0 && (
            <div className="mb-6">
              <Heading size="5" className="mb-3">Active Benefits</Heading>
              <Card variant="surface">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.856.416L9.5 15.134 6.146 17.068a1 1 0 01-1.732-1.732L6.854 12.8 5.675 8.344a1 1 0 011.856-.416L9.5 9.866l3.354-1.934a1 1 0 011.146 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <Heading size="3">{currentDiscount}% Member Discount</Heading>
                      <Text size="2" color="gray">Applied automatically to all purchases</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Available Rewards */}
            <div className="flex flex-col gap-3 flex-1">
              <Heading size="5">Available Rewards</Heading>
              {availableRewards.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {availableRewards.map((reward) => (
                    <Card key={reward.id} variant="surface">
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-2 flex-1">
                            <Heading size="3">{reward.name}</Heading>
                            <Text size="2" color="gray">{formatRewardDescription(reward)}</Text>
                            <Badge color="blue" size="1">Level {reward.requiredLevel}</Badge>
                          </div>
                          <Button
                            onClick={() => handleClaimReward(reward.id)}
                            size="2"
                            className="ml-4"
                          >
                            Claim
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card variant="ghost">
                  <div className="p-4">
                    <div className="flex flex-col items-center gap-3 py-8">
                      <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <Text size="2" color="gray">No new rewards available</Text>
                      <Text size="1" color="gray">Level up to unlock more rewards!</Text>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Claimed Rewards */}
            <div className="flex flex-col gap-3 flex-1">
              <Heading size="5">Claimed Rewards</Heading>
              {claimedRewards.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {claimedRewards.map((reward) => (
                    <Card key={reward.id} variant="surface">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <Heading size="3">{reward.name}</Heading>
                            <Text size="2" color="gray">{formatRewardDescription(reward)}</Text>
                            <Badge color="green" size="1">Claimed</Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card variant="ghost">
                  <div className="p-4">
                    <div className="flex flex-col items-center gap-3 py-8">
                      <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <Text size="2" color="gray">No rewards claimed yet</Text>
                      <Text size="1" color="gray">Start claiming your available rewards!</Text>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-center w-full">
            <Text size="2" color="gray" className="flex-1">
              Earn more points by participating in community activities to unlock additional rewards.
            </Text>
            <Button onClick={onClose} size="2">
              Close
            </Button>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  );
}
