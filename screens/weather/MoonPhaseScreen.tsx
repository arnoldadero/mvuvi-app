import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
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
  Stack
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { MoonPhaseCalendar } from '../../components/weather/moon-phase/MoonPhaseCalendar';
import { getNextFavorableFishingDays } from '../../services/moon/moonPhaseService';

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Sc>
        <Y space="$4" padding="$4">
          <H>{t('moonPhase.screenTitle')}</H>

          <P>{t('moonPhase.description')}</P>

          {/* Moon Phase Calendar */}
          <MoonPhaseCalendar days={14} />

          {/* Educational Information Card */}
          <C>
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
          <C>
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
        </Y>
      </Sc>
    </SafeAreaView>
  );
}
