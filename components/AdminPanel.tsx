"use client";

import { useState } from "react";
import { 
  Card, 
  Button, 
  TextField, 
  Heading, 
  Text, 
  Badge,
  Dialog,
  Separator
} from "frosted-ui";

interface PointRule {
  id: string;
  activityType: string;
  points: number;
  description: string;
  category: string;
  enabled: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [pointRules, setPointRules] = useState<PointRule[]>([
    // Chat & Communication
    { id: '1', activityType: 'chat_message', points: 2, description: 'Send a message in chat', category: 'Chat & Communication', enabled: true },
    { id: '2', activityType: 'chat_reply', points: 3, description: 'Reply to someone\'s message', category: 'Chat & Communication', enabled: true },
    { id: '3', activityType: 'discussion_start', points: 10, description: 'Start a meaningful discussion thread', category: 'Chat & Communication', enabled: true },
    { id: '4', activityType: 'chat_reaction_bonus', points: 5, description: 'Get 5+ reactions on your message', category: 'Chat & Communication', enabled: true },
    { id: '5', activityType: 'chat_streak_bonus', points: 20, description: 'Daily chat streak (7 days)', category: 'Chat & Communication', enabled: true },
    
    // Forum Activity
    { id: '6', activityType: 'forum_post', points: 15, description: 'Create a forum post', category: 'Forum Activity', enabled: true },
    { id: '7', activityType: 'forum_reply', points: 8, description: 'Reply to a forum post', category: 'Forum Activity', enabled: true },
    { id: '8', activityType: 'forum_pinned', points: 50, description: 'Get your post pinned by admin', category: 'Forum Activity', enabled: true },
    { id: '9', activityType: 'forum_helpful_bonus', points: 15, description: 'Receive "helpful" reaction from 3+ members', category: 'Forum Activity', enabled: true },
    { id: '10', activityType: 'forum_engagement_bonus', points: 25, description: 'Create a post with 10+ replies', category: 'Forum Activity', enabled: true },
    
    // Course & Learning
    { id: '11', activityType: 'course_module', points: 50, description: 'Complete a course module', category: 'Course & Learning', enabled: true },
    { id: '12', activityType: 'course_completion', points: 200, description: 'Complete an entire course', category: 'Course & Learning', enabled: true },
    { id: '13', activityType: 'quiz_excellence', points: 30, description: 'Score 90%+ on a quiz', category: 'Course & Learning', enabled: true },
    { id: '14', activityType: 'course_progress_share', points: 20, description: 'Share course progress/wins', category: 'Course & Learning', enabled: true },
    
    // Community Value
    { id: '15', activityType: 'member_help', points: 40, description: 'Help another member (verified by admin)', category: 'Community Value', enabled: true },
    { id: '16', activityType: 'resource_share', points: 25, description: 'Share a valuable resource', category: 'Community Value', enabled: true },
    { id: '17', activityType: 'self_introduction', points: 10, description: 'Introduce yourself (one-time)', category: 'Community Value', enabled: true },
    { id: '18', activityType: 'live_event_attendance', points: 75, description: 'Attend a live event/call', category: 'Community Value', enabled: true },
    { id: '19', activityType: 'weekly_checkin', points: 15, description: 'Weekly check-in post', category: 'Community Value', enabled: true },
    
    // Referrals & Growth
    { id: '20', activityType: 'referral', points: 100, description: 'Refer a new member who joins', category: 'Referrals & Growth', enabled: true },
    { id: '21', activityType: 'referral_tier_bonus', points: 50, description: 'Referred member reaches Contributor tier', category: 'Referrals & Growth', enabled: true },
  ]);

