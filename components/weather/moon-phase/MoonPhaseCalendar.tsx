import React, { useEffect, useState } from 'react';
import { styled } from 'tamagui';
import { XStack, YStack, Text, Card, Image, H3, H4, Paragraph, ScrollView } from 'tamagui';
import { MoonPhase, MoonPhaseData, getMoonPhaseCalendar, translateMoonPhaseToSwahili } from '../../../services/moon/moonPhaseService';
import { useTranslation } from 'react-i18next';

// Moon cycle constant - same as in moonPhaseService.ts
const LUNAR_MONTH = 29.53059; // Days in a lunar month

// Import all moon phase images statically to avoid bundling issues
// New moon images
const newMoon0 = require('../../../assets/moon-phases/new-moon-0%.png');
const newMoon1 = require('../../../assets/moon-phases/new-moon-1%.png');

// Waxing crescent images
const waxingCrescent6 = require('../../../assets/moon-phases/waxing-crescent-6%.png');
const waxingCrescent13 = require('../../../assets/moon-phases/waxing-crescent-13%.png');
const waxingCrescent22 = require('../../../assets/moon-phases/waxing-crescent-22%.png');
const waxingCrescent33 = require('../../../assets/moon-phases/waxing-crescent-33%.png');

// First quarter images
const firstQuarter40 = require('../../../assets/moon-phases/first-quarter-40%.png');
const firstQuarter54 = require('../../../assets/moon-phases/first-quarter-54%.png');

// Waxing gibbous images
const waxingGibbous65 = require('../../../assets/moon-phases/waxing-gibbous-65%.png');
const waxingGibbous74 = require('../../../assets/moon-phases/waxing-gibbous-74%.png');
const waxingGibbous82 = require('../../../assets/moon-phases/waxing-gibbous-82%.png');
const waxingGibbous89 = require('../../../assets/moon-phases/waxing-gibbous-89%.png');
const waxingGibbous94 = require('../../../assets/moon-phases/waxing-gibbous-94%.png');
const waxingGibbous98 = require('../../../assets/moon-phases/waxing-gibbous-98%.png');

// Full moon images
const fullMoon99 = require('../../../assets/moon-phases/full-moon-99%.png');
const fullMoon100 = require('../../../assets/moon-phases/full-moon-100%.png');

// Waning gibbous images
const waningGibbous98 = require('../../../assets/moon-phases/waning-gibbous-98%.png');
const waningGibbous94 = require('../../../assets/moon-phases/waning-gibbous-94%.png');
const waningGibbous89 = require('../../../assets/moon-phases/waning-gibbous-89%.png');
const waningGibbous83 = require('../../../assets/moon-phases/waning-gibbous-83%.png');
const waningGibbous75 = require('../../../assets/moon-phases/waning-gibbous-75%.png');
const waningGibbous66 = require('../../../assets/moon-phases/waning-gibbous-66%.png');

// Third quarter images
const thirdQuarter56 = require('../../../assets/moon-phases/third-quarter-56%.png');
const thirdQuarter46 = require('../../../assets/moon-phases/third-quarter-46%.png');

// Waning crescent images
const waningCrescent35 = require('../../../assets/moon-phases/waning-crescent-35%.png');
const waningCrescent25 = require('../../../assets/moon-phases/waning-crescent-25%.png');
const waningCrescent16 = require('../../../assets/moon-phases/waning-crescent-16%.png');
const waningCrescent8 = require('../../../assets/moon-phases/waning-crescent-8%.png');
const waningCrescent3 = require('../../../assets/moon-phases/waning-crescent-3%.png');

// Type aliases for Tamagui components
const X: any = XStack;
const Y: any = YStack;
const T: any = Text;
const C: any = Card;
const I: any = Image;
const H3C: any = H3;
const H4C: any = H4;
const P: any = Paragraph;
const S: any = ScrollView;

interface MoonPhaseCalendarProps {
  days?: number;
  onDaySelected?: (day: MoonPhaseData) => void;
  isCompact?: boolean;
  children?: React.ReactNode;
}

// Create styled components for consistent styling
const LoadingContainer = styled(YStack, {
  padding: '$4',
  alignItems: 'center',
  justifyContent: 'center',
});

const CompactContainer = styled(YStack, {
  padding: '$2',
  alignItems: 'center',
});

const CalendarTitle = styled(H3, {
  paddingHorizontal: '$4',
  paddingTop: '$4',
});

const CalendarStrip = styled(XStack, {
  paddingVertical: '$2',
  paddingHorizontal: '$2',
  space: '$2',
});

const DayCardContent = styled(YStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$2',
});

const DayText = styled(Text, {
  fontSize: 12,
  textAlign: 'center',
});

const PhaseText = styled(Text, {
  fontSize: 10,
  textAlign: 'center',
});

const DetailsCard = styled(Card, {
  margin: '$4',
  marginTop: '$2',
  padding: '$4',
});

