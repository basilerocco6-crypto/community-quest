import { NextRequest, NextResponse } from 'next/server';

export interface Notification {
  id: string;
  userId: string;
  type: 'achievement' | 'level_up' | 'system' | 'community' | 'reward';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

// In-memory storage for demo purposes
// In production, you'd want to use a database
let notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'system',
    title: 'Welcome to Community Quest!',
    message: 'Start engaging with the community to earn points and unlock rewards.',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    userId: '1',
    type: 'achievement',
    title: 'First Steps Complete!',
    message: 'You\'ve completed your first community interaction. Keep it up!',
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    userId: '1',
    type: 'community',
    title: 'New Community Event',
    message: 'Join our weekly community challenge starting tomorrow!',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: '4',
    userId: '1',
    type: 'reward',
    title: 'Reward Available!',
    message: 'You\'ve unlocked a 5% discount on all products. Check your rewards panel.',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
  }
];

// GET - Retrieve notifications for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '1'; // Default to user 1 for demo
    const limit = parseInt(searchParams.get('limit') || '50');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    let userNotifications = notifications.filter(n => n.userId === userId);
    
    if (unreadOnly) {
      userNotifications = userNotifications.filter(n => !n.isRead);
    }

    // Sort by creation date (newest first)
    userNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply limit
    userNotifications = userNotifications.slice(0, limit);

    const unreadCount = notifications.filter(n => n.userId === userId && !n.isRead).length;

    return NextResponse.json({
      notifications: userNotifications,
      unreadCount,
      total: notifications.filter(n => n.userId === userId).length
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

// POST - Create a new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, metadata } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const notification: Notification = {
      id: Date.now().toString(),
      userId,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      metadata
    };

    notifications.unshift(notification); // Add to beginning

    return NextResponse.json({
      success: true,
      notification,
      message: 'Notification created successfully'
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

// PUT - Mark notifications as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, notificationIds, markAllAsRead } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    let updatedCount = 0;

    if (markAllAsRead) {
      // Mark all notifications for user as read
      notifications = notifications.map(n => {
        if (n.userId === userId && !n.isRead) {
          updatedCount++;
          return { ...n, isRead: true };
        }
        return n;
      });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      notifications = notifications.map(n => {
        if (n.userId === userId && notificationIds.includes(n.id) && !n.isRead) {
          updatedCount++;
          return { ...n, isRead: true };
        }
        return n;
      });
    }

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `${updatedCount} notifications marked as read`
    });

  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}

// DELETE - Remove notifications
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const notificationId = searchParams.get('notificationId');
    const deleteAll = searchParams.get('deleteAll') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all notifications for user
      const initialLength = notifications.length;
      notifications = notifications.filter(n => n.userId !== userId);
      deletedCount = initialLength - notifications.length;
    } else if (notificationId) {
      // Delete specific notification
      const initialLength = notifications.length;
      notifications = notifications.filter(n => !(n.id === notificationId && n.userId === userId));
      deletedCount = initialLength - notifications.length;
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `${deletedCount} notifications deleted`
    });

  } catch (error) {
    console.error('Error deleting notifications:', error);
    return NextResponse.json({ error: 'Failed to delete notifications' }, { status: 500 });
  }
}
