import { waitUntil } from "@vercel/functions";
import { makeWebhookValidator } from "@whop/api";
import type { NextRequest } from "next/server";
import { trackWhopActivity } from "@/lib/engagement";

const validateWebhook = makeWebhookValidator({
	webhookSecret: process.env.WHOP_WEBHOOK_SECRET ?? "fallback",
});

export async function POST(request: NextRequest): Promise<Response> {
	// Validate the webhook to ensure it's from Whop
	const webhookData = await validateWebhook(request);

	// Handle the webhook event
	if (webhookData.action === "payment.succeeded") {
		const { id, final_amount, amount_after_fees, currency, user_id } =
			webhookData.data;

		// final_amount is the amount the user paid
		// amount_after_fees is the amount that is received by you, after card fees and processing fees are taken out

		console.log(
			`Payment ${id} succeeded for ${user_id} with amount ${final_amount} ${currency}`,
		);

		// if you need to do work that takes a long time, use waitUntil to run it in the background
		waitUntil(
			potentiallyLongRunningHandler(
				user_id,
				final_amount,
				currency,
				amount_after_fees,
			),
		);
	}

	// Handle engagement tracking webhooks
	waitUntil(handleEngagementWebhook(webhookData));

	// Make sure to return a 2xx status code quickly. Otherwise the webhook will be retried.
	return new Response("OK", { status: 200 });
}

async function potentiallyLongRunningHandler(
	_user_id: string | null | undefined,
	_amount: number,
	_currency: string,
	_amount_after_fees: number | null | undefined,
) {
	// This is a placeholder for a potentially long running operation
	// In a real scenario, you might need to fetch user data, update a database, etc.
}

