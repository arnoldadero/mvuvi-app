import React, { useEffect, useState } from 'react';
import { styled } from 'tamagui';
import { XStack, YStack, Text, Card, Image, H3, H4, Paragraph, ScrollView } from 'tamagui';
import { MoonPhase, MoonPhaseData, getMoonPhaseCalendar, translateMoonPhaseToSwahili } from '../../../services/moon/moonPhaseService';
import { useTranslation } from 'react-i18next';

// Moon cycle constant - same as in moonPhaseService.ts
const LUNAR_MONTH = 29.53059; // Days in a lunar month

// Import all moon phase images statically to avoid bundling issues
// Create a mapping of image names to their require statements
const moonPhaseImages = {
  // New moon images
  'new-moon-day-0': require('../../../assets/moon-phases/new_moon_day_0.png'),
  'new-moon-day-1': require('../../../assets/moon-phases/new_moon_day_1.png'),

  // Waxing crescent images
  'waxing-crescent-day-2': require('../../../assets/moon-phases/waxing_crescent_day_2.png'),
  'waxing-crescent-day-4': require('../../../assets/moon-phases/waxing_crescent_day_4.png'),
  'waxing-crescent-day-5': require('../../../assets/moon-phases/waxing_crescent_day_5.png'),
  'waxing-crescent-day-6': require('../../../assets/moon-phases/waxing_crescent_day_6.png'),

  // First quarter images
  'first-quarter-day-7': require('../../../assets/moon-phases/first_quarter_day_7.png'),
  'first-quarter-day-8': require('../../../assets/moon-phases/first_quarter_day_8.png'),

  // Waxing gibbous images
  'waxing-gibbous-day-10': require('../../../assets/moon-phases/waxing_gibbous_day_10.png'),
  'waxing-gibbous-day-11': require('../../../assets/moon-phases/waxing_gibbous_day_11.png'),
  'waxing-gibbous-day-12': require('../../../assets/moon-phases/waxing_gibbous_day_12.png'),
  'waxing-gibbous-day-13': require('../../../assets/moon-phases/waxing_gibbous_day_13.png'),
  'waxing-gibbous-day-14': require('../../../assets/moon-phases/waxing_gibbous_day_14.png'),
  'waxing-gibbous-day-14.5': require('../../../assets/moon-phases/waxing_gibbous_day_14_5.png'),

  // Full moon images
  'full-moon-day-15': require('../../../assets/moon-phases/full_moon_day_15.png'),
  'full-moon-day-15.5': require('../../../assets/moon-phases/full_moon_day_15_5.png'),

  // Waning gibbous images
  'waning-gibbous-day-16': require('../../../assets/moon-phases/waning_gibbous_day_16.png'),
  'waning-gibbous-day-17': require('../../../assets/moon-phases/waning_gibbous_day_17.png'),
  'waning-gibbous-day-18': require('../../../assets/moon-phases/waning_gibbous_day_18.png'),
  'waning-gibbous-day-19': require('../../../assets/moon-phases/waning_gibbous_day_19.png'),
  'waning-gibbous-day-20': require('../../../assets/moon-phases/waning_gibbous_day_20.png'),
  'waning-gibbous-day-21': require('../../../assets/moon-phases/waning_gibbous_day_21.png'),

  // Last quarter images
  'last-quarter-day-22': require('../../../assets/moon-phases/last_quarter_day_22.png'),
  'last-quarter-day-23': require('../../../assets/moon-phases/last_quarter_day_23.png'),

  // Waning crescent images
  'waning-crescent-day-24': require('../../../assets/moon-phases/waning_crescent_day_24.png'),
  'waning-crescent-day-25': require('../../../assets/moon-phases/waning_crescent_day_25.png'),
  'waning-crescent-day-26': require('../../../assets/moon-phases/waning_crescent_day_26.png'),
  'waning-crescent-day-27': require('../../../assets/moon-phases/waning_crescent_day_27.png'),
  'waning-crescent-day-28': require('../../../assets/moon-phases/waning_crescent_day_28.png'),

  // Legacy percentage-based filenames for backward compatibility
  'new-moon-0%': require('../../../assets/moon-phases/new_moon_day_0.png'),
  'new-moon-1%': require('../../../assets/moon-phases/new_moon_day_1.png'),
  'waxing-crescent-6%': require('../../../assets/moon-phases/waxing_crescent_day_2.png'),
  'waxing-crescent-13%': require('../../../assets/moon-phases/waxing_crescent_day_4.png'),
  'waxing-crescent-22%': require('../../../assets/moon-phases/waxing_crescent_day_5.png'),
  'waxing-crescent-33%': require('../../../assets/moon-phases/waxing_crescent_day_6.png'),
  'first-quarter-40%': require('../../../assets/moon-phases/first_quarter_day_7.png'),
  'first-quarter-54%': require('../../../assets/moon-phases/first_quarter_day_8.png'),
  'waxing-gibbous-65%': require('../../../assets/moon-phases/waxing_gibbous_day_10.png'),
  'waxing-gibbous-74%': require('../../../assets/moon-phases/waxing_gibbous_day_11.png'),
  'waxing-gibbous-82%': require('../../../assets/moon-phases/waxing_gibbous_day_12.png'),
  'waxing-gibbous-89%': require('../../../assets/moon-phases/waxing_gibbous_day_13.png'),
  'waxing-gibbous-94%': require('../../../assets/moon-phases/waxing_gibbous_day_14.png'),
  'waxing-gibbous-98%': require('../../../assets/moon-phases/waxing_gibbous_day_14_5.png'),
  'full-moon-99%': require('../../../assets/moon-phases/full_moon_day_15.png'),
  'full-moon-100%': require('../../../assets/moon-phases/full_moon_day_15_5.png'),
  'waning-gibbous-98%': require('../../../assets/moon-phases/waning_gibbous_day_16.png'),
  'waning-gibbous-94%': require('../../../assets/moon-phases/waning_gibbous_day_17.png'),
  'waning-gibbous-89%': require('../../../assets/moon-phases/waning_gibbous_day_18.png'),
  'waning-gibbous-83%': require('../../../assets/moon-phases/waning_gibbous_day_19.png'),
  'waning-gibbous-75%': require('../../../assets/moon-phases/waning_gibbous_day_20.png'),
  'waning-gibbous-66%': require('../../../assets/moon-phases/waning_gibbous_day_21.png'),
  'third-quarter-56%': require('../../../assets/moon-phases/last_quarter_day_22.png'),
  'third-quarter-46%': require('../../../assets/moon-phases/last_quarter_day_23.png'),
  'waning-crescent-35%': require('../../../assets/moon-phases/waning_crescent_day_24.png'),
  'waning-crescent-25%': require('../../../assets/moon-phases/waning_crescent_day_25.png'),
  'waning-crescent-16%': require('../../../assets/moon-phases/waning_crescent_day_26.png'),
  'waning-crescent-8%': require('../../../assets/moon-phases/waning_crescent_day_27.png'),
  'waning-crescent-3%': require('../../../assets/moon-phases/waning_crescent_day_28.png')
};

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
 * This uses the new day-based moon phase images
 */
