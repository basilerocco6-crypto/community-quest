#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupEnvironment() {
  console.log('🔧 Whop App Environment Setup\n');
  console.log('This script will help you create a .env.local file with your Whop credentials.\n');
  console.log('Get your credentials from: https://dashboard.whop.com\n');

  const envVars = {};

  // App ID
  envVars.NEXT_PUBLIC_WHOP_APP_ID = await question('📱 Enter your Whop App ID (app_...): ');
  
  // API Key
  envVars.WHOP_API_KEY = await question('🔑 Enter your Whop API Key (whop_live_...): ');
  
  // Agent User ID
  envVars.NEXT_PUBLIC_WHOP_AGENT_USER_ID = await question('👤 Enter your Whop User ID (user_...): ');
  
  // Company ID
  envVars.NEXT_PUBLIC_WHOP_COMPANY_ID = await question('🏢 Enter your Company ID (company_...): ');
  
  // Webhook Secret
  envVars.WHOP_WEBHOOK_SECRET = await question('🔗 Enter your Webhook Secret (whsec_...): ');

  // Optional App URL
  const appUrl = await question('🌐 Enter your app URL (optional, press Enter to skip): ');
  if (appUrl.trim()) {
    envVars.NEXT_PUBLIC_APP_URL = appUrl.trim();
  }

  // Create .env.local content
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  // Write to .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ Environment variables saved to .env.local');
  console.log('\n📋 Next steps:');
  console.log('1. Configure your webhook URL in Whop Dashboard');
  console.log('2. Restart your development server: npm run dev');
  console.log('3. Test your webhook by sending a chat message');
  console.log('\n📖 For detailed instructions, see: WEBHOOK_SETUP.md');

  rl.close();
}

setupEnvironment().catch(console.error);
