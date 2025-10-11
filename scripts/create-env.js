#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envTemplate = `# 🔗 Whop App Environment Variables
# Fill in your actual values from the Whop Dashboard

# =============================================================================
# REQUIRED: Get these from your Whop Dashboard
# =============================================================================

# Your Whop App ID (Public)
# Get from: Whop Dashboard → Apps → Your App → General/Overview
NEXT_PUBLIC_WHOP_APP_ID=app_your_app_id_here

# Your Whop API Key (Secret) 
# Get from: Whop Dashboard → Apps → Your App → API Keys
WHOP_API_KEY=whop_live_your_api_key_here

# Your Whop User ID (Public)
# Get from: Whop Dashboard → Profile → User ID
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_your_user_id_here

# Your Company ID (Public)
# Get from: Whop Dashboard → Company → Overview
NEXT_PUBLIC_WHOP_COMPANY_ID=company_your_company_id_here

# Webhook Secret (Secret)
# Get from: Whop Dashboard → Apps → Your App → Webhooks
WHOP_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# =============================================================================
# REQUIRED: Your App's Public URL
# =============================================================================

# For Development (using ngrok):
# 1. Run: ngrok http 3000
# 2. Copy the https URL (e.g., https://abc123.ngrok.io)
NEXT_PUBLIC_APP_URL=https://your-ngrok-url.ngrok.io

# For Production (replace with your actual domain):
# NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# =============================================================================
# WEBHOOK CONFIGURATION
# =============================================================================
# Once you have NEXT_PUBLIC_APP_URL set, configure your webhook in Whop:
# 1. Go to Whop Dashboard → Apps → Your App → Webhooks
# 2. Set webhook URL to: https://your-domain.com/api/webhooks
# 3. Enable these events: chat.message_sent, chat.message_replied, forum.post_created, etc.
`;

const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file already exists!');
  console.log('   If you want to recreate it, delete the existing file first.');
  process.exit(1);
}

try {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local file!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Edit .env.local and replace all "your_*_here" values with your actual Whop credentials');
  console.log('2. Get your credentials from: https://dashboard.whop.com');
  console.log('3. For development, run: ngrok http 3000');
  console.log('4. Set NEXT_PUBLIC_APP_URL to your ngrok URL');
  console.log('5. Configure webhook URL in Whop Dashboard');
  console.log('');
  console.log('📖 For detailed instructions, see: WEBHOOK_SETUP.md');
} catch (error) {
  console.error('❌ Failed to create .env.local file:', error.message);
  process.exit(1);
}
