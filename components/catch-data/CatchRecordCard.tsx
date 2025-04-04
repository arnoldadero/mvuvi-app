import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, YStack, XStack, Text, Paragraph } from 'tamagui';
import { format } from 'date-fns';
import { CatchRecord } from '../../services/catch-data/catchDataStore';
import { MoonPhaseIndicator } from './MoonPhaseIndicator';
import { MapPin, Clock, Scale } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';

interface CatchRecordCardProps {
  record: CatchRecord;
  onPress: (record: CatchRecord) => void;
  compact?: boolean;
}

// Type aliases for Tamagui components
const C = Card;
const Y = YStack;
const X = XStack;
const T = Text;
const P = Paragraph;

export function CatchRecordCard({ record, onPress, compact = false }: CatchRecordCardProps) {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  if (compact) {
    return (
      <TouchableOpacity onPress={() => onPress(record)}>
        <C marginBottom="$2" bordered padding="$3">
            <X justifyContent="space-between" alignItems="center">
              <T fontWeight="bold" fontSize="$4">{record.fishSpecies}</T>
              <T fontSize="$2" color="$gray10">{formatDate(record.date)}</T>
            </X>
            <X marginTop="$2" space="$2" alignItems="center">
              <Scale size={14} color="#666" />
              <T fontSize="$3">{record.quantity} {record.unit}</T>
            </X>
        </C>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => onPress(record)}>
      <C marginHorizontal="$4" marginBottom="$3" bordered padding="$3">
          <X justifyContent="space-between" alignItems="center">
            <Y>
              <T fontWeight="bold" fontSize="$5">{record.fishSpecies}</T>
              <P fontSize="$3" color="$gray11">{formatDate(record.date)}</P>
            </Y>
            <MoonPhaseIndicator date={new Date(record.date)} size={32} />
          </X>

          <X marginTop="$3" space="$4">
            <Y space="$1">
              <X space="$1" alignItems="center">
                <Scale size={14} color="#666" />
                <T fontSize="$2" color="$gray10">{t('catch.quantity')}</T>
              </X>
              <T fontSize="$4">{record.quantity} {record.unit}</T>
            </Y>

            <Y space="$1">
              <X space="$1" alignItems="center">
                <MapPin size={14} color="#666" />
                <T fontSize="$2" color="$gray10">{t('catch.location')}</T>
              </X>
              <T fontSize="$4">{record.location}</T>
            </Y>

            <Y space="$1">
              <X space="$1" alignItems="center">
                <Clock size={14} color="#666" />
                <T fontSize="$2" color="$gray10">{t('catch.effortHours')}</T>
              </X>
              <T fontSize="$4">{record.effortHours}</T>
            </Y>
          </X>
      </C>
    </TouchableOpacity>
  );
}
