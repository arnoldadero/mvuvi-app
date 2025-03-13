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

interface SustainableFishingScreenProps {
  navigation: any;
}

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
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('sustainableFishing.title')}</H2>
          <Paragraph>{t('sustainableFishing.description')}</Paragraph>
          
          <Tabs
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
            <Tabs.List>
              <Tabs.Tab name="overview">
                <Info color="$color" />
                <Text>{t('sustainableFishing.overview')}</Text>
              </Tabs.Tab>
              <Tabs.Tab name="practices">
                <Fish color="$color" />
                <Text>{t('sustainableFishing.practices')}</Text>
              </Tabs.Tab>
              <Tabs.Tab name="resources">
                <Book color="$color" />
                <Text>{t('sustainableFishing.resources')}</Text>
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Content value="overview">
              <YStack padding="$4" gap="$4">
                <Image
                  source={require('../../assets/images/sustainable-fishing.png')}
                  style={styles.fullWidthImage}
                  resizeMode="cover"
                />
                
                <Paragraph>
                  {t('sustainableFishing.overviewContent')}
                </Paragraph>
                
                <Card style={styles.blueCard}>
                  <YStack padding="$4" gap="$2">
                    <Text>{t('sustainableFishing.whySustainable')}</Text>
                    <Paragraph size="$2">
                      {t('sustainableFishing.whySustainableContent')}
                    </Paragraph>
                  </YStack>
                </Card>
                
                <Button
                  backgroundColor="$green9"
                  color="white"
                  onPress={() => setActiveTab('practices')}
                >
                  {t('sustainableFishing.exploreGuidelines')}
                </Button>
              </YStack>
            </Tabs.Content>
            
            <Tabs.Content value="practices">
              <YStack padding="$4" gap="$4">
                <Text size="$5">
                  {t('sustainableFishing.bestPractices')}
                </Text>
                
                <YStack gap="$3">
                  {/* Sustainable Fishing Categories */}
                  <Card 
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('gear')}
                  >
                    <XStack padding="$4" alignItems="center" space="$3">
                      <Image
                        source={require('../../assets/images/fishing-gear.png')}
                        style={styles.categoryIcon}
                      />
                      <YStack style={styles.flexOne}>
                        <Text>{t('sustainableFishing.gearSelection')}</Text>
                        <Paragraph size="$2">
                          {t('sustainableFishing.gearSelectionDescription')}
                        </Paragraph>
                      </YStack>
                    </XStack>
                  </Card>
                  
                  <Card 
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('bycatch')}
                  >
                    <XStack padding="$4" alignItems="center" space="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <YStack style={styles.flexOne}>
                        <Text>{t('sustainableFishing.bycatchReduction')}</Text>
                        <Paragraph size="$2">
                          {t('sustainableFishing.bycatchReductionDescription')}
                        </Paragraph>
                      </YStack>
                    </XStack>
                  </Card>
                  
                  <Card 
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('habitat')}
                  >
                    <XStack padding="$4" alignItems="center" space="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <YStack style={styles.flexOne}>
                        <Text>{t('sustainableFishing.habitatProtection')}</Text>
                        <Paragraph size="$2">
                          {t('sustainableFishing.habitatProtectionDescription')}
                        </Paragraph>
                      </YStack>
                    </XStack>
                  </Card>
                  
                  <Card 
                    style={styles.cardWithRadius}
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleCategoryPress('juvenile')}
                  >
                    <XStack padding="$4" alignItems="center" space="$3">
                      <Image
                        source={require('../../assets/images/bycatch.png')}
                        style={styles.categoryIcon}
                      />
                      <YStack style={styles.flexOne}>
                        <Text>{t('sustainableFishing.juvenileProtection')}</Text>
                        <Paragraph size="$2">
                          {t('sustainableFishing.juvenileProtectionDescription')}
                        </Paragraph>
                      </YStack>
                    </XStack>
                  </Card>
                </YStack>
                
                <XStack space="$2">
                  <Button
                    style={styles.flexOne}
                    onPress={handleSeasonalCalendarPress}
                  >
                    <Calendar color="$color" />
                    <Text>{t('sustainableFishing.seasonalCalendar')}</Text>
                  </Button>
                  
                  <Button
                    style={styles.flexOne}
                    onPress={handleRegulationsPress}
                  >
                    <Ruler color="$color" />
                    <Text>{t('sustainableFishing.regulations')}</Text>
                  </Button>
                </XStack>
              </YStack>
            </Tabs.Content>
            
            <Tabs.Content value="resources">
              <YStack padding="$4" space="$4">
                <Text size="$5">
                  {t('sustainableFishing.resources')}
                </Text>
                
                <Card
                  style={styles.cardWithRadius}
                  bordered
                  pressStyle={{ opacity: 0.8 }}
                  onPress={handleSpeciesGuidePress}
                >
                  <YStack padding="$4" space="$2">
                    <Text>{t('sustainableFishing.fishSpeciesGuide')}</Text>
                    <Paragraph size="$2">
                      {t('sustainableFishing.fishSpeciesGuideDescription')}
                    </Paragraph>
                    <Image
                      source={require('../../assets/images/bycatch.png')}
                      style={styles.resourceImage}
                      resizeMode="cover"
                    />
                  </YStack>
                </Card>
                
                <Card
                  style={[styles.cardWithRadius, styles.blueCard]}
                  bordered
                >
                  <YStack padding="$4" space="$2">
                    <Text>{t('sustainableFishing.educationalVideos')}</Text>
                    <Paragraph size="$2">
                      {t('sustainableFishing.educationalVideosDescription')}
                    </Paragraph>
                    <Button
                      marginTop="$2"
                      onPress={() => navigation.navigate('EducationalVideos')}
                    >
                      {t('sustainableFishing.watchVideos')}
                    </Button>
                  </YStack>
                </Card>
                
                <Card
                  style={styles.cardWithRadius}
                  bordered
                >
                  <YStack padding="$4" space="$2">
                    <Text>{t('sustainableFishing.communityForums')}</Text>
                    <Paragraph size="$2">
                      {t('sustainableFishing.communityForumsDescription')}
                    </Paragraph>
                    <Button
                      marginTop="$2"
                      onPress={() => navigation.navigate('CommunityForums')}
                    >
                      {t('sustainableFishing.joinDiscussion')}
                    </Button>
                  </YStack>
                </Card>
              </YStack>
            </Tabs.Content>
          </Tabs>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  flexOne: {
    flex: 1
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  resourceImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 8
  },
  cardWithRadius: {
    borderRadius: 16
  },
  blueCard: {
    backgroundColor: '#E6F7FF'
  }
});