async function handleEngagementWebhook(webhookData: any) {
	try {
		const { action, data, source_app } = webhookData;

		// Handle different engagement events from external Whop apps
		switch (action) {
			// === WHOP CHAT APP EVENTS ===
			case "chat.message_sent":
				await trackWhopActivity(data.user_id, 'chat_message', {
					messageLength: data.content?.length || 0,
					channelId: data.channel_id,
					sourceApp: source_app || 'chat_app'
				});
				console.log(`Tracked chat message from user ${data.user_id}`);
				break;
			
			case "chat.message_replied":
				await trackWhopActivity(data.user_id, 'chat_reply', {
					originalMessageId: data.original_message_id,
					channelId: data.channel_id,
					sourceApp: source_app || 'chat_app'
				});
				console.log(`Tracked chat reply from user ${data.user_id}`);
				break;
			
			case "chat.discussion_started":
				await trackWhopActivity(data.user_id, 'discussion_start', {
					discussionId: data.discussion_id,
					channelId: data.channel_id,
					sourceApp: source_app || 'chat_app'
				});
				console.log(`Tracked discussion start from user ${data.user_id}`);
				break;
			
			case "chat.reaction_received":
				if (data.reaction_count >= 5) {
					await trackWhopActivity(data.user_id, 'chat_reaction_bonus', {
						messageId: data.message_id,
						reactionCount: data.reaction_count,
						sourceApp: source_app || 'chat_app'
					});
					console.log(`Tracked chat reaction bonus from user ${data.user_id}`);
				}
				break;
			
			case "chat.streak_achieved":
				if (data.streak_days >= 7) {
					await trackWhopActivity(data.user_id, 'chat_streak_bonus', {
						streakDays: data.streak_days,
						sourceApp: source_app || 'chat_app'
					});
					console.log(`Tracked chat streak bonus from user ${data.user_id}`);
				}
				break;

			// === FORUM APP EVENTS ===
			case "forum.post_created":
				await trackWhopActivity(data.user_id, 'forum_post', {
					postLength: data.content?.length || 0,
					forumId: data.forum_id,
					postId: data.post_id,
					sourceApp: source_app || 'forum_app'
				});
				console.log(`Tracked forum post from user ${data.user_id}`);
				break;
			
			case "forum.post_replied":
				await trackWhopActivity(data.user_id, 'forum_reply', {
					postId: data.post_id,
					forumId: data.forum_id,
					sourceApp: source_app || 'forum_app'
				});
				console.log(`Tracked forum reply from user ${data.user_id}`);
				break;
			
			case "forum.post_pinned":
				await trackWhopActivity(data.post_author_id, 'forum_pinned', {
					postId: data.post_id,
					forumId: data.forum_id,
					sourceApp: source_app || 'forum_app'
				});
				console.log(`Tracked forum post pinned for user ${data.post_author_id}`);
				break;
			
			case "forum.helpful_reaction":
				if (data.helpful_count >= 3) {
					await trackWhopActivity(data.post_author_id, 'forum_helpful_bonus', {
						postId: data.post_id,
						helpfulCount: data.helpful_count,
						sourceApp: source_app || 'forum_app'
					});
					console.log(`Tracked forum helpful bonus for user ${data.post_author_id}`);
				}
				break;
			
			case "forum.high_engagement":
				if (data.reply_count >= 10) {
					await trackWhopActivity(data.post_author_id, 'forum_engagement_bonus', {
						postId: data.post_id,
						replyCount: data.reply_count,
						sourceApp: source_app || 'forum_app'
					});
					console.log(`Tracked forum engagement bonus for user ${data.post_author_id}`);
				}
				break;

			// === COURSE APP EVENTS ===
			case "course.module_completed":
				await trackWhopActivity(data.user_id, 'course_module', {
					moduleId: data.module_id,
					moduleName: data.module_name,
					courseId: data.course_id,
					sourceApp: source_app || 'course_app'
				});
				console.log(`Tracked course module completion from user ${data.user_id}`);
				break;
			
			case "course.course_completed":
				await trackWhopActivity(data.user_id, 'course_completion', {
					courseId: data.course_id,
					courseName: data.course_name,
					sourceApp: source_app || 'course_app'
				});
				console.log(`Tracked course completion from user ${data.user_id}`);
				break;
			
			case "course.quiz_excellent":
				if (data.score >= 90) {
					await trackWhopActivity(data.user_id, 'quiz_excellence', {
						quizId: data.quiz_id,
						score: data.score,
						courseId: data.course_id,
						sourceApp: source_app || 'course_app'
					});
					console.log(`Tracked quiz excellence from user ${data.user_id}`);
				}
				break;
			
			case "course.progress_shared":
				await trackWhopActivity(data.user_id, 'course_progress_share', {
					courseId: data.course_id,
					progressType: data.progress_type,
					sourceApp: source_app || 'course_app'
				});
				console.log(`Tracked course progress share from user ${data.user_id}`);
				break;

			// === EVENT APP EVENTS ===
			case "event.attended":
				await trackWhopActivity(data.user_id, 'live_event_attendance', {
					eventId: data.event_id,
					eventName: data.event_name,
					eventType: data.event_type,
					sourceApp: source_app || 'event_app'
				});
				console.log(`Tracked event attendance from user ${data.user_id}`);
				break;

			// === LIVESTREAMING APP EVENTS ===
			case "livestream.started":
				await trackWhopActivity(data.host_user_id, 'live_event_attendance', {
					streamId: data.stream_id,
					streamTitle: data.stream_title,
					streamType: 'hosted',
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream start from host ${data.host_user_id}`);
				break;
			
			case "livestream.attended":
				await trackWhopActivity(data.user_id, 'live_event_attendance', {
					streamId: data.stream_id,
					streamTitle: data.stream_title,
					streamDuration: data.duration_minutes,
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream attendance from user ${data.user_id}`);
				break;
			
			case "livestream.chat_message":
				await trackWhopActivity(data.user_id, 'chat_message', {
					messageLength: data.content?.length || 0,
					streamId: data.stream_id,
					streamTitle: data.stream_title,
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream chat message from user ${data.user_id}`);
				break;
			
			case "livestream.reaction":
				await trackWhopActivity(data.user_id, 'chat_reaction_bonus', {
					streamId: data.stream_id,
					reactionType: data.reaction_type,
					reactionCount: data.reaction_count,
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream reaction from user ${data.user_id}`);
				break;
			
			case "livestream.speaker_joined":
				await trackWhopActivity(data.user_id, 'live_event_attendance', {
					streamId: data.stream_id,
					streamTitle: data.stream_title,
					participationType: 'speaker',
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream speaker participation from user ${data.user_id}`);
				break;
			
			case "livestream.raised_hand":
				await trackWhopActivity(data.user_id, 'live_event_attendance', {
					streamId: data.stream_id,
					streamTitle: data.stream_title,
					participationType: 'raised_hand',
					sourceApp: source_app || 'livestreaming_app'
				});
				console.log(`Tracked livestream raised hand from user ${data.user_id}`);
				break;

			// === COMMUNITY VALUE EVENTS ===
			case "member.helped":
				await trackWhopActivity(data.helper_user_id, 'member_help', {
					helpedUserId: data.helped_user_id,
					helpType: data.help_type,
					verifiedBy: data.verified_by,
					sourceApp: source_app || 'community_app'
				});
				console.log(`Tracked member help from user ${data.helper_user_id}`);
				break;
			
			case "resource.shared":
				await trackWhopActivity(data.user_id, 'resource_share', {
					resourceType: data.resource_type,
					resourceId: data.resource_id,
					sourceApp: source_app || 'community_app'
				});
				console.log(`Tracked resource share from user ${data.user_id}`);
				break;
			
			case "member.introduced":
				await trackWhopActivity(data.user_id, 'self_introduction', {
					introductionType: data.introduction_type,
					sourceApp: source_app || 'community_app'
				});
				console.log(`Tracked self introduction from user ${data.user_id}`);
				break;
			
			case "weekly.checkin":
				await trackWhopActivity(data.user_id, 'weekly_checkin', {
					weekNumber: data.week_number,
					checkinType: data.checkin_type,
					sourceApp: source_app || 'community_app'
				});
				console.log(`Tracked weekly check-in from user ${data.user_id}`);
				break;

			// === REFERRAL EVENTS ===
			case "user.referred":
				await trackWhopActivity(data.referrer_user_id, 'referral', {
					referredUserId: data.referred_user_id,
					sourceApp: source_app || 'referral_app'
				});
				console.log(`Tracked referral from user ${data.referrer_user_id}`);
				break;
			
			case "user.tier_achieved":
				if (data.tier === 'contributor' && data.referred_by) {
					await trackWhopActivity(data.referred_by, 'referral_tier_bonus', {
						referredUserId: data.user_id,
						tier: data.tier,
						sourceApp: source_app || 'referral_app'
					});
					console.log(`Tracked referral tier bonus for user ${data.referred_by}`);
				}
				break;

			// === LEGACY WHOP EVENTS ===
			case "payment.succeeded":
				await trackWhopActivity(data.user_id, 'course_completion', {
					paymentId: data.id,
					amount: data.final_amount,
					currency: data.currency,
					type: 'payment_made',
					sourceApp: 'whop_core'
				});
				console.log(`Tracked payment success from user ${data.user_id}`);
				break;
			
			case "membership.went_valid":
				await trackWhopActivity(data.user_id, 'live_event_attendance', {
					membershipId: data.id,
					type: 'membership_activated',
					sourceApp: 'whop_core'
				});
				console.log(`Tracked membership activation from user ${data.user_id}`);
				break;
			
			case "membership.experience_claimed":
				await trackWhopActivity(data.user_id, 'course_completion', {
					experienceId: data.experience_id,
					type: 'experience_claimed',
					sourceApp: 'whop_core'
				});
				console.log(`Tracked experience claim from user ${data.user_id}`);
				break;
			
			case "membership.metadata_updated":
				await trackWhopActivity(data.user_id, 'self_introduction', {
					metadata: data.metadata,
					type: 'profile_updated',
					sourceApp: 'whop_core'
				});
				console.log(`Tracked profile update from user ${data.user_id}`);
				break;
			
			default:
				// Log unknown actions for debugging
				if (action && !action.includes('payment')) {
					console.log(`Unknown engagement webhook action: ${action} from ${source_app || 'unknown'}`);
				}
		}
	} catch (error) {
		console.error("Error handling engagement webhook:", error);
	}
}
