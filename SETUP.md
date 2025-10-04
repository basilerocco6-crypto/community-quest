# Whop App Setup Guide

Welcome to your new Whop app! This guide will help you get started quickly and easily.

## 🚀 Quick Start

### 1. Get Your Whop Credentials

1. Go to [Whop Dashboard](https://whop.com/dashboard)
2. Navigate to **Developer** → **Apps**
3. Create a new app or select an existing one
4. Copy the following values from your app settings:
   - **API Key** (Secret)
   - **App ID** (Public)
   - **Company ID** (Public)

### 2. Configure Environment Variables

Edit the `.env` file in your project root and replace the placeholder values:

```bash
# Replace these with your actual values from Whop Dashboard
WHOP_API_KEY="your_actual_api_key_here"
WHOP_WEBHOOK_SECRET="your_webhook_secret_here"
NEXT_PUBLIC_WHOP_AGENT_USER_ID="your_agent_user_id_here"
NEXT_PUBLIC_WHOP_APP_ID="your_app_id_here"
NEXT_PUBLIC_WHOP_COMPANY_ID="your_company_id_here"
```

### 3. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## 📁 Project Structure

```
whop-app/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main page component
│   └── layout.tsx      # Root layout
├── lib/
│   └── whop-sdk.ts     # Whop SDK configuration
├── .env                # Environment variables (you need to fill this)
├── .env.development    # Development environment template
└── package.json        # Dependencies and scripts
```

## 🔧 Key Features

### Authentication
- **Whop SDK Integration**: Ready-to-use authentication with Whop
- **Agent User Support**: Configure an agent user for API requests
- **Company Context**: Set up company-specific operations

### Development Tools
- **Hot Reload**: Automatic reloading during development
- **TypeScript**: Full TypeScript support
- **Tailwind CSS**: Utility-first CSS framework
- **Whop Proxy**: Development proxy for testing

## 🛠 Available Scripts

- `npm run dev` - Start development server with Whop proxy
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## 📚 Next Steps

1. **Customize the UI**: Edit `app/page.tsx` to match your app's design
2. **Add API Routes**: Create API endpoints in `app/api/`
3. **Implement Features**: Use the Whop SDK to interact with Whop's API
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## 🔗 Useful Links

- [Whop Documentation](https://dev.whop.com)
- [Whop Dashboard](https://whop.com/dashboard)
- [Next.js Documentation](https://nextjs.org/docs)
- [Whop API Reference](https://dev.whop.com/api-reference)

## ❓ Need Help?

If you run into any issues:
1. Check that all environment variables are set correctly
2. Verify your Whop app credentials
3. Check the [Whop Documentation](https://dev.whop.com)
4. Make sure your app is properly installed in your Whop

Happy coding! 🎉
