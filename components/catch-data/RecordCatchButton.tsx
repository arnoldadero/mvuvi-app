import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { LocationCoordinates } from '../../services/location/locationService';

interface RecordCatchButtonProps {
  onPress: (coordinates?: LocationCoordinates) => void;
  coordinates?: LocationCoordinates;
  label?: string;
  size?: '$3' | '$4' | '$5';
  color?: string;
}

export function RecordCatchButton({
  onPress,
  coordinates,
  label,
  size = '$4',
  color = 'white',
}: RecordCatchButtonProps) {
  const { t } = useTranslation();

  const handlePress = () => {
    onPress(coordinates);
  };

  return (
    <Button
      size={size}
      backgroundColor="$green9"
      color={color}
      onPress={handlePress}
    >
      {label || t('catch.recordCatch')}
    </Button>
  );
}
