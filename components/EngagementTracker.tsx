"use client";

import { useState } from "react";
import { 
  Card, 
  Button, 
  TextArea, 
  Heading, 
  Text, 
  IconButton
} from "frosted-ui";
import { engagementTracker } from "@/lib/engagement";
import { MOCK_USER } from "@/lib/types";

export default function EngagementTracker() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState("");

  const handleSimulateActivity = (type: string) => {
    switch (type) {
      case 'chat':
        engagementTracker.trackChatMessage(MOCK_USER.id, message.length);
        setActivity(`Chat message tracked: +2 points`);
        break;
      case 'forum_post':
        engagementTracker.trackForumPost(MOCK_USER.id, message.length);
        setActivity(`Forum post tracked: +15 points`);
        break;
      case 'forum_comment':
        engagementTracker.trackForumReply(MOCK_USER.id, 'demo_post');
        setActivity(`Forum comment tracked: +8 points`);
        break;
      case 'course_completion':
        engagementTracker.trackCourseCompletion(MOCK_USER.id, 'course_1', 'Introduction to Community Building');
        setActivity(`Course completion tracked: +200 points`);
        break;
      case 'referral':
        engagementTracker.trackReferral(MOCK_USER.id, 'new_user_123');
        setActivity(`Referral tracked: +100 points`);
        break;
    }
    setMessage("");
  };

  if (!isOpen) {
    return (
      <IconButton
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 shadow-lg"
        size="3"
        title="Simulate Engagement Activity"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </IconButton>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 z-50 shadow-xl">
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <Heading size="4">Simulate Activity</Heading>
          <IconButton
            variant="ghost"
            size="1"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
      </div>

      <div className="p-4">
        {activity && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Text size="2" color="green">{activity}</Text>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Text size="2" weight="medium" className="mb-2">
              Message Content (for chat/forum simulation)
            </Text>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="solid"
              color="blue"
              size="2"
              onClick={() => handleSimulateActivity('chat')}
            >
              Chat Message
            </Button>
            <Button
              variant="solid"
              color="green"
              size="2"
              onClick={() => handleSimulateActivity('forum_post')}
            >
              Forum Post
            </Button>
            <Button
              variant="solid"
              color="yellow"
              size="2"
              onClick={() => handleSimulateActivity('forum_comment')}
            >
              Forum Comment
            </Button>
            <Button
              variant="solid"
              color="purple"
              size="2"
              onClick={() => handleSimulateActivity('course_completion')}
            >
              Complete Course
            </Button>
            <Button
              variant="solid"
              color="red"
              size="2"
              className="col-span-2"
              onClick={() => handleSimulateActivity('referral')}
            >
              Refer New Member
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Text size="1" color="gray">
          This is a demo component to simulate engagement tracking. In production, 
          activities would be tracked automatically via webhooks.
        </Text>
      </div>
    </Card>
  );
}
