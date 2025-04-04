import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'tamagui';

interface MoonPhaseIndicatorProps {
  date: Date;
  size?: number;
  showLabel?: boolean;
}

// Function to calculate moon phase
// Returns a value from 0 to 29.5 representing the moon's age in days
const getMoonPhase = (date: Date): number => {
  // Moon cycle is approximately 29.53 days
  const LUNAR_CYCLE = 29.53;

  // Known new moon date for reference (January 1, 2000)
  const KNOWN_NEW_MOON = new Date(2000, 0, 6).getTime();

  // Calculate days since known new moon
  const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);

  // Calculate current phase (0 to 29.53)
  const phase = daysSinceNewMoon % LUNAR_CYCLE;

  return phase;
};

// Create a mapping of moon phase images
const moonPhaseImages = {
  'new-moon-day-0': require('../../assets/moon-phases/new_moon_day_0.png'),
  'new-moon-day-1': require('../../assets/moon-phases/new_moon_day_1.png'),
  'waxing-crescent-day-2': require('../../assets/moon-phases/waxing_crescent_day_2.png'),
  'waxing-crescent-day-4': require('../../assets/moon-phases/waxing_crescent_day_4.png'),
  'waxing-crescent-day-5': require('../../assets/moon-phases/waxing_crescent_day_5.png'),
  'waxing-crescent-day-6': require('../../assets/moon-phases/waxing_crescent_day_6.png'),
  'first-quarter-day-7': require('../../assets/moon-phases/first_quarter_day_7.png'),
  'first-quarter-day-8': require('../../assets/moon-phases/first_quarter_day_8.png'),
  'waxing-gibbous-day-11': require('../../assets/moon-phases/waxing_gibbous_day_11.png'),
  'waxing-gibbous-day-13': require('../../assets/moon-phases/waxing_gibbous_day_13.png'),
  'full-moon-day-15': require('../../assets/moon-phases/full_moon_day_15.png'),
  'waning-gibbous-day-17': require('../../assets/moon-phases/waning_gibbous_day_17.png'),
  'waning-gibbous-day-19': require('../../assets/moon-phases/waning_gibbous_day_19.png'),
  'last-quarter-day-22': require('../../assets/moon-phases/last_quarter_day_22.png'),
  'waning-crescent-day-25': require('../../assets/moon-phases/waning_crescent_day_25.png'),
  'waning-crescent-day-27': require('../../assets/moon-phases/waning_crescent_day_27.png'),
  'waning-crescent-day-28': require('../../assets/moon-phases/waning_crescent_day_28.png')
};

// Function to get moon phase name and image based on phase value (moon age in days)
const getMoonPhaseInfo = (phase: number): { name: string; image: any } => {
  // Phase ranges and corresponding names/images based on moon age in days
  if (phase < 1) {
    return {
      name: 'New Moon (Day 0)',
      image: moonPhaseImages['new-moon-day-0']
    };
  } else if (phase < 2) {
    return {
      name: 'New Moon (Day 1)',
      image: moonPhaseImages['new-moon-day-1']
    };
  } else if (phase < 3) {
    return {
      name: 'Waxing Crescent (Day 2)',
      image: moonPhaseImages['waxing-crescent-day-2']
    };
  } else if (phase < 5) {
    return {
      name: 'Waxing Crescent (Day 4)',
      image: moonPhaseImages['waxing-crescent-day-4']
    };
  } else if (phase < 6) {
    return {
      name: 'Waxing Crescent (Day 5)',
      image: moonPhaseImages['waxing-crescent-day-5']
    };
  } else if (phase < 7) {
    return {
      name: 'Waxing Crescent (Day 6)',
      image: moonPhaseImages['waxing-crescent-day-6']
    };
  } else if (phase < 8) {
    return {
      name: 'First Quarter (Day 7)',
      image: moonPhaseImages['first-quarter-day-7']
    };
  } else if (phase < 10) {
    return {
      name: 'First Quarter (Day 8)',
      image: moonPhaseImages['first-quarter-day-8']
    };
  } else if (phase < 12) {
    return {
      name: 'Waxing Gibbous (Day 11)',
      image: moonPhaseImages['waxing-gibbous-day-11']
    };
  } else if (phase < 14) {
    return {
      name: 'Waxing Gibbous (Day 13)',
      image: moonPhaseImages['waxing-gibbous-day-13']
    };
  } else if (phase < 15) {
    return {
      name: 'Full Moon (Day 15)',
      image: moonPhaseImages['full-moon-day-15']
    };
  } else if (phase < 18) {
    return {
      name: 'Waning Gibbous (Day 17)',
      image: moonPhaseImages['waning-gibbous-day-17']
    };
  } else if (phase < 21) {
    return {
      name: 'Waning Gibbous (Day 19)',
      image: moonPhaseImages['waning-gibbous-day-19']
    };
  } else if (phase < 23) {
    return {
      name: 'Last Quarter (Day 22)',
      image: moonPhaseImages['last-quarter-day-22']
    };
  } else if (phase < 26) {
    return {
      name: 'Waning Crescent (Day 25)',
      image: moonPhaseImages['waning-crescent-day-25']
    };
  } else if (phase < 28) {
    return {
      name: 'Waning Crescent (Day 27)',
      image: moonPhaseImages['waning-crescent-day-27']
    };
  } else {
    return {
      name: 'Waning Crescent (Day 28)',
      image: moonPhaseImages['waning-crescent-day-28']
    };
  }
};

export function MoonPhaseIndicator({ date, size = 24, showLabel = false }: MoonPhaseIndicatorProps) {
  const phase = getMoonPhase(date);
  const { name, image } = getMoonPhaseInfo(phase);

  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={image}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {showLabel && (
        <View>
          <Text fontSize="$2" marginTop="$1" color="$gray10">
            {name}
          </Text>
          <Text fontSize="$1" color="$gray9" textAlign="center">
            Day {Math.round(phase)}
          </Text>
        </View>
      )}
    </View>
  );
}
