import { NextResponse } from 'next/server';

export async function GET() {
  const status = {
    environment: {
      appId: process.env.NEXT_PUBLIC_WHOP_APP_ID ? '✅ Configured' : '❌ Missing',
      apiKey: process.env.WHOP_API_KEY ? '✅ Configured' : '❌ Missing',
      agentUserId: process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID ? '✅ Configured' : '❌ Missing',
      companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID ? '✅ Configured' : '❌ Missing',
      webhookSecret: process.env.WHOP_WEBHOOK_SECRET ? '✅ Configured' : '❌ Missing',
    },
    webhook: {
      url: process.env.NEXT_PUBLIC_APP_URL ? 
        `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks` : 
        '⚠️ Not configured (use ngrok for development)',
      status: 'Active'
    },
    instructions: {
      setup: 'Run `npm run setup` to configure environment variables',
      webhook: 'Configure webhook URL in Whop Dashboard → Apps → Your App → Webhooks',
      documentation: 'See WEBHOOK_SETUP.md for detailed instructions'
    }
  };

  const allConfigured = Object.values(status.environment).every(v => v.includes('✅'));
  
  return NextResponse.json({
    status: allConfigured ? 'Ready' : 'Needs Configuration',
    configured: allConfigured,
    ...status
  });
}