const DetailsHeader = styled(XStack, {
  space: '$4',
  alignItems: 'center',
});

const DetailsContent = styled(YStack, {
  flex: 1,
});

const InfoSection = styled(YStack, {
  marginTop: '$4',
});

const StatsSection = styled(YStack, {
  marginTop: '$4',
  space: '$2',
});

/**
 * Function to get the appropriate moon phase image based on the moon phase data
 * This uses the new percentage-based moon phase images
 */
const getMoonPhaseImage = (moonPhaseData: MoonPhaseData) => {
  // Get the image based on the imageFile property
  if (moonPhaseData.imageFile) {
    switch (moonPhaseData.imageFile) {
      // New moon
      case 'new-moon-0%': return newMoon0;
      case 'new-moon-1%': return newMoon1;

      // Waxing crescent
      case 'waxing-crescent-6%': return waxingCrescent6;
      case 'waxing-crescent-13%': return waxingCrescent13;
      case 'waxing-crescent-22%': return waxingCrescent22;
      case 'waxing-crescent-33%': return waxingCrescent33;

      // First quarter
      case 'first-quarter-40%': return firstQuarter40;
      case 'first-quarter-54%': return firstQuarter54;

      // Waxing gibbous
      case 'waxing-gibbous-65%': return waxingGibbous65;
      case 'waxing-gibbous-74%': return waxingGibbous74;
      case 'waxing-gibbous-82%': return waxingGibbous82;
      case 'waxing-gibbous-89%': return waxingGibbous89;
      case 'waxing-gibbous-94%': return waxingGibbous94;
      case 'waxing-gibbous-98%': return waxingGibbous98;

      // Full moon
      case 'full-moon-99%': return fullMoon99;
      case 'full-moon-100%': return fullMoon100;

      // Waning gibbous
      case 'waning-gibbous-98%': return waningGibbous98;
      case 'waning-gibbous-94%': return waningGibbous94;
      case 'waning-gibbous-89%': return waningGibbous89;
      case 'waning-gibbous-83%': return waningGibbous83;
      case 'waning-gibbous-75%': return waningGibbous75;
      case 'waning-gibbous-66%': return waningGibbous66;

      // Third quarter
      case 'third-quarter-56%': return thirdQuarter56;
      case 'third-quarter-46%': return thirdQuarter46;

      // Waning crescent
      case 'waning-crescent-35%': return waningCrescent35;
      case 'waning-crescent-25%': return waningCrescent25;
      case 'waning-crescent-16%': return waningCrescent16;
      case 'waning-crescent-8%': return waningCrescent8;
      case 'waning-crescent-3%': return waningCrescent3;
    }
  }

  // Fallback to basic phase images if needed
  switch (moonPhaseData.phase) {
    case MoonPhase.NEW_MOON: return newMoon0;
    case MoonPhase.WAXING_CRESCENT: return waxingCrescent22;
    case MoonPhase.FIRST_QUARTER: return firstQuarter54;
    case MoonPhase.WAXING_GIBBOUS: return waxingGibbous82;
    case MoonPhase.FULL_MOON: return fullMoon100;
    case MoonPhase.WANING_GIBBOUS: return waningGibbous83;
    case MoonPhase.LAST_QUARTER: return thirdQuarter56;
    case MoonPhase.WANING_CRESCENT: return waningCrescent25;
    default: return newMoon0;
  }
};

const formatDate = (date: Date, locale: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    weekday: 'short'
  };
  return date.toLocaleDateString(locale, options);
};

