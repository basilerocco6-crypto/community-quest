# Level Name Customization Guide

This guide explains how to customize the level names in your Community Quest application.

## Overview

The Community Quest system now supports customizable level names through environment variables. You can override the default level names to better match your community's theme and branding.

## Default Level Names

The system comes with these default level names:

| Level | Default Name | Required Points |
|-------|--------------|-----------------|
| 1 | Newcomer | 0 |
| 2 | Contributor | 100 |
| 3 | Active Member | 300 |
| 4 | Community Builder | 600 |
| 5 | Expert | 1000 |
| 6 | Grandmaster | 2000 |
| 7 | Community Leader | 3500 |
| 8 | Wizard | 5500 |
| 9 | GOAT | 8000 |

## How to Customize Level Names

### 1. Set Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Level 1: Newcomer (default)
LEVEL_1_NAME=Your Custom Name

# Level 2: Contributor (default)  
LEVEL_2_NAME=Your Custom Name

# Level 3: Active Member (default)
LEVEL_3_NAME=Your Custom Name

# Level 4: Community Builder (default)
LEVEL_4_NAME=Your Custom Name

# Level 5: Expert (default)
LEVEL_5_NAME=Your Custom Name

# Level 6: Grandmaster (default)
LEVEL_6_NAME=Your Custom Name

# Level 7: Community Leader (default)
LEVEL_7_NAME=Your Custom Name

# Level 8: Wizard (default)
LEVEL_8_NAME=Your Custom Name

# Level 9: GOAT (default)
LEVEL_9_NAME=Your Custom Name
```

### 2. Examples for Different Communities

#### Gaming Community
```bash
LEVEL_1_NAME=Rookie
LEVEL_2_NAME=Player
LEVEL_3_NAME=Veteran
LEVEL_4_NAME=Elite
LEVEL_5_NAME=Champion
LEVEL_6_NAME=Master
LEVEL_7_NAME=Legend
LEVEL_8_NAME=Mythic
LEVEL_9_NAME=Immortal
```

#### Business Community
```bash
LEVEL_1_NAME=Starter
LEVEL_2_NAME=Builder
LEVEL_3_NAME=Creator
LEVEL_4_NAME=Innovator
LEVEL_5_NAME=Leader
LEVEL_6_NAME=Visionary
LEVEL_7_NAME=Pioneer
LEVEL_8_NAME=Mentor
LEVEL_9_NAME=Founder
```

#### Fitness Community
```bash
LEVEL_1_NAME=Beginner
LEVEL_2_NAME=Enthusiast
LEVEL_3_NAME=Athlete
LEVEL_4_NAME=Champion
LEVEL_5_NAME=Elite
LEVEL_6_NAME=Master
LEVEL_7_NAME=Legend
LEVEL_8_NAME=Icon
LEVEL_9_NAME=Inspiration
```

#### Creative Community
```bash
LEVEL_1_NAME=Apprentice
LEVEL_2_NAME=Creator
LEVEL_3_NAME=Artist
LEVEL_4_NAME=Designer
LEVEL_5_NAME=Master
LEVEL_6_NAME=Genius
LEVEL_7_NAME=Virtuoso
LEVEL_8_NAME=Maestro
LEVEL_9_NAME=Legend
```

### 3. Partial Customization

You don't need to customize all level names. You can customize only specific levels and leave others with their default names:

```bash
# Only customize levels 1, 5, and 9
LEVEL_1_NAME=Rookie
LEVEL_5_NAME=Champion
LEVEL_9_NAME=Legend
# Levels 2, 3, 4, 6, 7, 8 will use default names
```

## Implementation Details

### How It Works

1. The system checks for environment variables named `LEVEL_X_NAME` where X is the level number
2. If a custom name is found, it replaces the default name
3. If no custom name is set, the default name is used
4. All level configuration (points, perks, colors) remains the same - only the name changes

### Code Structure

- **Configuration**: `lib/level-config.ts` - Contains the level configuration system
- **Types**: `lib/types.ts` - Exports the configured levels via `MOCK_LEVELS`
- **Components**: All components automatically use the configured level names

### Validation

The system includes validation to warn about missing level name configurations:

```typescript
import { validateLevelConfiguration } from './lib/level-config';

const { isValid, errors } = validateLevelConfiguration();
if (errors.length > 0) {
  console.warn('Level configuration warnings:', errors);
}
```

## Best Practices

1. **Keep names concise**: Level names should be easy to read and understand
2. **Maintain progression**: Names should reflect increasing status/achievement
3. **Match your brand**: Choose names that align with your community's theme
4. **Test thoroughly**: Verify that all components display the new names correctly
5. **Document changes**: Let your community know about level name updates

## Troubleshooting

### Level names not updating?

1. **Check environment variables**: Ensure they're set correctly in `.env.local`
2. **Restart the application**: Environment variable changes require a restart
3. **Check syntax**: Make sure there are no quotes or special characters causing issues
4. **Verify variable names**: Use the exact format `LEVEL_X_NAME`

### Still using default names?

If custom names aren't appearing, the system will fall back to default names. Check your environment variable configuration and ensure the application is reading from the correct environment file.

## Support

For additional help with level customization, refer to the main documentation or contact support.