const getMoonPhaseImage = (moonPhaseData: MoonPhaseData) => {
  // Get the image based on the imageFile property
  if (moonPhaseData.imageFile && moonPhaseImages[moonPhaseData.imageFile]) {
    return moonPhaseImages[moonPhaseData.imageFile];
  }

  // Fallback to basic phase images if needed
  switch (moonPhaseData.phase) {
    case MoonPhase.NEW_MOON: return moonPhaseImages['new-moon-day-0'];
    case MoonPhase.WAXING_CRESCENT: return moonPhaseImages['waxing-crescent-day-4'];
    case MoonPhase.FIRST_QUARTER: return moonPhaseImages['first-quarter-day-7'];
    case MoonPhase.WAXING_GIBBOUS: return moonPhaseImages['waxing-gibbous-day-12'];
    case MoonPhase.FULL_MOON: return moonPhaseImages['full-moon-day-15'];
    case MoonPhase.WANING_GIBBOUS: return moonPhaseImages['waning-gibbous-day-19'];
    case MoonPhase.LAST_QUARTER: return moonPhaseImages['last-quarter-day-22'];
    case MoonPhase.WANING_CRESCENT: return moonPhaseImages['waning-crescent-day-26'];
    default: return moonPhaseImages['new-moon-day-0'];
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
            {t('moonPhase.age')}: {Math.round(moonPhases[0].age)} {t('moonPhase.days')}
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

      {/* Legend for Omena/Dagaa fishing */}
      <XStack marginBottom="$2" alignItems="center" justifyContent="center">
        <XStack alignItems="center" marginRight="$4">
          <YStack width={12} height={12} backgroundColor="$green2" marginRight="$1" />
          <T fontSize={10}>{t('moonPhase.favorable')}</T>
        </XStack>
        <XStack alignItems="center">
          <YStack width={12} height={12} borderWidth={1} borderColor="$blue9" borderStyle="dashed" marginRight="$1" />
          <T fontSize={10}>{t('moonPhase.omenaDagaaTitle')}</T>
        </XStack>
      </XStack>

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
              // Add a special border for days that are good for Omena/Dagaa fishing
              borderColor={day.omenaDagaaRecommendation?.includes("Excellent") ? "$blue9" : undefined}
              borderStyle={day.omenaDagaaRecommendation?.includes("Excellent") ? "dashed" : undefined}
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
                  {t('moonPhase.day')} {Math.round(day.age)}
                </PhaseText>
                {/* Omena/Dagaa indicator */}
                {day.omenaDagaaRecommendation?.includes("Excellent") && (
                  <PhaseText fontSize={8} color="$blue9" fontWeight="bold" marginTop="$1">
                    ✓ Omena/Dagaa
                  </PhaseText>
                )}
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
                <T fontSize={14} color="$gray10"> ({t('moonPhase.day')} {Math.round(selectedDay.age)})</T>
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

            {/* Omena/Dagaa specific recommendations */}
            {selectedDay.omenaDagaaRecommendation && (
              <YStack marginTop="$2">
                <T fontWeight="bold">{`${t('moonPhase.omenaDagaaTitle')}:`}</T>
                <P marginTop="$1">{selectedDay.omenaDagaaRecommendation}</P>
              </YStack>
            )}
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

