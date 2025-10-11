import { Level } from './types';

// Default level names that can be overridden by environment variables
const DEFAULT_LEVEL_NAMES = {
  1: "Newcomer",
  2: "Contributor", 
  3: "Active Member",
  4: "Community Builder",
  5: "Expert",
  6: "Grandmaster",
  7: "Community Leader",
  8: "Wizard",
  9: "GOAT"
};

// Default level configuration with customizable names
const DEFAULT_LEVEL_CONFIG: Level[] = [
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
    perks: ["Early access to new content releases", "Priority support response"],
    memberPercentage: 25,
    badgeColor: "bg-green-400",
    isUnlocked: false
  },
  {
    level: 3,
    name: "Active Member",
    requiredPoints: 300,
    perks: ["Access to exclusive community polls", "Monthly featured member spotlight"],
    memberPercentage: 15,
    badgeColor: "bg-purple-400",
    isUnlocked: false
  },
  {
    level: 4,
    name: "Community Builder",
    requiredPoints: 600,
    perks: ["Access to beta features and early releases", "Double points on weekend activities"],
    memberPercentage: 8,
    badgeColor: "bg-orange-400",
    isUnlocked: false
  },
  {
    level: 5,
    name: "Expert",
    requiredPoints: 1000,
    perks: ["Access to Expert-only forum discussions", "Monthly group coaching call access", "Free access to one premium course/month"],
    memberPercentage: 5,
    badgeColor: "bg-red-400",
    isUnlocked: false
  },
  {
    level: 6,
    name: "Grandmaster",
    requiredPoints: 2000,
    perks: ["Revenue share on referrals (5%)", "Access to founder's exclusive content library"],
    memberPercentage: 3,
    badgeColor: "bg-indigo-400",
    isUnlocked: false
  },
  {
    level: 7,
    name: "Community Leader",
    requiredPoints: 3500,
    perks: ["Invitation to exclusive community events", "Revenue share on referrals (10%)", "Direct messaging access to founder"],
    memberPercentage: 2,
    badgeColor: "bg-pink-400",
    isUnlocked: false
  },
  {
    level: 8,
    name: "Wizard",
    requiredPoints: 5500,
    perks: ["Monthly private mastermind with founder", "Revenue share on referrals (15%)", "Exclusive \"Wizard Council\" forum access", "Free lifetime access to all products"],
    memberPercentage: 1,
    badgeColor: "bg-yellow-400",
    isUnlocked: false
  },
  {
    level: 9,
    name: "GOAT",
    requiredPoints: 8000,
    perks: ["Monthly 1:1 coaching session with founder (30 min)", "Revenue share on referrals (20%)", "Equity/partnership opportunities discussed", "Free ticket to annual in-person event", "Co-founder status consideration"],
    memberPercentage: 0.1,
    badgeColor: "bg-gradient-to-r from-purple-400 to-pink-400",
    isUnlocked: false
  }
];

/**
 * Gets the configured level names from environment variables or defaults
 * Environment variables should be named LEVEL_1_NAME, LEVEL_2_NAME, etc.
 */
function getCustomLevelNames(): Partial<Record<number, string>> {
  const customNames: Partial<Record<number, string>> = {};
  
  for (let level = 1; level <= 9; level++) {
    const envVarName = `LEVEL_${level}_NAME`;
    const envValue = process.env[envVarName];
    
    if (envValue && envValue.trim()) {
      customNames[level] = envValue.trim();
    }
  }
  
  return customNames;
}

/**
 * Creates the configured levels with custom names applied
 */
export function getConfiguredLevels(): Level[] {
  const customNames = getCustomLevelNames();
  
  return DEFAULT_LEVEL_CONFIG.map(level => ({
    ...level,
    name: customNames[level.level] || level.name
  }));
}

/**
 * Gets a specific level configuration
 */
export function getLevelConfig(levelNumber: number): Level | undefined {
  const levels = getConfiguredLevels();
  return levels.find(level => level.level === levelNumber);
}

/**
 * Gets level name by level number with fallback
 */
export function getLevelName(levelNumber: number): string {
  const level = getLevelConfig(levelNumber);
  return level?.name || DEFAULT_LEVEL_NAMES[levelNumber as keyof typeof DEFAULT_LEVEL_NAMES] || `Level ${levelNumber}`;
}

/**
 * Validates that all required environment variables for level names are set
 */
export function validateLevelConfiguration(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const customNames = getCustomLevelNames();
  
  // Check if any custom names are provided
  const hasCustomNames = Object.keys(customNames).length > 0;
  
  if (hasCustomNames) {
    // If some custom names are provided, warn about missing ones
    for (let level = 1; level <= 9; level++) {
      if (!customNames[level]) {
        errors.push(`Warning: LEVEL_${level}_NAME not set, using default name: "${DEFAULT_LEVEL_NAMES[level as keyof typeof DEFAULT_LEVEL_NAMES]}"`);
      }
    }
  }
  
  return {
    isValid: true, // Always valid, just warnings
    errors
  };
}

/**
 * Fetches levels from the admin API (for client-side use)
 * Falls back to default configuration if API is not available
 */
export async function fetchLevelsFromAPI(): Promise<Level[]> {
  try {
    const response = await fetch('/api/admin/levels');
    if (response.ok) {
      const data = await response.json();
      return data.levels || DEFAULT_LEVEL_CONFIG;
    }
  } catch (error) {
    console.warn('Failed to fetch levels from API, using default configuration:', error);
  }
  
  return DEFAULT_LEVEL_CONFIG;
}
