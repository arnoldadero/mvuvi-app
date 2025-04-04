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

// Function to get moon phase name and image based on phase value
const getMoonPhaseInfo = (phase: number): { name: string; image: any } => {
  // Phase ranges and corresponding names/images
  if (phase < 1) {
    return { 
      name: 'New Moon', 
      image: require('../../assets/moon-phases/new-moon-0%.png') 
    };
  } else if (phase < 3.69) {
    return { 
      name: 'Waxing Crescent', 
      image: require('../../assets/moon-phases/waxing-crescent-13%.png') 
    };
  } else if (phase < 7.38) {
    return { 
      name: 'First Quarter', 
      image: require('../../assets/moon-phases/first-quarter-40%.png') 
    };
  } else if (phase < 11.07) {
    return { 
      name: 'Waxing Gibbous', 
      image: require('../../assets/moon-phases/waxing-gibbous-74%.png') 
    };
  } else if (phase < 14.76) {
    return { 
      name: 'Full Moon', 
      image: require('../../assets/moon-phases/full-moon-100%.png') 
    };
  } else if (phase < 18.45) {
    return { 
      name: 'Waning Gibbous', 
      image: require('../../assets/moon-phases/waning-gibbous-75%.png') 
    };
  } else if (phase < 22.14) {
    return { 
      name: 'Third Quarter', 
      image: require('../../assets/moon-phases/third-quarter-46%.png') 
    };
  } else if (phase < 25.83) {
    return { 
      name: 'Waning Crescent', 
      image: require('../../assets/moon-phases/waning-crescent-25%.png') 
    };
  } else {
    return { 
      name: 'New Moon', 
      image: require('../../assets/moon-phases/new-moon-0%.png') 
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
        <Text fontSize="$2" marginTop="$1" color="$gray10">
          {name}
        </Text>
      )}
    </View>
  );
}
