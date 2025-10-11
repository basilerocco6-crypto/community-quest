This is a template for a whop app built in NextJS. Fork it and keep the parts you need for your app. 

# Whop NextJS App Template

To run this project: 

1. Install dependencies with: `pnpm i`

2. Create a Whop App on your [whop developer dashboard](https://whop.com/dashboard/developer/), then go to the "Hosting" section and:
	- Ensure the "Base URL" is set to the domain you intend to deploy the site on.
	- Ensure the "App path" is set to `/experiences/[experienceId]`
	- Ensure the "Dashboard path" is set to `/dashboard/[companyId]` 
	- Ensure the "Discover path" is set to `/discover` 

3. Copy the environment variables from the `.env.development` into a `.env.local`. Ensure to use real values from the whop dashboard.

4. Go to a whop created in the same org as the app you created. Navigate to the tools section and add your app.

5. Run `pnpm dev` to start the dev server. Then in the top right of the window find a translucent settings icon. Select "localhost". The default port 3000 should work.

## Deploying

1. Upload your fork / copy of this template to github. 

2. Go to [Vercel](https://vercel.com/new) and link the repository. Deploy your application with the environment variables from your `.env.local`

3. If necessary update you "Base Domain" and webhook callback urls on the app settings page on the whop dashboard.

## Troubleshooting

**App not loading properly?** Make sure to set the "App path" in your Whop developer dashboard. The placeholder text in the UI does not mean it's set - you must explicitly enter `/experiences/[experienceId]` (or your chosen path name)
a

**Make sure to add env.local** Make sure to get the real app environment vairables from your whop dashboard and set them in .env.local


For more info, see our docs at https://dev.whop.com/introduction

## 🔗 App Integration

This app integrates with standard Whop apps (Chat, Forum, Course, Events, Livestreaming) to track community engagement. 

**Important:** Some apps referenced in older documentation like "Community App" don't exist. See `WHOP_APP_INTEGRATION_GUIDE.md` for accurate integration instructions.

## 🎮 Level Name Customization

The Community Quest system now supports customizable level names! You can override the default level names to better match your community's theme and branding.

### Quick Setup

1. Add environment variables to your `.env.local` file:
```bash
LEVEL_1_NAME=Your Custom Name
LEVEL_2_NAME=Another Custom Name
# ... and so on for each level
```

2. Restart your application

3. Level names will be automatically updated throughout the app

### Examples

**Gaming Community:**
```bash
LEVEL_1_NAME=Rookie
LEVEL_2_NAME=Player
LEVEL_3_NAME=Veteran
LEVEL_4_NAME=Elite
LEVEL_5_NAME=Champion
```

**Business Community:**
```bash
LEVEL_1_NAME=Starter
LEVEL_2_NAME=Builder
LEVEL_3_NAME=Creator
LEVEL_4_NAME=Innovator
LEVEL_5_NAME=Leader
```

For detailed customization instructions and examples, see `LEVEL_CUSTOMIZATION.md`.
# Force deployment
# Force deployment Sat Oct  4 21:28:51 CEST 2025
