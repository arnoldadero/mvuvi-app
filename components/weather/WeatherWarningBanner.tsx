import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

interface WeatherWarning {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface WeatherWarningBannerProps {
  warnings: WeatherWarning[];
}

const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;

/**
 * Get background color based on warning severity
 */
function getSeverityColor(severity: 'low' | 'medium' | 'high'): string {
  switch (severity) {
    case 'high':
      return '$red2';
    case 'medium':
      return '$orange2';
    case 'low':
    default:
      return '$yellow2';
  }
}

/**
 * Get text color based on warning severity
 */
function getSeverityTextColor(severity: 'low' | 'medium' | 'high'): string {
  switch (severity) {
    case 'high':
      return '$red9';
    case 'medium':
      return '$orange9';
    case 'low':
    default:
      return '$yellow9';
  }
}

/**
 * Component for displaying weather warnings and alerts
 */
export function WeatherWarningBanner({ warnings }: WeatherWarningBannerProps) {
  const { t } = useTranslation();

  if (!warnings || warnings.length === 0) {
    return null;
  }

  const handleWarningPress = (warning: WeatherWarning) => {
    Alert.alert(warning.title, warning.description);
  };

  return (
    <Y space="$2">
      {warnings.map((warning, index) => (
        <C
          key={index}
          backgroundColor={getSeverityColor(warning.severity)}
          padding="$3"
          borderRadius="$4"
          pressStyle={{ scale: 0.98 }}
          onPress={() => handleWarningPress(warning)}
        >
          <X alignItems="center" space="$2">
            <T fontWeight="bold" color={getSeverityTextColor(warning.severity)}>
              {warning.title}
            </T>
          </X>
          <T color={getSeverityTextColor(warning.severity)} numberOfLines={2}>
            {warning.description}
          </T>
          <T fontSize="$2" marginTop="$1" color={getSeverityTextColor(warning.severity)}>
            {t('common.tapForMore')}
          </T>
        </C>
      ))}
    </Y>
  );
}
