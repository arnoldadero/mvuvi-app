import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import {
  YStack,
  H2,
  Text, 
  Card, 
  Button, 
  XStack, 
  Paragraph, 
  ScrollView,
  Input,
  Avatar,
  Separator
} from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MessageCircle, Send } from '@tamagui/lucide-icons';

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;
const I: any = Input;
const A: any = Avatar;
const Sep: any = Separator;

interface CommunityForumsScreenProps {
  navigation: any;
}

export function CommunityForumsScreen({ navigation }: CommunityForumsScreenProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  // Sample forum data - in a real app, this would come from an API or database
  const forumPosts = [
    {
      id: '1',
      author: 'John Doe',
      avatar: 'JD',
      date: '2 days ago',
      content: 'I\'ve been using circle hooks for the past year and have noticed a significant reduction in bycatch. Has anyone else had similar experiences?',
      replies: 3,
    },
    {
      id: '2',
      author: 'Maria Garcia',
      avatar: 'MG',
      date: '1 week ago',
      content: 'Looking for recommendations on the best sustainable fishing spots near Mombasa. Any suggestions?',
      replies: 5,
    },
    {
      id: '3',
      author: 'David Kimani',
      avatar: 'DK',
      date: '2 weeks ago',
      content: 'I\'ve been documenting the decline of certain fish species in Lake Victoria. Would anyone be interested in collaborating on a conservation project?',
      replies: 8,
    },
  ];

  const handleSendMessage = () => {
    // In a real app, this would send the message to a backend
    console.log('Sending message:', message);
    setMessage('');
    // Show a toast or feedback to the user
    alert(t('sustainableFishing.messageSent'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <S style={styles.scrollView}>
        <Y padding="$4" gap="$4">
          <X alignItems="center" gap="$2">
            <B
              size="$3"
              circular
              icon={<ArrowLeft size={16} />}
              onPress={() => navigation.goBack()}
            />
            <H>{t('sustainableFishing.communityForums')}</H>
          </X>
          
          <P>{t('sustainableFishing.communityForumsDescription')}</P>
          
          {forumPosts.map((post) => (
            <C key={post.id} style={styles.card}>
              <Y padding="$4" gap="$3">
                <X alignItems="center" gap="$2">
                  <A circular size="$3">
                    <A.Image source={{ uri: `https://ui-avatars.com/api/?name=${post.avatar}&background=random` }} />
                  </A>
                  <Y>
                    <T fontWeight="bold">{post.author}</T>
                    <T size="$1" color="$gray9">{post.date}</T>
                  </Y>
                </X>
                <P>{post.content}</P>
                <Sep />
                <X justifyContent="space-between" alignItems="center">
                  <X alignItems="center" gap="$1">
                    <MessageCircle size={16} color="$gray9" />
                    <T size="$2" color="$gray9">{post.replies} {t('sustainableFishing.replies')}</T>
                  </X>
                  <B size="$2" variant="outlined">
                    {t('sustainableFishing.viewDiscussion')}
                  </B>
                </X>
              </Y>
            </C>
          ))}
          
          <C style={styles.card}>
            <Y padding="$4" gap="$3">
              <T fontWeight="bold">{t('sustainableFishing.startDiscussion')}</T>
              <I
                placeholder={t('sustainableFishing.writeMessage')}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
                style={styles.input}
              />
              <X justifyContent="flex-end">
                <B 
                  onPress={handleSendMessage}
                  disabled={!message.trim()}
                  backgroundColor={message.trim() ? '$green9' : '$gray5'}
                  color="white"
                >
                  <Send size={16} color="white" />
                  <T color="white">{t('sustainableFishing.post')}</T>
                </B>
              </X>
            </Y>
          </C>
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
  input: {
    height: 100,
    textAlignVertical: 'top',
  },
  scrollView: {
    flex: 1,
  },
});
