# 🔗 Webhook Configuration Setup

The webhook is currently not configured because the required environment variables are missing. Follow these steps to set up your webhooks:

## 📝 Step 1: Create Environment File

Create a `.env.local` file in your project root with the following variables:

```bash
# Required: Your Whop App ID (Public)
# Get this from: Whop Dashboard → Apps → Your App → General/Overview
NEXT_PUBLIC_WHOP_APP_ID=app_your_app_id_here

# Required: Your Whop API Key (Secret)
# Get this from: Whop Dashboard → Apps → Your App → API Keys
WHOP_API_KEY=whop_live_your_api_key_here

# Required: Your Whop User ID (Public)
# Get this from: Whop Dashboard → Profile → User ID
NEXT_PUBLIC_WHOP_AGENT_USER_ID=user_your_user_id_here

# Required: Your Company ID (Public)
# Get this from: Whop Dashboard → Company → Overview
NEXT_PUBLIC_WHOP_COMPANY_ID=company_your_company_id_here

# Required: Webhook Secret for validating webhooks
# Get this from: Whop Dashboard → Apps → Your App → Webhooks
WHOP_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 🔑 Step 2: Get Your Credentials from Whop Dashboard

### 1. App ID (`NEXT_PUBLIC_WHOP_APP_ID`)
- Go to [Whop Dashboard](https://dashboard.whop.com)
- Navigate to **Apps** → **Your App**
- Look for **App ID** in the General/Overview section
- Format: `app_1234567890abcdef`

### 2. API Key (`WHOP_API_KEY`)
- In your app settings, go to **API Keys** tab
- Create a new API key or copy existing one
- Format: `whop_live_1234567890abcdef...`

### 3. Agent User ID (`NEXT_PUBLIC_WHOP_AGENT_USER_ID`)
- Go to your **Profile** in Whop Dashboard
- Find your **User ID** in profile settings or URL
- Format: `user_1234567890abcdef`

### 4. Company ID (`NEXT_PUBLIC_WHOP_COMPANY_ID`)
- Go to **Company** settings in Whop Dashboard
- Find **Company ID** in the overview section
- Format: `company_1234567890abcdef`

### 5. Webhook Secret (`WHOP_WEBHOOK_SECRET`)
- In your app settings, go to **Webhooks** tab
- Create a new webhook or copy existing secret
- Format: `whsec_1234567890abcdef...`

## 🌐 Step 3: Configure Webhook URL

### For Development (using ngrok):
1. Install ngrok: `brew install ngrok` (macOS) or download from [ngrok.com](https://ngrok.com)
2. Start your app: `npm run dev`
3. In another terminal, run: `ngrok http 3000`
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. In Whop Dashboard → Apps → Your App → Webhooks, set the URL to: `https://abc123.ngrok.io/api/webhooks`

### For Production:
Set the webhook URL to: `https://your-domain.com/api/webhooks`

## 📋 Step 4: Enable Webhook Events

In your Whop app's webhook settings, enable these events:
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
- `user.created`

## ✅ Step 5: Verify Setup

1. Restart your development server: `npm run dev`
2. Check the console for any environment variable errors
3. Test webhook by sending a chat message in your Whop community
4. Check your app logs for webhook events

## 🐛 Troubleshooting

### "Environment variables not configured" error:
- ✅ Make sure `.env.local` file exists in project root
- ✅ Verify all required variables are set (no "your_*_here" placeholders)
- ✅ Restart your development server after adding variables

### Webhook not receiving events:
- ✅ Check that webhook URL is accessible from internet
- ✅ Verify webhook secret matches between Whop and your app
- ✅ Ensure required webhook events are enabled
- ✅ Check webhook URL format: `https://your-domain.com/api/webhooks`

### API errors:
- ✅ Verify all Whop credentials are correct
- ✅ Check that your app is properly installed in your company
- ✅ Ensure API key has proper permissions

## 📞 Need Help?

If you're still having issues:
1. Check the [Whop Developer Documentation](https://dev.whop.com)
2. Verify your app credentials in the Whop Dashboard
3. Test your webhook endpoint manually
4. Check your development server logs for errors

---

**Once configured, your webhooks will automatically track engagement activities and update user points in real-time! 🎉**
