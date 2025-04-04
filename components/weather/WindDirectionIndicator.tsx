import React from 'react';
import { View } from 'react-native';
import { styled } from 'tamagui';
import { Text } from 'tamagui';

interface WindDirectionIndicatorProps {
  direction: string;
  size?: number;
  color?: string;
}

// Styled components
const Container = styled(View, {
  alignItems: 'center',
  justifyContent: 'center',
});

const Arrow = styled(View, {
  width: 0,
  height: 0,
  borderStyle: 'solid',
  position: 'absolute',
});

const DirectionText = styled(Text, {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 5,
});

/**
 * Converts cardinal direction to degrees
 */
function directionToDegrees(direction: string): number {
  const directions: Record<string, number> = {
    'N': 0,
    'NNE': 22.5,
    'NE': 45,
    'ENE': 67.5,
    'E': 90,
    'ESE': 112.5,
    'SE': 135,
    'SSE': 157.5,
    'S': 180,
    'SSW': 202.5,
    'SW': 225,
    'WSW': 247.5,
    'W': 270,
    'WNW': 292.5,
    'NW': 315,
    'NNW': 337.5,
  };

  return directions[direction.toUpperCase()] || 0;
}

/**
 * Wind direction indicator component
 * Displays an arrow pointing in the direction the wind is coming from
 */
export function WindDirectionIndicator({ direction, size = 40, color = '#2089dc' }: WindDirectionIndicatorProps) {
  // Convert direction to degrees
  const degrees = directionToDegrees(direction);
  
  // Calculate arrow dimensions
  const arrowWidth = size * 0.3;
  const arrowHeight = size * 0.5;
  
  return (
    <Container style={{ width: size, height: size }}>
      <Arrow
        style={{
          borderLeftWidth: arrowWidth / 2,
          borderRightWidth: arrowWidth / 2,
          borderBottomWidth: arrowHeight,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ rotate: `${degrees}deg` }],
        }}
      />
      <DirectionText>{direction}</DirectionText>
    </Container>
  );
}
