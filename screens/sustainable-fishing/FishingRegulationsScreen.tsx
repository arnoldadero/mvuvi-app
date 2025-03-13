import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Image } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, Accordion } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, AlertTriangle, Calendar, MapPin, FileText, Download } from '@tamagui/lucide-icons';

interface FishingRegulationsScreenProps {
  navigation: any;
}

interface RegulationCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  regulations: Regulation[];
}

interface Regulation {
  id: string;
  title: string;
  description: string;
  penalty?: string;
  authority: string;
}

export function FishingRegulationsScreen({ navigation }: FishingRegulationsScreenProps) {
  const { t } = useTranslation();
  const [expandedValue, setExpandedValue] = useState<string | undefined>(undefined);

  const regulationCategories: RegulationCategory[] = [
    {
      id: 'gear',
      title: t('regulations.gearRestrictions'),
      icon: <AlertTriangle size="$1" color="$orange9" />,
      regulations: [
        {
          id: 'gear1',
          title: t('regulations.meshSizeRestriction'),
          description: t('regulations.meshSizeDescription'),
          penalty: t('regulations.meshSizePenalty'),
          authority: 'Kenya Fisheries Service',
        },
        {
          id: 'gear2',
          title: t('regulations.prohibitedGear'),
          description: t('regulations.prohibitedGearDescription'),
          penalty: t('regulations.prohibitedGearPenalty'),
          authority: 'Kenya Fisheries Service',
        },
        {
          id: 'gear3',
          title: t('regulations.netLength'),
          description: t('regulations.netLengthDescription'),
          penalty: t('regulations.netLengthPenalty'),
          authority: 'Kenya Fisheries Service',
        },
      ],
    },
    {
      id: 'seasons',
      title: t('regulations.closedSeasons'),
      icon: <Calendar size="$1" color="$red9" />,
      regulations: [
        {
          id: 'season1',
          title: t('regulations.tilapiaClosedSeason'),
          description: t('regulations.tilapiaClosedSeasonDescription'),
          penalty: t('regulations.tilapiaClosedSeasonPenalty'),
          authority: 'Kenya Fisheries Service',
        },
        {
          id: 'season2',
          title: t('regulations.nileParchClosedSeason'),
          description: t('regulations.nileParchClosedSeasonDescription'),
          penalty: t('regulations.nileParchClosedSeasonPenalty'),
          authority: 'Kenya Fisheries Service',
        },
      ],
    },
    {
      id: 'areas',
      title: t('regulations.protectedAreas'),
      icon: <MapPin size="$1" color="$green9" />,
      regulations: [
        {
          id: 'area1',
          title: t('regulations.breedingGrounds'),
          description: t('regulations.breedingGroundsDescription'),
          penalty: t('regulations.breedingGroundsPenalty'),
          authority: 'Kenya Wildlife Service',
        },
        {
          id: 'area2',
          title: t('regulations.marineProtectedAreas'),
          description: t('regulations.marineProtectedAreasDescription'),
          penalty: t('regulations.marineProtectedAreasPenalty'),
          authority: 'Kenya Wildlife Service',
        },
      ],
    },
    {
      id: 'size',
      title: t('regulations.sizeLimits'),
      icon: <FileText size="$1" color="$blue9" />,
      regulations: [
        {
          id: 'size1',
          title: t('regulations.minimumSizeNilePerch'),
          description: t('regulations.minimumSizeNilePerchDescription'),
          penalty: t('regulations.minimumSizeNilePerchPenalty'),
          authority: 'Kenya Fisheries Service',
        },
        {
          id: 'size2',
          title: t('regulations.minimumSizeTilapia'),
          description: t('regulations.minimumSizeTilapiaDescription'),
          penalty: t('regulations.minimumSizeTilapiaPenalty'),
          authority: 'Kenya Fisheries Service',
        },
      ],
    },
  ];

  const handleDownloadRegulations = () => {
    // In a real app, this would download a PDF of the regulations
    // For now, we'll just show an alert
    alert(t('regulations.downloadStarted'));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <Button
              icon={<ArrowLeft />}
              variant="outlined"
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </Button>
            
            <Button
              icon={<Download />}
              variant="outlined"
              onPress={handleDownloadRegulations}
            >
              {t('regulations.download')}
            </Button>
          </XStack>
          
          <H2>{t('regulations.title')}</H2>
          <Paragraph>{t('regulations.description')}</Paragraph>
          
          <Card borderRadius="$4" backgroundColor="$blue2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('regulations.disclaimer')}</Text>
              <Paragraph fontSize="$2">
                {t('regulations.disclaimerContent')}
              </Paragraph>
            </YStack>
          </Card>
          
          <Accordion
            type="multiple"
            value={expandedValue ? [expandedValue] : []}
            onValueChange={(value) => setExpandedValue(value[0])}
          >
            {regulationCategories.map((category) => (
              <Accordion.Item key={category.id} value={category.id}>
                <Accordion.Trigger>
                  <XStack flex={1} alignItems="center" space="$2">
                    {category.icon}
                    <Text fontWeight="bold">{category.title}</Text>
                  </XStack>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                
                <Accordion.Content>
                  <YStack space="$3" paddingVertical="$2">
                    {category.regulations.map((regulation) => (
                      <Card key={regulation.id} bordered padding="$3" space="$2">
                        <Text fontWeight="bold">{regulation.title}</Text>
                        <Paragraph fontSize="$2" marginTop="$1">
                          {regulation.description}
                        </Paragraph>
                        
                        {regulation.penalty && (
                          <XStack marginTop="$2" space="$2" alignItems="center">
                            <AlertTriangle size="$1" color="$red9" />
                            <Text fontSize="$2" color="$red9">
                              {t('regulations.penalty')}: {regulation.penalty}
                            </Text>
                          </XStack>
                        )}
                        
                        <Text fontSize="$2" color="$gray9" marginTop="$1">
                          {t('regulations.enforcedBy')}: {regulation.authority}
                        </Text>
                      </Card>
                    ))}
                  </YStack>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
          
          <Card borderRadius="$4" bordered>
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold">{t('regulations.reportViolations')}</Text>
              <Paragraph fontSize="$2">
                {t('regulations.reportViolationsDescription')}
              </Paragraph>
              
              <XStack space="$2" marginTop="$2">
                <Button flex={1} backgroundColor="$green9" color="white">
                  {t('regulations.callHotline')}
                </Button>
                <Button 
                  flex={1} 
                  variant="outlined"
                  onPress={() => navigation.navigate('ReportViolation')}
                >
                  {t('regulations.reportInApp')}
                </Button>
              </XStack>
            </YStack>
          </Card>
          
          <Button
            marginTop="$2"
            onPress={() => navigation.navigate('FishingLicense')}
          >
            {t('regulations.applyForLicense')}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