  const [editingRule, setEditingRule] = useState<PointRule | null>(null);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const updatePointRule = (id: string, points: number) => {
    setPointRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, points } : rule
      )
    );
  };

  const toggleRuleEnabled = (id: string) => {
    setPointRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const saveChanges = async () => {
    // In a real implementation, this would save to a database
    console.log('Saving point rules:', pointRules);
    alert('Point rules saved successfully!');
  };

  const groupedRules = pointRules.reduce((acc, rule) => {
    if (!acc[rule.category]) {
      acc[rule.category] = [];
    }
    acc[rule.category].push(rule);
    return acc;
  }, {} as Record<string, PointRule[]>);

  if (!isOpen) return null;

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Content size="4" className="max-h-[90vh] max-w-6xl">
        <Dialog.Title className="text-2xl font-bold mb-4">Admin Panel - Point System Management</Dialog.Title>
        
        <div className="space-y-6">
          {/* Integration Guide */}
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Heading size="3">🔗 External App Integration</Heading>
                <Button 
                  variant="ghost" 
                  size="2"
                  onClick={() => setShowIntegrationGuide(true)}
                >
                  View Integration Guide
                </Button>
              </div>
              <Text color="gray" className="mb-3">
                Your Community Quest app is ready to receive events from external Whop apps like Chat, Forum, Course, and Event apps.
              </Text>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <Badge color="blue">Chat App Integration</Badge>
                <Badge color="purple">Forum App Integration</Badge>
                <Badge color="green">Course App Integration</Badge>
                <Badge color="orange">Event App Integration</Badge>
                <Badge color="red">Community App Integration</Badge>
                <Badge color="cyan">Referral App Integration</Badge>
              </div>
            </div>
          </Card>

          {/* Point Rules Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Heading size="3">⚙️ Point Rules Configuration</Heading>
              <Button onClick={saveChanges} size="2">
                Save Changes
              </Button>
            </div>

            {Object.entries(groupedRules).map(([category, rules]) => (
              <Card key={category}>
                <div className="p-4">
                  <Heading size="4" className="mb-4">{category}</Heading>
                  <div className="space-y-3">
                    {rules.map(rule => (
                      <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={rule.enabled}
                              onChange={() => toggleRuleEnabled(rule.id)}
                              className="w-4 h-4"
                            />
                            <Text weight="medium">{rule.description}</Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TextField.Root className="w-20">
                            <TextField.Input
                              type="number"
                              value={rule.points}
                              onChange={(e) => updatePointRule(rule.id, parseInt(e.target.value) || 0)}
                              min="0"
                              max="1000"
                            />
                          </TextField.Root>
                          <Text size="2" color="gray">points</Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Webhook Information */}
          <Card>
            <div className="p-4">
              <Heading size="3" className="mb-3">🔌 Webhook Configuration</Heading>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text>Webhook URL:</Text>
                  <Text weight="medium" className="font-mono">
                    {typeof window !== 'undefined' ? window.location.origin : 'https://your-app.vercel.app'}/api/integrations
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text>Webhook Secret:</Text>
                  <Text weight="medium" className="font-mono">
                    [Configure in environment variables]
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text>Status:</Text>
                  <Badge color="green">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Dialog.Close />
      </Dialog.Content>

      {/* Integration Guide Modal */}
      {showIntegrationGuide && (
        <Dialog.Root open onOpenChange={() => setShowIntegrationGuide(false)}>
          <Dialog.Content size="4" className="max-h-[90vh] max-w-4xl">
            <Dialog.Title className="text-xl font-bold mb-4">Integration Guide for External Whop Apps</Dialog.Title>
            
            <div className="space-y-6">
              <div>
                <Heading size="3" className="mb-3">📋 Setup Instructions</Heading>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Text weight="medium">1. Configure Webhook URL</Text>
                    <Text color="gray">Set your webhook URL to: <code className="font-mono bg-gray-200 px-1 rounded">{typeof window !== 'undefined' ? window.location.origin : 'https://your-app.vercel.app'}/api/integrations</code></Text>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Text weight="medium">2. Set App Credentials</Text>
                    <Text color="gray">Configure your app secret in environment variables for secure communication</Text>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Text weight="medium">3. Send Events</Text>
                    <Text color="gray">Send POST requests with event data when activities occur in your app</Text>
                  </div>
                </div>
              </div>

              <div>
                <Heading size="3" className="mb-3">📡 Event Format</Heading>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`{
  "app_id": "chat_app",
  "app_secret": "your_app_secret",
  "event_type": "message_sent",
  "user_id": "user_123",
  "data": {
    "messageLength": 45,
    "channelId": "general",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}
                  </pre>
                </div>
              </div>

              <div>
                <Heading size="3" className="mb-3">🎯 Supported Events by App</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <div className="p-3">
                      <Heading size="4" className="mb-2">Chat App</Heading>
                      <ul className="text-sm space-y-1">
                        <li>• message_sent (2 points)</li>
                        <li>• message_replied (3 points)</li>
                        <li>• discussion_started (10 points)</li>
                        <li>• reaction_received (5 bonus)</li>
                        <li>• streak_achieved (20 bonus)</li>
                      </ul>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-3">
                      <Heading size="4" className="mb-2">Forum App</Heading>
                      <ul className="text-sm space-y-1">
                        <li>• post_created (15 points)</li>
                        <li>• post_replied (8 points)</li>
                        <li>• post_pinned (50 points)</li>
                        <li>• helpful_reaction (15 bonus)</li>
                        <li>• high_engagement (25 bonus)</li>
                      </ul>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-3">
                      <Heading size="4" className="mb-2">Course App</Heading>
                      <ul className="text-sm space-y-1">
                        <li>• module_completed (50 points)</li>
                        <li>• course_completed (200 points)</li>
                        <li>• quiz_excellent (30 bonus)</li>
                        <li>• progress_shared (20 points)</li>
                      </ul>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-3">
                      <Heading size="4" className="mb-2">Event App</Heading>
                      <ul className="text-sm space-y-1">
                        <li>• event_attended (75 points)</li>
                      </ul>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Dialog.Root>
  );
}
