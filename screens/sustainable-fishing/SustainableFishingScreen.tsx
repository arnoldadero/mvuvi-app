import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Image, StyleSheet } from 'react-native';
import {
  YStack,
  H2,
  Text,
  Card,
  Button,
  XStack,
  Paragraph,
  ScrollView,
  Tabs,
  Stack
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Info, Fish, Calendar, Ruler, Book } from '@tamagui/lucide-icons';
import { LanguageSelector } from '../../components/common/LanguageSelector';

interface SustainableFishingScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;
const TB: any = Tabs;
const ST: any = Stack;

export function SustainableFishingScreen({ navigation }: SustainableFishingScreenProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const handleCategoryPress = (category: string) => {
    navigation.navigate('SustainableFishingCategory', { category });
  };

  const handleSpeciesGuidePress = () => {
    navigation.navigate('FishSpeciesGuide');
  };

  const handleRegulationsPress = () => {
    navigation.navigate('FishingRegulations');
  };

  const handleSeasonalCalendarPress = () => {
    navigation.navigate('FishingSeasonalCalendar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S>
        <Y padding="$4" gap="$4">
          <X justifyContent="space-between" alignItems="center">
            <H>{t('sustainableFishing.title')}</H>
            <LanguageSelector minimal />
          </X>
          <P>{t('sustainableFishing.description')}</P>

          <TB
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="horizontal"
            flexDirection="column"
            borderRadius="$4"
            borderWidth="$0.5"
            borderColor="$gray5"
            overflow="hidden"
          >
            <TB.List>
              <TB.Tab value="overview">
                <Info size={"$1" as any} color={"$color" as any} />
                <T>{t('sustainableFishing.overview')}</T>
              </TB.Tab>
              <TB.Tab value="practices">
                <Fish size={"$1" as any} color={"$color" as any} />
                <T>{t('sustainableFishing.practices')}</T>
              </TB.Tab>
              <TB.Tab value="resources">
                <Book size={"$1" as any} color={"$color" as any} />
                <T>{t('sustainableFishing.resources')}</T>
              </TB.Tab>
            </TB.List>

            <TB.Content value="overview">
              <Y padding="$4" gap="$4">
                <Image
                  source={require('../../assets/images/sustainable-fishing.png')}
                  style={styles.fullWidthImage}
                  resizeMode="cover"
                />

                <P>
                  {t('sustainableFishing.overviewContent')}
                </P>

                <C style={styles.blueCard}>
                  <Y padding="$4" gap="$2">
                    <T>{t('sustainableFishing.whySustainable')}</T>
                    <P size="$2">
                      {t('sustainableFishing.whySustainableContent')}
                    </P>
                  </Y>
                </C>

                <B
                  backgroundColor="$green9"
                  color="white"
                  onPress={() => setActiveTab('practices')}
                >
                  {t('sustainableFishing.exploreGuidelines')}
                </B>
              </Y>
            </TB.Content>

            <TB.Content value="practices">
              <Y padding="$4" gap="$4">
                <T size="$5">
                  {t('sustainableFishing.bestPractices')}
                </T>

                <Y gap="$3">
                  {/* Sustainable Fishing Categories */}
                  <C
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('gear')}
                  >
                    <X padding="$4" alignItems="center" gap="$3">
                      <Image
                        source={require('../../assets/images/fishing-gear.png')}
                        style={styles.categoryIcon}
                      />
                      <Y style={styles.flexOne}>
                        <T>{t('sustainableFishing.gearSelection')}</T>
                        <P size="$2">
                          {t('sustainableFishing.gearSelectionDescription')}
                        </P>
                      </Y>
                    </X>
                  </C>

                  <C
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('bycatch')}
                  >
                    <X padding="$4" alignItems="center" gap="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <Y style={styles.flexOne}>
                        <T>{t('sustainableFishing.bycatchReduction')}</T>
                        <P size="$2">
                          {t('sustainableFishing.bycatchReductionDescription')}
                        </P>
                      </Y>
                    </X>
                  </C>

                  <C
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('habitat')}
                  >
                    <X padding="$4" alignItems="center" gap="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <Y style={styles.flexOne}>
                        <T>{t('sustainableFishing.habitatProtection')}</T>
                        <P size="$2">
                          {t('sustainableFishing.habitatProtectionDescription')}
                        </P>
                      </Y>
                    </X>
                  </C>

                  <C
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('juvenile')}
                  >
                    <X padding="$4" alignItems="center" gap="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <Y style={styles.flexOne}>
                        <T>{t('sustainableFishing.juvenileProtection')}</T>
                        <P size="$2">
                          {t('sustainableFishing.juvenileProtectionDescription')}
                        </P>
                      </Y>
                    </X>
                  </C>
                </Y>

                <X gap="$2">
                  <B
                    style={styles.flexOne}
                    onPress={handleSeasonalCalendarPress}
                  >
                    <Calendar size={"$1" as any} color={"$color" as any} />
                    <T>{t('sustainableFishing.seasonalCalendar')}</T>
                  </B>

                  <B
                    style={styles.flexOne}
                    onPress={handleRegulationsPress}
                  >
                    <Ruler size={"$1" as any} color={"$color" as any} />
                    <T>{t('sustainableFishing.regulations')}</T>
                  </B>
                </X>
              </Y>
            </TB.Content>

            <TB.Content value="resources">
              <Y padding="$4" gap="$4">
                <T size="$5">
                  {t('sustainableFishing.resources')}
                </T>

                <C
                  style={styles.cardWithRadius}
                  bordered
                  pressStyle={{ opacity: 0.8 }}
                  onPress={handleSpeciesGuidePress}
                >
                  <Y padding="$4" gap="$2">
                    <T>{t('sustainableFishing.fishSpeciesGuide')}</T>
                    <P size="$2">
                      {t('sustainableFishing.fishSpeciesGuideDescription')}
                    </P>
                    <Image
                      source={require('../../assets/images/bycatch.png')}
                      style={styles.resourceImage}
                      resizeMode="cover"
                    />
                  </Y>
                </C>

                <C
                  style={[styles.cardWithRadius, styles.blueCard]}
                  bordered
                >
                  <Y padding="$4" gap="$2">
                    <T>{t('sustainableFishing.educationalVideos')}</T>
                    <P size="$2">
                      {t('sustainableFishing.educationalVideosDescription')}
                    </P>
                    <B
                      marginTop="$2"
                      onPress={() => navigation.navigate('EducationalVideos')}
                    >
                      {t('sustainableFishing.watchVideos')}
                    </B>
                  </Y>
                </C>

                <C
                  style={styles.cardWithRadius}
                  bordered
                >
                  <Y padding="$4" gap="$2">
                    <T>{t('sustainableFishing.communityForums')}</T>
                    <P size="$2">
                      {t('sustainableFishing.communityForumsDescription')}
                    </P>
                    <B
                      marginTop="$2"
                      onPress={() => navigation.navigate('CommunityForums')}
                    >
                      {t('sustainableFishing.joinDiscussion')}
                    </B>
                  </Y>
                </C>
              </Y>
            </TB.Content>
          </TB>
        </Y>
      </S>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueCard: {
    backgroundColor: '#E6F7FF'
  },
  cardWithRadius: {
    borderRadius: 16
  },
  categoryIcon: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  flexOne: {
    flex: 1
  },
  fullWidthImage: {
    borderRadius: 8,
    height: 200,
    width: '100%'
  },
  resourceImage: {
    borderRadius: 8,
    height: 120,
    marginTop: 8,
    width: '100%'
  }
});
