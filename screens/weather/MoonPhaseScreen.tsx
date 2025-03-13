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

export function MoonPhaseScreen({ navigation }: MoonPhaseScreenProps) {
  const { t } = useTranslation();
  const favorableDays = getNextFavorableFishingDays();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <Stack space="$4" padding="$4">
          <H2>{t('moonPhase.screenTitle')}</H2>
          
          <Paragraph>
            {t('moonPhase.description')}
          </Paragraph>
          
          {/* Moon Phase Calendar */}
          <MoonPhaseCalendar days={14} />
          
          {/* Educational Information Card */}
          <Card>
            <Card.Header padded>
              <SizableText fontWeight="bold">
                {t('moonPhase.howItAffectsFishing')}
              </SizableText>
            </Card.Header>
            <Card.Footer padded>
              <Stack space="$2">
                <Paragraph>
                  {t('moonPhase.educationalInfo1')}
                </Paragraph>
                <Paragraph>
                  {t('moonPhase.educationalInfo2')}
                </Paragraph>
                <Stack space="$2" marginTop="$2" flexDirection="row">
                  <Button 
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
                  </Button>
                </Stack>
              </Stack>
            </Card.Footer>
          </Card>
          
          {/* Next Favorable Fishing Days Summary */}
          <Card>
            <Card.Header padded>
              <SizableText fontWeight="bold">
                {t('moonPhase.nextFavorableDays')}
              </SizableText>
            </Card.Header>
            <Card.Footer padded>
              <Stack space="$2">
                {favorableDays.map((day, index) => {
                  const isLastItem = index === favorableDays.length - 1;
                  return (
                    <Stack 
                      key={`day-${index}`}
                      flexDirection="row"
                      justifyContent="space-between" 
                      alignItems="center"
                      paddingVertical="$2"
                      borderBottomWidth={isLastItem ? 0 : 1}
                      borderBottomColor="$borderColor"
                    >
                      <SizableText>
                        {day.date.toLocaleDateString(undefined, { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </SizableText>
                      <SizableText color="$green9">
                        {t('moonPhase.favorable')}
                      </SizableText>
                    </Stack>
                  );
                })}
              </Stack>
            </Card.Footer>
          </Card>
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
