"use client";

import { useState, useEffect } from "react";
import { Card, Heading, Text, Button, Badge } from "frosted-ui";

interface ConfigStatus {
  status: string;
  configured: boolean;
  environment: {
    appId: string;
    apiKey: string;
    agentUserId: string;
    companyId: string;
    webhookSecret: string;
    appUrl: string;
  };
  webhook: {
    url: string;
    status: string;
    configured: boolean;
  };
  instructions: {
    setup: string;
    webhook: string;
    documentation: string;
    development: string;
  };
}

export default function WebhookConfigPage() {
  const [config, setConfig] = useState<ConfigStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch config status:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <Heading size="4" className="mb-4">❌ Configuration Error</Heading>
            <Text>Failed to load configuration status. Please check your server logs.</Text>
          </Card>
        </div>
      </div>
    );
  }

  const allConfigured = config.configured;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a 
              href="/admin" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors"
            >
              ← Back to Admin
            </a>
          </div>
          <Heading size="6" className="mb-2">
            🔗 Webhook Configuration
          </Heading>
          <Text size="3" color="gray">
            Connect your Community Quest app to your Whop community to start tracking member activity
          </Text>
        </div>

        {/* Status Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Heading size="4">Configuration Status</Heading>
            <Badge color={allConfigured ? "green" : "red"} size="2">
              {allConfigured ? "✅ Ready" : "❌ Needs Setup"}
            </Badge>
          </div>
          
          <Text color="gray" className="mb-4">
            {allConfigured 
              ? "✅ Your Community Quest app is connected and ready to track member activity!"
              : "❌ Your app needs to be connected to start tracking member activity and awarding points."
            }
          </Text>

          {!allConfigured && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚀</div>
                <div>
                  <Text weight="medium" className="text-blue-900 mb-2">
                    Quick Setup (2 minutes)
                  </Text>
                  <Text size="2" className="text-blue-800 mb-4">
                    To start tracking member activity and awarding points, you need to connect this app to your Whop community.
                  </Text>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <Text size="2" className="text-blue-800">
                        Copy the webhook URL below
                      </Text>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <Text size="2" className="text-blue-800">
                        Go to your Whop Dashboard → Developer → Create Webhook
                      </Text>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <Text size="2" className="text-blue-800">
                        Paste the URL and select these events: chat.message_sent, forum.post_created, course.module_completed, event.attended, livestream.viewed
                      </Text>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <Text size="2" className="text-blue-800">
                        Click "Save" - that's it!
                      </Text>
                    </div>
                  </div>
                  
                  <Text size="2" className="text-blue-700 mt-4 font-medium">
                    💡 Once connected, your members will automatically earn points for chat messages, forum posts, course completions, and more!
                  </Text>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* App Status */}
        <Card className="p-6">
          <Heading size="4" className="mb-4">App Status</Heading>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Text weight="medium">Community Quest App</Text>
                <Text size="1" color="gray">Ready to track member activity</Text>
              </div>
              <Badge color="green" size="1">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Text weight="medium">Webhook Connection</Text>
                <Text size="1" color="gray">Connect to your Whop community</Text>
              </div>
              <Badge color={config.webhook.configured ? "green" : "yellow"} size="1">
                {config.webhook.configured ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Webhook Configuration */}
        <Card className="p-6">
          <Heading size="4" className="mb-4">Webhook Configuration</Heading>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Text weight="medium">Webhook URL</Text>
                <Text size="1" color="gray" className="font-mono">
                  {config.webhook.url}
                </Text>
              </div>
              <Badge color={config.webhook.configured ? "green" : "yellow"} size="1">
                {config.webhook.status}
              </Badge>
            </div>

            {!config.webhook.configured && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Text weight="medium" className="text-green-800 mb-2">
                  🎯 Ready to Connect!
                </Text>
                <div className="space-y-2 text-green-700">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <Text size="2">Copy this webhook URL: <code className="bg-green-100 px-2 py-1 rounded font-mono text-sm">{config.webhook.url}</code></Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <Text size="2">Go to your Whop Dashboard → Settings → Webhooks</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <Text size="2">Paste the URL and save - that's it!</Text>
                  </div>
                </div>
                <Text size="2" className="text-green-600 mt-3 font-medium">
                  ✨ Your members will start earning points automatically!
                </Text>
              </div>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
