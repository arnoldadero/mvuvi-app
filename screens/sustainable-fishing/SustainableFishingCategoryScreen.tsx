import React from 'react';
import { SafeAreaView, StatusBar, Image, StyleSheet } from 'react-native';
import {
  YStack,
  H2,
  Text, 
  Card, 
  Button, 
  XStack, 
  Paragraph, 
  ScrollView
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;

type SustainableFishingCategoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SustainableFishingCategory'
>;

export function SustainableFishingCategoryScreen({ 
  route, 
  navigation 
}: SustainableFishingCategoryScreenProps) {
  const { t } = useTranslation();
  const { category } = route.params;

  // Get category-specific content
  const getCategoryTitle = () => {
    switch (category) {
      case 'gear':
        return t('sustainableFishing.gearSelection');
      case 'bycatch':
        return t('sustainableFishing.bycatchReduction');
      case 'habitat':
        return t('sustainableFishing.habitatProtection');
      case 'juvenile':
        return t('sustainableFishing.juvenileProtection');
      default:
        return t('sustainableFishing.category');
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case 'gear':
        return t('sustainableFishing.gearSelectionDescription');
      case 'bycatch':
        return t('sustainableFishing.bycatchReductionDescription');
      case 'habitat':
        return t('sustainableFishing.habitatProtectionDescription');
      case 'juvenile':
        return t('sustainableFishing.juvenileProtectionDescription');
      default:
        return '';
    }
  };

  const getCategoryContent = () => {
    // This would typically come from a more comprehensive content management system
    // or a dedicated content file. For now, we'll use placeholder content.
    switch (category) {
      case 'gear':
        return [
          {
            title: t('sustainableFishing.selectiveGear'),
            content: t('sustainableFishing.selectiveGearContent'),
            image: require('../../assets/images/fishing-gear.png')
          },
          {
            title: t('sustainableFishing.gearMaintenance'),
            content: t('sustainableFishing.gearMaintenanceContent'),
            image: require('../../assets/images/fishing-gear.png')
          }
        ];
      case 'bycatch':
        return [
          {
            title: t('sustainableFishing.avoidBycatch'),
            content: t('sustainableFishing.avoidBycatchContent'),
            image: require('../../assets/images/bycatch.png')
          },
          {
            title: t('sustainableFishing.releaseTechniques'),
            content: t('sustainableFishing.releaseTechniquesContent'),
            image: require('../../assets/images/bycatch.png')
          }
        ];
      case 'habitat':
        return [
          {
            title: t('sustainableFishing.protectHabitat'),
            content: t('sustainableFishing.protectHabitatContent'),
            image: require('../../assets/images/bycatch.png')
          },
          {
            title: t('sustainableFishing.avoidSensitiveAreas'),
            content: t('sustainableFishing.avoidSensitiveAreasContent'),
            image: require('../../assets/images/bycatch.png')
          }
        ];
      case 'juvenile':
        return [
          {
            title: t('sustainableFishing.minimumSize'),
            content: t('sustainableFishing.minimumSizeContent'),
            image: require('../../assets/images/bycatch.png')
          },
          {
            title: t('sustainableFishing.avoidBreedingAreas'),
            content: t('sustainableFishing.avoidBreedingAreasContent'),
            image: require('../../assets/images/bycatch.png')
          }
        ];
      default:
        return [];
    }
  };

  const categoryContent = getCategoryContent();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <S>
        <Y padding="$4" gap="$4">
          <X alignItems="center" gap="$2">
            <B
              size="$3"
              circular
              icon={<ArrowLeft size={16} />}
              onPress={() => navigation.goBack()}
            />
            <H>{getCategoryTitle()}</H>
          </X>
          
          <P>{getCategoryDescription()}</P>
          
          {categoryContent.map((item, index) => (
            <C key={index} style={styles.card}>
              <Y padding="$4" gap="$3">
                <X alignItems="center" gap="$3">
                  <Image
                    source={item.image}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <T fontWeight="bold">{item.title}</T>
                </X>
                <P>{item.content}</P>
              </Y>
            </C>
          ))}
          
          <B
            backgroundColor="$green9"
            color="white"
            onPress={() => navigation.navigate('FishingRegulations')}
          >
            {t('sustainableFishing.viewRegulations')}
          </B>
        </Y>
      </S>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    width: 40,
    height: 40,
  },
});
