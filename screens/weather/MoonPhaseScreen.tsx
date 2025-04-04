import React, { useState } from 'react';
import { SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import {
  ScrollView,
  YStack,
  H2,
  Text,
  Card,
  Button,
  XStack,
  Paragraph,
  SizableText,
  Stack,
  Separator
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { MoonPhaseCalendar } from '../../components/weather/moon-phase/MoonPhaseCalendar';
import { getNextFavorableFishingDays, MoonPhaseData } from '../../services/moon/moonPhaseService';

interface MoonPhaseScreenProps {
  navigation?: any; // For navigation if needed
}

const Y: any = YStack;
const X: any = XStack;
const H: any = H2;
const P: any = Paragraph;
const T: any = Text;
const S: any = SizableText;
const C: any = Card;
const B: any = Button;
const Sc: any = ScrollView;

export function MoonPhaseScreen({ navigation }: MoonPhaseScreenProps) {
  const { t } = useTranslation();
  const favorableDays = getNextFavorableFishingDays();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState<MoonPhaseData | null>(null);

  // Handle calendar day selection
  const handleDaySelected = (day: MoonPhaseData) => {
    setSelectedDay(day);
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, you might refetch data here
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Sc refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Y space="$4" padding="$4">
          <H>{t('moonPhase.screenTitle')}</H>

          <P>{t('moonPhase.description')}</P>

          {/* Moon Phase Calendar - using 30 days as mentioned in the assets */}
          <MoonPhaseCalendar days={30} onDaySelected={handleDaySelected} />

          {/* Selected Day Details Card - shown when a day is selected */}
          {selectedDay && (
            <C borderRadius="$4" marginTop="$2">
              <C.Header padded>
                <S fontWeight="bold">
                  {selectedDay.date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </S>
              </C.Header>
              <C.Footer padded>
                <Y space="$2">
                  <X justifyContent="space-between">
                    <T>{t('moonPhase.phase')}</T>
                    <T fontWeight="bold">{t(`moonPhase.phases.${selectedDay.phase}`)}</T>
                  </X>
                  <X justifyContent="space-between">
                    <T>{t('moonPhase.illumination')}</T>
                    <T>{Math.round(selectedDay.illumination * 100)}%</T>
                  </X>
                  <X justifyContent="space-between">
                    <T>{t('moonPhase.age')}</T>
                    <T>{Math.round(selectedDay.age)} {t('moonPhase.days')}</T>
                  </X>
                  <X justifyContent="space-between">
                    <T>{t('moonPhase.fishingConditions')}</T>
                    <T color={selectedDay.isFishingFavorable ? "$green9" : "$yellow9"} fontWeight="bold">
                      {selectedDay.isFishingFavorable ? t('moonPhase.favorable') : t('moonPhase.unfavorable')}
                    </T>
                  </X>
                  <P marginTop="$2">{selectedDay.fishingRecommendation}</P>

                  {/* Omena/Dagaa specific recommendations */}
                  {selectedDay.omenaDagaaRecommendation && (
                    <>
                      <Separator marginVertical="$2" />
                      <S fontWeight="bold" marginBottom="$1">{t('moonPhase.omenaDagaaTitle')}</S>
                      <P>{selectedDay.omenaDagaaRecommendation}</P>
                    </>
                  )}
                </Y>
              </C.Footer>
            </C>
          )}

          {/* Educational Information Card */}
          <C borderRadius="$4">
            <C.Header padded>
              <S fontWeight="bold">
                {t('moonPhase.howItAffectsFishing')}
              </S>
            </C.Header>
            <C.Footer padded>
              <Y space="$2">
                <P>{t('moonPhase.educationalInfo1')}</P>
                <P>{t('moonPhase.educationalInfo2')}</P>
                <X space="$2" marginTop="$2">
                  <B
                    flex={1}
                    variant="outlined"
                    onPress={() => {
                      // Navigate to detailed educational content
                      if (navigation) {
                        navigation.navigate('SustainableFishing');
                      }
                    }}
                  >
                    {t('common.learnMore')}
                  </B>
                </X>
              </Y>
            </C.Footer>
          </C>

          {/* Next Favorable Fishing Days Summary */}
          <C borderRadius="$4">
            <C.Header padded>
              <S fontWeight="bold">
                {t('moonPhase.nextFavorableDays')}
              </S>
            </C.Header>
            <C.Footer padded>
              <Y space="$2">
                {favorableDays.map((day, index) => {
                  const isLastItem = index === favorableDays.length - 1;
                  return (
                    <X
                      key={`day-${index}`}
                      justifyContent="space-between"
                      alignItems="center"
                      paddingVertical="$2"
                      borderBottomWidth={isLastItem ? 0 : 1}
                      borderBottomColor="$borderColor"
                      pressStyle={{ opacity: 0.8 }}
                      onPress={() => handleDaySelected(day)}
                    >
                      <S>
                        {day.date.toLocaleDateString(undefined, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </S>
                      <S color="$green9">
                        {t('moonPhase.favorable')}
                      </S>
                    </X>
                  );
                })}
              </Y>
            </C.Footer>
          </C>

          {/* Tips for Fishing Based on Moon Phase */}
          <C borderRadius="$4">
            <C.Header padded>
              <S fontWeight="bold">
                {t('moonPhase.fishingTips')}
              </S>
            </C.Header>
            <C.Footer padded>
              <Y space="$2">
                <P>{t('moonPhase.fishingTip1')}</P>
                <P>{t('moonPhase.fishingTip2')}</P>
                <P>{t('moonPhase.fishingTip3')}</P>
              </Y>
            </C.Footer>
          </C>

          {/* Omena/Dagaa Fishing Information Card */}
          <C borderRadius="$4">
            <C.Header padded>
              <S fontWeight="bold">
                {t('moonPhase.omenaDagaaTitle')}
              </S>
            </C.Header>
            <C.Footer padded>
              <Y space="$2">
                <P>{t('moonPhase.omenaDagaaInfo1')}</P>
                <P>{t('moonPhase.omenaDagaaInfo2')}</P>
                <P>{t('moonPhase.omenaDagaaInfo3')}</P>
                <X space="$2" marginTop="$2">
                  <B
                    flex={1}
                    variant="outlined"
                    onPress={() => {
                      // Navigate to detailed educational content about Omena/Dagaa fishing
                      if (navigation) {
                        navigation.navigate('SustainableFishing');
                      }
                    }}
                  >
                    {t('common.learnMore')}
                  </B>
                </X>
              </Y>
            </C.Footer>
          </C>
        </Y>
      </Sc>
    </SafeAreaView>
  );
}
