import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Linking } from 'react-native';
import {
  YStack,
  H2,
  Text, 
  Card, 
  Button, 
  XStack, 
  Paragraph, 
  ScrollView,
  Image
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink } from '@tamagui/lucide-icons';

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;

interface EducationalVideosScreenProps {
  navigation: any;
}

export function EducationalVideosScreen({ navigation }: EducationalVideosScreenProps) {
  const { t } = useTranslation();

  // Sample video data - in a real app, this would come from an API or database
  const videos = [
    {
      id: '1',
      title: 'Sustainable Fishing Techniques',
      description: 'Learn about eco-friendly fishing methods that help preserve marine ecosystems.',
      thumbnail: require('../../assets/images/sustainable-fishing.png'),
      url: 'https://www.youtube.com/watch?v=example1',
    },
    {
      id: '2',
      title: 'Protecting Fish Habitats',
      description: 'Discover how to identify and protect critical fish habitats in your local waters.',
      thumbnail: require('../../assets/images/bycatch.png'),
      url: 'https://www.youtube.com/watch?v=example2',
    },
    {
      id: '3',
      title: 'Reducing Bycatch',
      description: 'Practical tips for reducing unwanted catch while fishing.',
      thumbnail: require('../../assets/images/fishing-gear.png'),
      url: 'https://www.youtube.com/watch?v=example3',
    },
  ];

  const handleOpenVideo = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL:', err));
  };

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
            <H>{t('sustainableFishing.educationalVideos')}</H>
          </X>
          
          <P>{t('sustainableFishing.educationalVideosDescription')}</P>
          
          {videos.map((video) => (
            <C key={video.id} style={styles.card}>
              <Y padding="$4" gap="$3">
                <Image
                  source={video.thumbnail}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <T fontWeight="bold">{video.title}</T>
                <P>{video.description}</P>
                <B
                  onPress={() => handleOpenVideo(video.url)}
                  backgroundColor="$blue9"
                  color="white"
                >
                  <ExternalLink size={16} color="white" />
                  <T color="white">{t('sustainableFishing.watchVideo')}</T>
                </B>
              </Y>
            </C>
          ))}
        </Y>
      </S>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  thumbnail: {
    borderRadius: 8,
    height: 180,
    width: '100%',
  },
});
