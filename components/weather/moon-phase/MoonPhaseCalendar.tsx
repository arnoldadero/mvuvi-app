import React, { useEffect, useState } from 'react';
import { styled } from 'tamagui';
import { XStack, YStack, Text, Card, Image, H3, H4, Paragraph, ScrollView } from 'tamagui';
import { MoonPhase, MoonPhaseData, getMoonPhaseCalendar, translateMoonPhaseToSwahili } from '../../../services/moon/moonPhaseService';
import { useTranslation } from 'react-i18next';

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
 * Moon phase icons mapping
 * In a production app, we would use actual moon phase images
 */
const moonPhaseIcons: Record<MoonPhase, any> = {
  [MoonPhase.NEW_MOON]: require('../../../assets/moon-phases/new-moon.png'),
  [MoonPhase.WAXING_CRESCENT]: require('../../../assets/moon-phases/waxing-crescent.png'),
  [MoonPhase.FIRST_QUARTER]: require('../../../assets/moon-phases/first-quarter.png'),
  [MoonPhase.WAXING_GIBBOUS]: require('../../../assets/moon-phases/waxing-gibbous.png'),
  [MoonPhase.FULL_MOON]: require('../../../assets/moon-phases/full-moon.png'),
  [MoonPhase.WANING_GIBBOUS]: require('../../../assets/moon-phases/waning-gibbous.png'),
  [MoonPhase.LAST_QUARTER]: require('../../../assets/moon-phases/last-quarter.png'),
  [MoonPhase.WANING_CRESCENT]: require('../../../assets/moon-phases/waning-crescent.png'),
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
            source={moonPhaseIcons[moonPhases[0].phase]}
            width={50}
            height={50}
            alt={t(`moonPhase.phases.${moonPhases[0].phase}`)}
          />
          <T marginTop="$1">
            {i18n.language === 'sw'
              ? translateMoonPhaseToSwahili(moonPhases[0].phase)
              : t(`moonPhase.phases.${moonPhases[0].phase}`)}
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
                  source={moonPhaseIcons[day.phase]}
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
              source={moonPhaseIcons[selectedDay.phase]}
              width={80}
              height={80}
              alt={t(`moonPhase.phases.${selectedDay.phase}`)}
            />
            <DetailsContent>
              <H4C>
                {i18n.language === 'sw'
                  ? translateMoonPhaseToSwahili(selectedDay.phase)
                  : t(`moonPhase.phases.${selectedDay.phase}`)}
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
            <T>{`${t('moonPhase.illumination')}: ${Math.round(selectedDay.illumination * 100)}%`}</T>
            <T>{`${t('moonPhase.moonAge')}: ${Math.round(selectedDay.age * 10) / 10} ${t('moonPhase.days')}`}</T>
          </StatsSection>
          {children}
        </DetailsCard>
      )}
      {children}
    </Y>
  );
}