export function MoonPhaseCalendar({
  days = 7,
  onDaySelected,
  isCompact = false,
  children,
}: MoonPhaseCalendarProps) {
  const [moonPhases, setMoonPhases] = useState<MoonPhaseData[]>([]);
  const [selectedDay, setSelectedDay] = useState<MoonPhaseData | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Get moon phases for the next specified days
    const phases = getMoonPhaseCalendar(new Date(), days);
    setMoonPhases(phases);

    // Set today as the default selected day
    setSelectedDay(phases[0]);
  }, [days]);

  const handleDayPress = (day: MoonPhaseData) => {
    setSelectedDay(day);
    if (onDaySelected) {
      onDaySelected(day);
    }
  };

  // Display loading state if data isn't ready
  if (moonPhases.length === 0) {
    return (
      <LoadingContainer>
        <T>{t('loading')}</T>
      </LoadingContainer>
    );
  }

  // Render compact version (for dashboard widgets, etc.)
  if (isCompact) {
    return (
      <C>
        <C.Header>
          <H4C>{t('moonPhase.title')}</H4C>
        </C.Header>
        <CompactContainer>
          <I
            source={getMoonPhaseImage(moonPhases[0])}
            width={50}
            height={50}
            alt={t(`moonPhase.phases.${moonPhases[0].phase}`)}
          />
          <T marginTop="$1">
            {i18n.language === 'sw'
              ? translateMoonPhaseToSwahili(moonPhases[0].phase)
              : t(`moonPhase.phases.${moonPhases[0].phase}`)}
          </T>
          <T fontSize={12} color="$gray10">
            {Math.round(moonPhases[0].illumination * 100)}%
          </T>
          <T
            marginTop="$1"
            fontWeight="bold"
            color={moonPhases[0].isFishingFavorable ? "$green9" : "$yellow9"}
          >
            {moonPhases[0].isFishingFavorable
              ? t('moonPhase.favorable')
              : t('moonPhase.unfavorable')}
          </T>
          {children}
        </CompactContainer>
      </C>
    );
  }

  // Full calendar view
  return (
    <Y>
      <CalendarTitle>{t('moonPhase.title')}</CalendarTitle>

      {/* Calendar strip */}
      <S
        horizontal
        showsHorizontalScrollIndicator={false}
        contentInset={{ left: 8, right: 8 }}
      >
        <CalendarStrip space="$2">
          {moonPhases.map((day, index) => (
            <C
              key={String(index)}
              pressStyle={{ scale: 0.98 }}
              onPress={() => handleDayPress(day)}
              width={80}
              height={110}
              backgroundColor={day.isFishingFavorable ? "$green2" : "$background"}
              borderWidth={selectedDay?.date.toDateString() === day.date.toDateString() ? 1 : 0}
            >
              <DayCardContent>
                <DayText>
                  {formatDate(day.date, i18n.language === 'sw' ? 'sw-KE' : 'en-US')}
                </DayText>
                <I
                  source={getMoonPhaseImage(day)}
                  width={40}
                  height={40}
                  marginVertical="$1"
                  alt={t(`moonPhase.phases.${day.phase}`)}
                />
                <PhaseText numberOfLines={1}>
                  {i18n.language === 'sw'
                    ? translateMoonPhaseToSwahili(day.phase).split(' ')[0]
                    : t(`moonPhase.phases.${day.phase}`).split(' ')[0]}
                </PhaseText>
                <PhaseText fontSize={9} color="$gray10">
                  {Math.round(day.illumination * 100)}%
                </PhaseText>
              </DayCardContent>
            </C>
          ))}
        </CalendarStrip>
      </S>

      {/* Selected day details */}
      {selectedDay && (
        <DetailsCard>
          <DetailsHeader>
            <I
              source={getMoonPhaseImage(selectedDay)}
              width={80}
              height={80}
              alt={t(`moonPhase.phases.${selectedDay.phase}`)}
            />
            <DetailsContent>
              <H4C>
                {i18n.language === 'sw'
                  ? translateMoonPhaseToSwahili(selectedDay.phase)
                  : t(`moonPhase.phases.${selectedDay.phase}`)}
                <T fontSize={14} color="$gray10"> ({Math.round(selectedDay.illumination * 100)}%)</T>
              </H4C>
              <T marginTop="$1">
                {formatDate(selectedDay.date, i18n.language === 'sw' ? 'sw-KE' : 'en-US')}
              </T>
              <T
                marginTop="$1"
                fontWeight="bold"
                color={selectedDay.isFishingFavorable ? "$green9" : "$yellow9"}
              >
                {selectedDay.isFishingFavorable
                  ? t('moonPhase.favorable')
                  : t('moonPhase.unfavorable')}
              </T>
            </DetailsContent>
          </DetailsHeader>

          <InfoSection>
            <T fontWeight="bold">{`${t('moonPhase.recommendation')}:`}</T>
            <P marginTop="$1">{selectedDay.fishingRecommendation}</P>
          </InfoSection>

          <StatsSection>
            <YStack space="$2">
              <XStack space="$2">
                <T fontWeight="bold">{`${t('moonPhase.illumination')}:`}</T>
                <T>{`${Math.round(selectedDay.illumination * 100)}%`}</T>
              </XStack>

              <XStack space="$2">
                <T fontWeight="bold">{`${t('moonPhase.moonAge')}:`}</T>
                <T>{`${Math.round(selectedDay.age * 10) / 10} ${t('moonPhase.days')} (${Math.round(selectedDay.age / LUNAR_MONTH * 100)}% ${t('moonPhase.ofCycle')})`}</T>
              </XStack>

              <XStack space="$2">
                <T fontWeight="bold">{`${t('moonPhase.distance')}:`}</T>
                <T>{`${selectedDay.distance.toLocaleString()} km`}</T>
              </XStack>

              {selectedDay.imageFile && (
                <XStack space="$2" marginTop="$1">
                  <T fontSize={11} color="$gray10" fontWeight="bold">{`${t('moonPhase.imageUsed')}:`}</T>
                  <T fontSize={11} color="$gray10">{selectedDay.imageFile}</T>
                </XStack>
              )}
            </YStack>
          </StatsSection>
          {children}
        </DetailsCard>
      )}
      {children}
    </Y>
  );
}

