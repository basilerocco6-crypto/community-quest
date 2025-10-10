# Community Quest - Engagement Leaderboard App

## Overview

Community Quest is a comprehensive engagement tracking and gamification system built for Whop communities. It transforms passive community members into active participants through a points-based reward system, leaderboards, and tier-based benefits.

## Features

### 🏆 Engagement Tracking
- **Chat Messages**: Track participation in community chat
- **Forum Posts**: Monitor forum contributions and discussions
- **Forum Comments**: Reward engagement with existing posts
- **Course Completion**: Integrate with Whop's native Courses app
- **Event Attendance**: Track participation in community events
- **Livestreaming**: Track livestream hosting, attendance, and interaction
- **Referrals**: Reward members for bringing in new community members

### 🎯 Gamification System
- **9-Tier Level System**: From "Newcomer" to "Community God"
- **Point-Based Progression**: Transparent point system for all activities
- **Real-Time Leaderboards**: Weekly, monthly, and all-time rankings
- **Progress Tracking**: Visual progress bars and milestone celebrations

### 🎁 Rewards & Benefits
- **Automatic Discounts**: Tier-based discounts (5% to 50%)
- **Exclusive Access**: Early access to features and content
- **Special Privileges**: Moderation tools, VIP support, founder access
- **Recognition**: Custom badges, named features, co-founder status
- **Monetary Benefits**: Revenue sharing and equity opportunities

### 📊 Analytics & Insights
- **User Engagement Metrics**: Detailed activity breakdowns
- **Community Health**: Overall engagement trends and statistics
- **Reward Effectiveness**: Track which incentives drive the most engagement

## Technical Architecture

### Frontend Components
- **CommunityQuest**: Main application component
- **UserProfile**: User status, level, and progress display
- **LeaderboardSection**: Multi-timeframe leaderboard display
- **LeaderboardCard**: Individual leaderboard component
- **LevelBreakdown**: Modal showing all community levels
- **RewardsPanel**: Reward management and claiming interface
- **EngagementTracker**: Demo component for activity simulation

### Backend Systems
- **EngagementTracker**: Core engagement tracking engine
- **RewardSystem**: Tier-based reward management
- **WebhookHandler**: Real-time activity tracking via Whop webhooks

### Data Models
- **User**: Profile, points, level, and activity data
- **EngagementActivity**: Individual activity tracking
- **Level**: Tier definitions and requirements
- **LeaderboardEntry**: Ranking and point data
- **Reward**: Benefit definitions and claiming system

## Point System

| Activity | Points | Notes |
|----------|--------|-------|
| Chat Message | 2 | Encouraging discussion |
| Chat Reply | 3 | Engaging with others |
| Discussion Started | 10 | Starting conversations |
| Chat Reaction | 5 | Reacting to messages |
| Chat Streak | 20 | Consistent participation |
| Forum Post | 15 | Creating content |
| Forum Reply | 8 | Engaging with posts |
| Forum Pinned | 50 | High-quality content |
| Forum Helpful | 15 | Being helpful |
| Forum Engagement | 25 | High engagement posts |
| Course Module | 50 | Learning progress |
| Course Completion | 200 | Major learning milestone |
| Quiz Excellence | 30 | Outstanding performance |
| Course Progress Share | 20 | Sharing progress |
| Event Attendance | 75 | Community participation |
| Livestream Started | 75 | Hosting content |
| Livestream Attended | 75 | Attending streams |
| Stream Chat Message | 2 | Engaging during streams |
| Stream Reaction | 5 | Reacting during streams |
| Speaker Joined | 75 | Participating as speaker |
| Raised Hand | 75 | Active participation |
| Member Help | 40 | Helping other members |
| Resource Share | 25 | Sharing valuable resources |
| Self Introduction | 10 | New member introduction |
| Weekly Checkin | 15 | Consistent engagement |
| Referral | 100 | Community growth |
| Referral Tier Bonus | 50 | Referral milestones |

## Level System

| Level | Name | Required Points | Key Benefits |
|-------|------|----------------|--------------|
| 1 | Newcomer | 0 | Basic community access |
| 2 | Active Member | 25 | 5% discount |
| 3 | Community Champion | 50 | 10% discount, VIP support |
| 4 | Engagement Expert | 100 | 15% discount, mentorship access |
| 5 | Community Leader | 200 | 20% discount, moderation privileges |
| 6 | Elite Member | 350 | 25% discount, revenue sharing |
| 7 | Community Legend | 500 | 30% discount, co-founder status |
| 8 | Community Icon | 750 | 40% discount, named features |
| 9 | Community God | 1000 | 50% discount, ultimate recognition |

## Business Model

### Target Market
- **B2B SaaS**: Community owners and administrators
- **Pricing**: $10-50/month based on community size
- **Market Size**: 100% of paid communities on Whop platform

### Value Proposition
- **Increased Engagement**: Proven gamification techniques
- **Member Retention**: Reward-based loyalty system
- **Community Growth**: Referral incentives
- **Revenue Optimization**: Tier-based discount management

## Integration with Whop

### Webhook Events
The app listens for and processes the following Whop webhook events:
- `chat.message`: Track chat participation
- `forum.post`: Monitor forum contributions
- `forum.comment`: Track discussion engagement
- `course.completed`: Integrate with course progress
- `event.attended`: Track event participation
- `user.created`: Handle referral tracking

### SDK Integration
- Uses Whop's official SDK for user authentication
- Leverages Whop's FrostedUI design system
- Integrates with Whop's payment and user management systems

## Getting Started

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run development server: `npm run dev`

### Environment Variables
```
WHOP_API_KEY=your_api_key
NEXT_PUBLIC_WHOP_APP_ID=your_app_id
NEXT_PUBLIC_WHOP_AGENT_USER_ID=your_agent_user_id
NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id
WHOP_WEBHOOK_SECRET=your_webhook_secret
```

### Production Deployment
1. Build the application: `npm run build`
2. Deploy to your preferred hosting platform
3. Configure webhook endpoints in Whop dashboard
4. Install the app in your community

## Customization

### Adding New Activity Types
1. Update the `ENGAGEMENT_POINTS` constant in `lib/engagement.ts`
2. Add new tracking methods to the `EngagementTracker` class
3. Update the webhook handler to process new events
4. Add UI components for new activity types

### Customizing Rewards
1. Modify the `initializeDefaultRewards()` method in `lib/rewards.ts`
2. Add new reward types to the `Reward` interface
3. Update the rewards panel to display new reward types

### Styling Customization
The app uses Whop's FrostedUI design system. Customize styling by:
1. Modifying Tailwind CSS classes
2. Updating the color scheme in `tailwind.config.ts`
3. Creating custom components that extend FrostedUI

## Future Enhancements

### Planned Features
- **Team Challenges**: Group-based competitions
- **Seasonal Events**: Limited-time engagement campaigns
- **Advanced Analytics**: Detailed engagement insights
- **Mobile App**: Native mobile experience
- **API Integration**: Third-party platform connections
- **Custom Badges**: User-created recognition system

### Scalability Considerations
- **Database Optimization**: Efficient querying for large communities
- **Caching Strategy**: Redis for leaderboard performance
- **Rate Limiting**: Prevent gaming of the system
- **Analytics Pipeline**: Real-time data processing

## Support

For technical support or feature requests, please contact the development team or create an issue in the repository.

---

**Community Quest** - Transforming communities through gamification and rewards.
