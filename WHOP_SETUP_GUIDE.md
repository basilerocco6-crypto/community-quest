# 🚀 Whop App Setup Guide

Your Community Quest app is running locally, but to see it in your Whop dashboard, you need to complete the setup process.

## 📱 Available Whop Apps

**Important:** Whop provides these standard apps that work with Community Quest:

✅ **Actually Available:**
- **Chat App** - Real-time group discussions
- **Forum App** - Threaded conversations  
- **Course App** - Multi-lesson learning with videos and quizzes
- **Events App** - Live or in-person events with ticketing
- **Livestreaming App** - Live streaming with OBS integration ([View App](https://whop.com/apps/app_WykcI6ivb5fOlz))

❌ **Not Available (Don't Exist):**
- "Community App" - This is not a separate Whop app
- "Referral App" - Not a standard Whop app

## 🔧 Step 1: Create Your Whop App

1. **Go to Whop Dashboard**: Visit [dashboard.whop.com](https://dashboard.whop.com)
2. **Navigate to Apps**: Click on "Apps" in the left sidebar
3. **Create New App**: Click "Create App" or "New App"
4. **Fill in App Details**:
   - **Name**: `Community Quest`
   - **Description**: `Community Engagement Leaderboard with Rewards`
   - **Category**: Choose appropriate category (e.g., "Community" or "Gamification")

## 🔑 Step 2: Get Your App Credentials

After creating your app, you'll need these values from your Whop Dashboard:

### 📍 Where to find each value:

1. **App ID** (`NEXT_PUBLIC_WHOP_APP_ID`):
   - Go to your app settings
   - Found in the "General" or "Overview" section
   - Looks like: `app_1234567890abcdef`

2. **API Key** (`WHOP_API_KEY`):
   - Go to your app settings
   - Click on "API Keys" tab
   - Create a new API key or copy existing one
   - Looks like: `whop_live_1234567890abcdef...`

3. **Agent User ID** (`NEXT_PUBLIC_WHOP_AGENT_USER_ID`):
   - This is your personal Whop user ID
   - Go to your profile settings
   - Found in the URL or profile section
   - Looks like: `user_1234567890abcdef`

4. **Company ID** (`NEXT_PUBLIC_WHOP_COMPANY_ID`):
   - Go to your company settings
   - Found in the company overview
   - Looks like: `company_1234567890abcdef`

5. **Webhook Secret** (`WHOP_WEBHOOK_SECRET`):
   - Go to your app settings
   - Click on "Webhooks" tab
   - Create a new webhook or copy existing secret
   - Looks like: `whsec_1234567890abcdef...`

## 📝 Step 3: Update Environment Variables

Edit the `.env.local` file in your project root and replace the placeholder values:

```bash
# Example (replace with your actual values):
NEXT_PUBLIC_WHOP_APP_ID=app_abc123def456
WHOP_API_KEY=whop_live_xyz789...
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_def456ghi789
NEXT_PUBLIC_WHOP_COMPANY_ID=company_ghi789jkl012
WHOP_WEBHOOK_SECRET=whsec_mno345pqr678...
```

## 🔗 Step 4: Configure Webhooks

1. **Go to your app's Webhooks section** in Whop Dashboard
2. **Set Webhook URL** to: `https://your-domain.com/api/webhooks`
   - For development: Use ngrok or similar service to expose localhost
   - For production: Use your deployed domain
3. **Enable these webhook events** (from actual Whop apps):
   - `chat.message_sent`
   - `chat.message_replied`
   - `chat.discussion_started`
   - `chat.reaction_received`
   - `chat.streak_achieved`
   - `forum.post_created`
   - `forum.post_replied`
   - `forum.post_pinned`
   - `course.module_completed`
   - `course.completed`
   - `event.attended`
   - `livestream.started`
   - `livestream.attended`
   - `livestream.chat_message`
   - `livestream.reaction`
   - `livestream.speaker_joined`
   - `livestream.raised_hand`
   - `user.created`

## 🌐 Step 5: Expose Your Local Development Server

Since your app is running on `localhost:3000`, you need to make it accessible to Whop:

### Option A: Using ngrok (Recommended for development)
```bash
# Install ngrok
brew install ngrok

# Expose your local server
ngrok http 3000
```

This will give you a public URL like `https://abc123.ngrok.io` that you can use in your webhook configuration.

### Option B: Deploy to production
Deploy your app to Vercel, Netlify, or similar platform.

## 📱 Step 6: Install Standard Whop Apps

**Before installing Community Quest, add the standard Whop apps to your community:**

1. **Go to your Whop Dashboard**
2. **Navigate to your community/company**
3. **Click "Add app"** to open the Whop App Store
4. **Install these standard apps**:
   - **Chat** - For real-time discussions
   - **Forums** - For threaded conversations
   - **Course** - For learning content (if needed)
   - **Events** - For live events (if needed)
   - **Livestreaming** - For live streaming content (if needed)

## 📱 Step 7: Install Your Community Quest App

1. **Go to your Whop Dashboard**
2. **Navigate to Apps**
3. **Find your "Community Quest" app**
4. **Click "Install"**
5. **Select your company/community**
6. **Complete the installation**

## ✅ Step 8: Verify Installation

After completing all steps:

1. **Restart your development server**:
   ```bash
   pnpm dev
   ```

2. **Check your Whop dashboard** - your app should now appear in the apps section

3. **Test the app** by clicking on it in your Whop dashboard

## 🐛 Troubleshooting

### App doesn't appear in Whop dashboard:
- ✅ Check that all environment variables are set correctly
- ✅ Verify your webhook URL is accessible from the internet
- ✅ Ensure your app is properly installed in your company
- ✅ Check browser console for any errors

### Webhook errors:
- ✅ Verify webhook URL is correct and accessible
- ✅ Check that webhook secret matches in both Whop and your app
- ✅ Ensure all required webhook events are enabled

### Development server issues:
- ✅ Make sure no other processes are using port 3000
- ✅ Check that all dependencies are installed (`pnpm install`)
- ✅ Verify environment variables are loaded correctly

## 📞 Need Help?

If you're still having issues:
1. Check the Whop Developer Documentation
2. Verify your app credentials in the Whop Dashboard
3. Test your webhook endpoint manually
4. Check your development server logs for errors

---

**Your Community Quest app is ready to boost community engagement! 🎉**
