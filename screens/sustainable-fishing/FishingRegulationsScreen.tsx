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

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;
const A: any = Accordion;

export function FishingRegulationsScreen({ navigation }: FishingRegulationsScreenProps) {
  const { t } = useTranslation();
  const [expandedValue, setExpandedValue] = useState<string | undefined>(undefined);

  const regulationCategories: RegulationCategory[] = [
    {
      id: 'gear',
      title: t('regulations.gearRestrictions'),
      icon: <AlertTriangle size={"$1" as any} color={"$orange9" as any} />,
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
      icon: <Calendar size={"$1" as any} color={"$red9" as any} />,
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
      icon: <MapPin size={"$1" as any} color={"$green9" as any} />,
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
      icon: <FileText size={"$1" as any} color={"$blue9" as any} />,
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
      <S>
        <Y padding="$4" space="$4">
          <X justifyContent="space-between" alignItems="center">
            <B
              icon={<ArrowLeft size={"$1" as any} color={"$gray9" as any} />}
              variant="outlined"
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </B>
            
            <B
              icon={<Download size={"$1" as any} color={"$gray9" as any} />}
              variant="outlined"
              onPress={handleDownloadRegulations}
            >
              {t('regulations.download')}
            </B>
          </X>
          
          <H>{t('regulations.title')}</H>
          <P>{t('regulations.description')}</P>
          
          <C borderRadius="$4" backgroundColor="$blue2">
            <Y padding="$4" space="$2">
              <T fontWeight="bold">{t('regulations.disclaimer')}</T>
              <P fontSize="$2">
                {t('regulations.disclaimerContent')}
              </P>
            </Y>
          </C>
          
          <A
            type="multiple"
            value={expandedValue ? [expandedValue] : []}
            onValueChange={(value: string[]) => setExpandedValue(value[0])}
          >
            {regulationCategories.map((category) => (
              <A.Item key={category.id} value={category.id}>
                <A.Trigger>
                  <X flex={1} alignItems="center" space="$2">
                    {category.icon}
                    <T fontWeight="bold">{category.title}</T>
                  </X>
                  <A.Indicator />
                </A.Trigger>
                
                <A.Content>
                  <Y space="$3" paddingVertical="$2">
                    {category.regulations.map((regulation) => (
                      <C key={regulation.id} bordered padding="$3" space="$2">
                        <T fontWeight="bold">{regulation.title}</T>
                        <P fontSize="$2" marginTop="$1">
                          {regulation.description}
                        </P>
                        
                        {regulation.penalty && (
                          <X marginTop="$2" space="$2" alignItems="center">
                            <AlertTriangle size={"$1" as any} color={"$red9" as any} />
                            <T fontSize="$2" color="$red9">
                              {t('regulations.penalty')}: {regulation.penalty}
                            </T>
                          </X>
                        )}
                        
                        <T fontSize="$2" color="$gray9" marginTop="$1">
                          {t('regulations.enforcedBy')}: {regulation.authority}
                        </T>
                      </C>
                    ))}
                  </Y>
                </A.Content>
              </A.Item>
            ))}
          </A>
          
          <C borderRadius="$4" bordered>
            <Y padding="$4" space="$3">
              <T fontWeight="bold">{t('regulations.reportViolations')}</T>
              <P fontSize="$2">
                {t('regulations.reportViolationsDescription')}
              </P>
              
              <X space="$2" marginTop="$2">
                <B flex={1} backgroundColor="$green9" color="white">
                  {t('regulations.callHotline')}
                </B>
                <B 
                  flex={1} 
                  variant="outlined"
                  onPress={() => navigation.navigate('ReportViolation')}
                >
                  {t('regulations.reportInApp')}
                </B>
              </X>
            </Y>
          </C>
          
          <B
            marginTop="$2"
            onPress={() => navigation.navigate('FishingLicense')}
          >
            {t('regulations.applyForLicense')}
          </B>
        </Y>
      </S>
    </SafeAreaView>
  );
}
