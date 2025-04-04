import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'tamagui';

export type WeatherCondition =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'wind'
  | 'hail';

interface WeatherIconProps {
  condition: WeatherCondition;
  width?: number;
  height?: number;
  alt?: string;
}

// Styled components for the weather icon
const IconContainer = styled(View, {
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e0e0e0',
});

const IconText = styled(Text, {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
});

/**
 * Maps weather condition strings to their corresponding emoji and background color
 */
const weatherIconData: Record<WeatherCondition, { emoji: string; color: string }> = {
  'clear-day': { emoji: '☀️', color: '#FFD700' },
  'clear-night': { emoji: '🌙', color: '#191970' },
  'partly-cloudy-day': { emoji: '⛅', color: '#87CEEB' },
  'partly-cloudy-night': { emoji: '☁️', color: '#4682B4' },
  'cloudy': { emoji: '☁️', color: '#708090' },
  'rain': { emoji: '🌧️', color: '#4682B4' },
  'thunderstorm': { emoji: '⛈️', color: '#483D8B' },
  'snow': { emoji: '❄️', color: '#F0F8FF' },
  'fog': { emoji: '🌫️', color: '#DCDCDC' },
  'wind': { emoji: '💨', color: '#E6E6FA' },
  'hail': { emoji: '🌨️', color: '#B0E0E6' },
};

/**
 * Weather icon component that displays the appropriate emoji for a given weather condition
 */
export function WeatherIcon({ condition, width = 40, height = 40, alt = '' }: WeatherIconProps) {
  const iconData = weatherIconData[condition] || weatherIconData['cloudy'];

  return (
    <IconContainer style={{ width, height, borderRadius: width / 2, backgroundColor: iconData.color }}>
      <IconText>{iconData.emoji}</IconText>
    </IconContainer>
  );
}

/**
 * Helper function to map API weather condition strings to our icon types
 */
export function mapConditionToIcon(condition: string): WeatherCondition {
  const lowerCondition = condition.toLowerCase();

  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    const isNight = new Date().getHours() > 18 || new Date().getHours() < 6;
    return isNight ? 'clear-night' : 'clear-day';
  }

  if (lowerCondition.includes('partly cloudy') || lowerCondition.includes('scattered clouds')) {
    const isNight = new Date().getHours() > 18 || new Date().getHours() < 6;
    return isNight ? 'partly-cloudy-night' : 'partly-cloudy-day';
  }

  if (lowerCondition.includes('cloud')) return 'cloudy';
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) return 'rain';
  if (lowerCondition.includes('thunder') || lowerCondition.includes('lightning')) return 'thunderstorm';
  if (lowerCondition.includes('snow') || lowerCondition.includes('sleet')) return 'snow';
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist') || lowerCondition.includes('haze')) return 'fog';
  if (lowerCondition.includes('wind')) return 'wind';
  if (lowerCondition.includes('hail')) return 'hail';

  // Default to cloudy if no match
  return 'cloudy';
}
