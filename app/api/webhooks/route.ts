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
		const { action, data } = webhookData;

		// Handle different engagement events based on available webhook types
		switch (action) {
			case "payment.succeeded":
				// Track successful payment as engagement
				await trackWhopActivity(data.user_id, 'course_completion', {
					paymentId: data.id,
					amount: data.final_amount,
					currency: data.currency,
					type: 'payment_made'
				});
				console.log(`Tracked payment success from user ${data.user_id}`);
				break;
			
			case "membership.went_valid":
				// Track membership activation as engagement
				await trackWhopActivity(data.user_id, 'event_attendance', {
					membershipId: data.id,
					type: 'membership_activated'
				});
				console.log(`Tracked membership activation from user ${data.user_id}`);
				break;
			
			case "membership.experience_claimed":
				// Track experience claim as engagement
				await trackWhopActivity(data.user_id, 'course_completion', {
					experienceId: data.experience_id,
					type: 'experience_claimed'
				});
				console.log(`Tracked experience claim from user ${data.user_id}`);
				break;
			
			case "membership.metadata_updated":
				// Track profile updates as engagement
				await trackWhopActivity(data.user_id, 'chat_message', {
					metadata: data.metadata,
					type: 'profile_updated'
				});
				console.log(`Tracked profile update from user ${data.user_id}`);
				break;
			
			// Legacy support for chat/forum events if they become available
			case "chat.message":
				await trackWhopActivity(data.userId, 'chat_message', {
					messageLength: data.content?.length || 0,
					channelId: data.channelId
				});
				console.log(`Tracked chat message from user ${data.userId}`);
				break;
			
			case "forum.post":
				await trackWhopActivity(data.userId, 'forum_post', {
					postLength: data.content?.length || 0,
					forumId: data.forumId
				});
				console.log(`Tracked forum post from user ${data.userId}`);
				break;
			
			case "forum.comment":
				await trackWhopActivity(data.userId, 'forum_comment', {
					postId: data.postId,
					forumId: data.forumId
				});
				console.log(`Tracked forum comment from user ${data.userId}`);
				break;
			
			case "course.completed":
				await trackWhopActivity(data.userId, 'course_completion', {
					courseId: data.courseId,
					courseName: data.courseName
				});
				console.log(`Tracked course completion from user ${data.userId}`);
				break;
			
			case "event.attended":
				await trackWhopActivity(data.userId, 'event_attendance', {
					eventId: data.eventId,
					eventName: data.eventName
				});
				console.log(`Tracked event attendance from user ${data.userId}`);
				break;
			
			case "user.created":
				if (data.referredBy) {
					await trackWhopActivity(data.referredBy, 'referral', {
						referredUserId: data.id
					});
					console.log(`Tracked referral from user ${data.referredBy}`);
				}
				break;
			
			default:
				// Log unknown actions for debugging
				if (action && !action.includes('payment')) {
					console.log(`Unknown engagement webhook action: ${action}`);
				}
		}
	} catch (error) {
		console.error("Error handling engagement webhook:", error);
	}
}
