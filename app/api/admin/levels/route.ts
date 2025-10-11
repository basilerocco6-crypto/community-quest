import { NextRequest, NextResponse } from 'next/server';
import { Level } from '@/lib/types';

// In-memory storage for demo purposes
// In production, you'd want to use a database
let levelConfig: Level[] = [];

// Initialize with default config if empty
function initializeConfig() {
  if (levelConfig.length === 0) {
    levelConfig = [
      {
        level: 1,
        name: "Newcomer",
        requiredPoints: 0,
        perks: ["Access to community chat", "View leaderboard rankings", "Access to welcome resources and guides"],
        memberPercentage: 100,
        badgeColor: "bg-blue-400",
        isUnlocked: true
      },
      {
        level: 2,
        name: "Contributor",
        requiredPoints: 100,
        perks: ["5% discount on all products", "Early access to new content releases", "Priority support response"],
        discountPercentage: 5,
        memberPercentage: 25,
        badgeColor: "bg-green-400",
        isUnlocked: false
      },
      {
        level: 3,
        name: "Active Member",
        requiredPoints: 300,
        perks: ["10% discount on all products", "Access to exclusive community polls", "Monthly featured member spotlight"],
        discountPercentage: 10,
        memberPercentage: 15,
        badgeColor: "bg-purple-400",
        isUnlocked: false
      },
      {
        level: 4,
        name: "Community Builder",
        requiredPoints: 600,
        perks: ["15% discount on all products", "Access to beta features and early releases", "Double points on weekend activities"],
        discountPercentage: 15,
        memberPercentage: 8,
        badgeColor: "bg-orange-400",
        isUnlocked: false
      },
      {
        level: 5,
        name: "Expert",
        requiredPoints: 1000,
        perks: ["20% discount on all products", "Access to Expert-only forum discussions", "Monthly group coaching call access", "Free access to one premium course/month"],
        discountPercentage: 20,
        memberPercentage: 5,
        badgeColor: "bg-red-400",
        isUnlocked: false
      },
      {
        level: 6,
        name: "Grandmaster",
        requiredPoints: 2000,
        perks: ["25% discount on all products", "Revenue share on referrals (5%)", "Access to founder's exclusive content library"],
        discountPercentage: 25,
        memberPercentage: 3,
        badgeColor: "bg-indigo-400",
        isUnlocked: false
      },
      {
        level: 7,
        name: "Community Leader",
        requiredPoints: 3500,
        perks: ["30% discount on all products", "Invitation to exclusive community events", "Revenue share on referrals (10%)", "Direct messaging access to founder"],
        discountPercentage: 30,
        memberPercentage: 2,
        badgeColor: "bg-pink-400",
        isUnlocked: false
      },
      {
        level: 8,
        name: "Wizard",
        requiredPoints: 5500,
        perks: ["35% discount on all products", "Monthly private mastermind with founder", "Revenue share on referrals (15%)", "Exclusive \"Wizard Council\" forum access", "Free lifetime access to all products"],
        discountPercentage: 35,
        memberPercentage: 1,
        badgeColor: "bg-yellow-400",
        isUnlocked: false
      },
      {
        level: 9,
        name: "GOAT",
        requiredPoints: 8000,
        perks: ["50% discount on all products", "Monthly 1:1 coaching session with founder (30 min)", "Revenue share on referrals (20%)", "Equity/partnership opportunities discussed", "Free ticket to annual in-person event", "Co-founder status consideration"],
        discountPercentage: 50,
        memberPercentage: 0.1,
        badgeColor: "bg-gradient-to-r from-purple-400 to-pink-400",
        isUnlocked: false
      }
    ];
  }
}

// GET - Retrieve all levels
export async function GET() {
  initializeConfig();
  return NextResponse.json({ levels: levelConfig });
}

// PUT - Update levels configuration
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { levels } = body;

    // Validate the levels array
    if (!Array.isArray(levels)) {
      return NextResponse.json({ error: 'Levels must be an array' }, { status: 400 });
    }

    // Validate each level
    for (const level of levels) {
      if (!level.level || !level.name || typeof level.requiredPoints !== 'number') {
        return NextResponse.json({ error: 'Invalid level configuration' }, { status: 400 });
      }
    }

    // Sort levels by level number
    const sortedLevels = levels.sort((a, b) => a.level - b.level);

    // Update the configuration
    levelConfig = sortedLevels;

    return NextResponse.json({ 
      success: true, 
      levels: levelConfig,
      message: 'Level configuration updated successfully' 
    });

  } catch (error) {
    console.error('Error updating level configuration:', error);
    return NextResponse.json({ error: 'Failed to update level configuration' }, { status: 500 });
  }
}

// POST - Add a new level
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level } = body;

    initializeConfig();

    // Validate the level
    if (!level.level || !level.name || typeof level.requiredPoints !== 'number') {
      return NextResponse.json({ error: 'Invalid level configuration' }, { status: 400 });
    }

    // Check if level already exists
    const existingLevel = levelConfig.find(l => l.level === level.level);
    if (existingLevel) {
      return NextResponse.json({ error: `Level ${level.level} already exists` }, { status: 400 });
    }

    // Add the new level
    levelConfig.push(level);
    levelConfig.sort((a, b) => a.level - b.level);

    return NextResponse.json({ 
      success: true, 
      levels: levelConfig,
      message: 'Level added successfully' 
    });

  } catch (error) {
    console.error('Error adding level:', error);
    return NextResponse.json({ error: 'Failed to add level' }, { status: 500 });
  }
}

// DELETE - Remove a level
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const levelNumber = parseInt(searchParams.get('level') || '0');

    if (!levelNumber) {
      return NextResponse.json({ error: 'Level number is required' }, { status: 400 });
    }

    initializeConfig();

    // Remove the level
    levelConfig = levelConfig.filter(l => l.level !== levelNumber);

    return NextResponse.json({ 
      success: true, 
      levels: levelConfig,
      message: `Level ${levelNumber} removed successfully` 
    });

  } catch (error) {
    console.error('Error removing level:', error);
    return NextResponse.json({ error: 'Failed to remove level' }, { status: 500 });
  }
}
