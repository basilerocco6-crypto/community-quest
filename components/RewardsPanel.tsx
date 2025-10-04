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
      <Sheet.Content className="max-h-[90vh] max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 relative">
          <Sheet.Close className="absolute top-0 right-0" />
          <Sheet.Title className="text-2xl font-bold mb-2">Your Rewards</Sheet.Title>
          <Sheet.Description className="text-sm text-gray-500">
            Level {user.currentLevel} • {user.totalPoints} points
          </Sheet.Description>
        </div>

        <div className="overflow-y-auto max-h-[70vh] space-y-6">
          {/* Current Benefits - Compact */}
          {currentDiscount > 0 && (
            <Card variant="surface" className="border-l-4 border-l-blue-500">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.856.416L9.5 15.134 6.146 17.068a1 1 0 01-1.732-1.732L6.854 12.8 5.675 8.344a1 1 0 011.856-.416L9.5 9.866l3.354-1.934a1 1 0 011.146 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Heading size="4" className="font-semibold">{currentDiscount}% Member Discount</Heading>
                    <Text size="1" color="gray">Applied automatically to all purchases</Text>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Rewards Grid - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Rewards */}
            <Card variant="surface" className="h-fit">
              <div className="p-6">
                <Heading size="4" className="mb-4 font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Available Rewards
                </Heading>
                
                {availableRewards.length > 0 ? (
                  <div className="space-y-3">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Heading size="3" className="font-medium">{reward.name}</Heading>
                            <Badge color="blue" size="1">Level {reward.requiredLevel}</Badge>
                          </div>
                          <Text size="1" color="gray">{formatRewardDescription(reward)}</Text>
                        </div>
                        <Button
                          onClick={() => handleClaimReward(reward.id)}
                          size="1"
                          className="ml-3"
                        >
                          Claim
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    <Text size="2" color="gray" className="font-medium mb-0.5 text-center">No new rewards available</Text>
                    <Text size="1" color="gray" className="text-center">Level up to unlock more rewards!</Text>
                  </div>
                )}
              </div>
            </Card>

            {/* Claimed Rewards */}
            <Card variant="surface" className="h-fit">
              <div className="p-6">
                <Heading size="4" className="mb-4 font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Claimed Rewards
                </Heading>
                
                {claimedRewards.length > 0 ? (
                  <div className="space-y-3">
                    {claimedRewards.map((reward) => (
                      <div key={reward.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Heading size="3" className="font-medium">{reward.name}</Heading>
                            <Badge color="green" size="1">Claimed</Badge>
                          </div>
                          <Text size="1" color="gray">{formatRewardDescription(reward)}</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <svg className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <Text size="2" color="gray" className="font-medium mb-0.5 text-center">No rewards claimed yet</Text>
                    <Text size="1" color="gray" className="text-center">Start claiming your available rewards!</Text>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col items-center text-center space-y-4">
            <Text size="1" color="gray" className="max-w-md">
              Earn more points by participating in community activities to unlock additional rewards.
            </Text>
            <Button onClick={onClose} size="2" variant="ghost">
              Close
            </Button>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  );
}
