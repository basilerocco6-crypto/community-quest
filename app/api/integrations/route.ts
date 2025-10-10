import { NextRequest, NextResponse } from "next/server";
import { trackWhopActivity } from "@/lib/engagement";

// API endpoint for external Whop app integrations
export async function POST(request: NextRequest): Promise<Response> {
	try {
		const body = await request.json();
		const { 
			app_id, 
			app_secret, 
			event_type, 
			user_id, 
			data 
		} = body;

		// Validate the integration request
		if (!app_id || !app_secret || !event_type || !user_id) {
			return NextResponse.json(
				{ error: "Missing required fields: app_id, app_secret, event_type, user_id" },
				{ status: 400 }
			);
		}

		// Verify app credentials (in production, this would check against a database)
		// Note: Only actual Whop apps are supported. Custom integrations require proper setup.
		const validApps = {
			'chat_app': process.env.CHAT_APP_SECRET,
			'forum_app': process.env.FORUM_APP_SECRET,
			'course_app': process.env.COURSE_APP_SECRET,
			'event_app': process.env.EVENT_APP_SECRET,
			'livestreaming_app': process.env.LIVESTREAMING_APP_SECRET,
			// Custom app integrations (if you have custom apps)
			'whop_affiliates': process.env.WHOP_AFFILIATES_SECRET,
		};

		if (!validApps[app_id as keyof typeof validApps] || validApps[app_id as keyof typeof validApps] !== app_secret) {
			return NextResponse.json(
				{ error: "Invalid app credentials" },
				{ status: 401 }
			);
		}

		// Map external app events to our internal activity types
		const eventMapping: Record<string, string> = {
			// Chat App events
			'message_sent': 'chat_message',
			'message_replied': 'chat_reply',
			'discussion_started': 'discussion_start',
			'reaction_received': 'chat_reaction_bonus',
			'streak_achieved': 'chat_streak_bonus',
			
			// Forum App events
			'post_created': 'forum_post',
			'post_replied': 'forum_reply',
			'post_pinned': 'forum_pinned',
			'helpful_reaction': 'forum_helpful_bonus',
			'high_engagement': 'forum_engagement_bonus',
			
			// Course App events
			'module_completed': 'course_module',
			'course_completed': 'course_completion',
			'quiz_excellent': 'quiz_excellence',
			'progress_shared': 'course_progress_share',
			
			// Event App events
			'event_attended': 'live_event_attendance',
			
			// Livestreaming App events
			'stream_started': 'live_event_attendance',
			'stream_attended': 'live_event_attendance',
			'stream_chat_message': 'chat_message',
			'stream_reaction': 'chat_reaction_bonus',
			'speaker_joined': 'live_event_attendance',
			'raised_hand': 'live_event_attendance',
			
			// Custom Community events (if you have custom community features)
			'member_helped': 'member_help',
			'resource_shared': 'resource_share',
			'member_introduced': 'self_introduction',
			'weekly_checkin': 'weekly_checkin',
			
			// Custom Referral events (if you have a custom referral system)
			'user_referred': 'referral',
			'tier_achieved': 'referral_tier_bonus',
		};

		const activityType = eventMapping[event_type];
		if (!activityType) {
			return NextResponse.json(
				{ error: `Unknown event type: ${event_type}` },
				{ status: 400 }
			);
		}

		// Add source app information to metadata
		const metadata = {
			...data,
			sourceApp: app_id,
			timestamp: new Date().toISOString(),
		};

		// Track the activity
		await trackWhopActivity(user_id, activityType, metadata);

		console.log(`Successfully tracked ${event_type} from ${app_id} for user ${user_id}`);

		return NextResponse.json({
			success: true,
			message: `Activity ${event_type} tracked successfully`,
			activityType,
			points: getPointsForActivity(activityType),
		});

	} catch (error) {
		console.error("Error processing integration request:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// Helper function to get points for an activity type
function getPointsForActivity(activityType: string): number {
	const pointsMap: Record<string, number> = {
		// Chat & Communication
		'chat_message': 2,
		'chat_reply': 3,
		'discussion_start': 10,
		'chat_reaction_bonus': 5,
		'chat_streak_bonus': 20,
		
		// Forum Activity
		'forum_post': 15,
		'forum_reply': 8,
		'forum_pinned': 50,
		'forum_helpful_bonus': 15,
		'forum_engagement_bonus': 25,
		
		// Course & Learning
		'course_module': 50,
		'course_completion': 200,
		'quiz_excellence': 30,
		'course_progress_share': 20,
		
		// Community Value
		'member_help': 40,
		'resource_share': 25,
		'self_introduction': 10,
		'live_event_attendance': 75,
		'weekly_checkin': 15,
		
		// Referrals & Growth
		'referral': 100,
		'referral_tier_bonus': 50,
	};

	return pointsMap[activityType] || 0;
}

// GET endpoint for integration status and documentation
export async function GET(request: NextRequest): Promise<Response> {
	const url = new URL(request.url);
	const app_id = url.searchParams.get('app_id');

	if (!app_id) {
		return NextResponse.json({
			message: "Community Quest Integration API",
			version: "1.0.0",
			supported_apps: [
				'chat_app',      // Whop Chat App
				'forum_app',     // Whop Forum App
				'course_app',    // Whop Course App
				'event_app',     // Whop Events App
				'livestreaming_app', // Whop Livestreaming App
				// Custom integrations (require setup):
				'whop_affiliates'        // Whop Consumer Affiliates program
			],
			documentation: {
				endpoint: "/api/integrations",
				method: "POST",
				required_fields: ["app_id", "app_secret", "event_type", "user_id"],
				supported_events: {
					chat_app: ["message_sent", "message_replied", "discussion_started", "reaction_received", "streak_achieved"],
					forum_app: ["post_created", "post_replied", "post_pinned", "helpful_reaction", "high_engagement"],
					course_app: ["module_completed", "course_completed", "quiz_excellent", "progress_shared"],
					event_app: ["event_attended"],
					livestreaming_app: ["stream_started", "stream_attended", "stream_chat_message", "stream_reaction", "speaker_joined", "raised_hand"],
					// Custom integrations (require custom app setup):
					whop_affiliates: ["user_referred", "tier_achieved"]
				}
			}
		});
	}

	// Return specific app integration status
	const webhookUrl = process.env.NEXT_PUBLIC_APP_URL ? 
		`${process.env.NEXT_PUBLIC_APP_URL}/api/integrations` : 
		'Not configured - Set NEXT_PUBLIC_APP_URL environment variable';
		
	return NextResponse.json({
		app_id,
		status: "active",
		last_activity: new Date().toISOString(),
		webhook_url: webhookUrl,
		events_tracked: 0, // This would be tracked in a real database
		configuration_required: !process.env.NEXT_PUBLIC_APP_URL
	});
}
