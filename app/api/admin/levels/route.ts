import { NextRequest, NextResponse } from 'next/server';
import { Level } from '@/lib/types';
import { getConfiguredLevels } from '@/lib/level-config';

// In-memory storage for demo purposes
// In production, you'd want to use a database
let levelConfig: Level[] = [];

// Initialize with default config if empty
function initializeConfig() {
  if (levelConfig.length === 0) {
    levelConfig = getConfiguredLevels();
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
