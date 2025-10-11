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
                        Go to your Whop Dashboard → Settings → Webhooks
                      </Text>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <Text size="2" className="text-blue-800">
                        Add the webhook URL and save
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

        {/* Connection Details */}
        <Card className="p-6">
          <Heading size="4" className="mb-4">Connection Details</Heading>
          <div className="space-y-3">
            {Object.entries(config.environment).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Text weight="medium" className="font-mono text-sm">{key}</Text>
                  <Text size="1" color="gray">Required for {key.includes('WEBHOOK') ? 'webhook validation' : 'Whop API access'}</Text>
                </div>
                <div className="flex items-center gap-2">
                  {value.includes('✅') ? (
                    <Badge color="green" size="1">Configured</Badge>
                  ) : (
                    <Badge color="red" size="1">Missing</Badge>
                  )}
                </div>
              </div>
            ))}
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Text weight="medium" className="text-blue-800 mb-2">
                  📋 Next Steps
                </Text>
                <ol className="list-decimal list-inside space-y-2 text-blue-700">
                  <li>Set NEXT_PUBLIC_APP_URL in your .env.local file</li>
                  <li>Go to Whop Dashboard → Apps → Your App → Webhooks</li>
                  <li>Set webhook URL to: <code className="bg-blue-100 px-1 rounded">{config.webhook.url}</code></li>
                  <li>Enable webhook events (chat.message_sent, etc.)</li>
                </ol>
              </div>
            )}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6">
          <Heading size="4" className="mb-4">Setup Instructions</Heading>
          <div className="space-y-4">
            <div>
              <Text weight="medium" className="mb-2">1. Create Environment File</Text>
              <Text size="2" color="gray">{config.instructions.setup}</Text>
            </div>
            
            <div>
              <Text weight="medium" className="mb-2">2. Configure Webhook</Text>
              <Text size="2" color="gray">{config.instructions.webhook}</Text>
            </div>

            <div>
              <Text weight="medium" className="mb-2">3. Development Setup</Text>
              <Text size="2" color="gray">{config.instructions.development}</Text>
            </div>

            <div className="pt-4 border-t">
              <Button asChild>
                <a href="/WEBHOOK_SETUP.md" target="_blank" rel="noopener noreferrer">
                  📖 View Detailed Documentation
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
