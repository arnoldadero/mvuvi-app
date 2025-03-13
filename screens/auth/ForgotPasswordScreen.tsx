import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(t('common.error'), t('auth.emptyEmail'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'mvuvi://reset-password',
      });

      if (error) {
        Alert.alert(t('common.error'), error.message);
      } else {
        Alert.alert(
          t('common.success'),
          t('auth.resetPasswordEmailSent'),
          [
            {
              text: t('common.ok'),
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.resetPasswordFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <YStack padding="$4" space="$4" flex={1} justifyContent="center">
        <YStack space="$2" alignItems="center" marginBottom="$4">
          <H2>{t('auth.forgotPassword')}</H2>
          <Paragraph>{t('auth.forgotPasswordDescription')}</Paragraph>
        </YStack>

        <Form onSubmit={handleResetPassword}>
          <YStack space="$4">
            <YStack space="$2">
              <Text>{t('auth.email')}</Text>
              <Input
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </YStack>

            <Button
              onPress={handleResetPassword}
              disabled={loading}
              backgroundColor="$blue9"
              color="white"
              marginTop="$2"
            >
              {loading ? <ActivityIndicator color="white" /> : t('auth.resetPassword')}
            </Button>

            <Button
              variant="outlined"
              onPress={() => navigation.goBack()}
              marginTop="$2"
            >
              {t('common.back')}
            </Button>
          </YStack>
        </Form>
      </YStack>
    </SafeAreaView>
  );
}
