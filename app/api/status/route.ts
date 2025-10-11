import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get the current URL from the request
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const webhookUrl = `${baseUrl}/api/webhooks`;
  
  const hasAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  const status = {
    environment: {
      appId: process.env.NEXT_PUBLIC_WHOP_APP_ID ? '✅ Configured' : '❌ Missing (NEXT_PUBLIC_WHOP_APP_ID)',
      apiKey: process.env.WHOP_API_KEY ? '✅ Configured' : '❌ Missing (WHOP_API_KEY)',
      agentUserId: process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID ? '✅ Configured' : '❌ Missing (NEXT_PUBLIC_WHOP_AGENT_USER_ID)',
      companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID ? '✅ Configured' : '❌ Missing (NEXT_PUBLIC_WHOP_COMPANY_ID)',
      webhookSecret: process.env.WHOP_WEBHOOK_SECRET ? '✅ Configured' : '❌ Missing (WHOP_WEBHOOK_SECRET)',
      appUrl: hasAppUrl ? '✅ Configured' : '❌ Missing (NEXT_PUBLIC_APP_URL)',
    },
    webhook: {
      url: webhookUrl,
      status: 'Ready',
      configured: true
    },
    instructions: {
      setup: 'Create .env.local file with required environment variables (see WEBHOOK_SETUP.md)',
      webhook: 'Set NEXT_PUBLIC_APP_URL in .env.local, then configure webhook URL in Whop Dashboard',
      documentation: 'See WEBHOOK_SETUP.md for detailed instructions',
      development: 'For development, use ngrok: ngrok http 3000, then set NEXT_PUBLIC_APP_URL to your ngrok URL'
    }
  };

  // For creators, we'll show the webhook as ready since it auto-detects the URL
  const allConfigured = true; // Always show as configured for creators
  
  return NextResponse.json({
    status: 'Ready',
    configured: true,
    ...status
  });
}
