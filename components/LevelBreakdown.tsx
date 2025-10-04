import { 
  Dialog, 
  Card, 
  Badge, 
  Button, 
  Heading, 
  Text, 
  Separator
} from "frosted-ui";
import { Level } from "@/lib/types";

interface LevelBreakdownProps {
  levels: Level[];
  onClose: () => void;
}

export default function LevelBreakdown({ levels, onClose }: LevelBreakdownProps) {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Content size="4" className="max-h-[80vh] max-w-2xl">
        <Dialog.Title>Community Levels</Dialog.Title>
        <Dialog.Description>
          View all community levels and their requirements
        </Dialog.Description>
        <Dialog.Close />

        <div className="overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {levels.map((level) => (
              <Card key={level.level} variant={level.isUnlocked ? "surface" : "ghost"}>
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Level Badge */}
                    <Badge 
                      color={level.isUnlocked ? "blue" : "gray"} 
                      size="2" 
                      className={`w-10 h-10 flex items-center justify-center ${!level.isUnlocked ? 'opacity-50' : ''}`}
                    >
                      {level.isUnlocked ? level.level : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Badge>

                    {/* Level Info */}
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Heading size="4">Level {level.level}</Heading>
                        <Text size="2" color="gray">{level.name}</Text>
                      </div>
                      <Text size="2" color="gray">
                        {level.requiredPoints} points required • {level.memberPercentage}% of members
                      </Text>
                      
                      {/* Perks */}
                      {level.perks.length > 0 && (
                        <div className="flex flex-col gap-1 mt-2">
                          {level.perks.map((perk, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <Text size="2" color="gray">{perk}</Text>
                            </div>
                          ))}
                          {level.discountPercentage && (
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <Text size="2" weight="medium" color="blue">
                                {level.discountPercentage}% discount on all purchases
                              </Text>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-center w-full">
            <Text size="2" color="gray" className="flex-1">
              Earn points by participating in community activities, completing courses, and engaging with other members.
            </Text>
            <Button onClick={onClose} size="2">
              Close
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
