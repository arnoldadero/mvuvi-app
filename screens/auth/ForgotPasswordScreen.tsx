import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const Y: any = YStack;
const H: any = H2;
const P: any = Paragraph;
const T: any = Text;

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
      <Y $padding={"$4" as any} $space={"$4" as any} $flex={1} $justifyContent="center">
        <Y $space={"$2" as any} $alignItems="center" $marginBottom={"$4" as any}>
          <H>{t('auth.forgotPassword')}</H>
          <P>{t('auth.forgotPasswordDescription')}</P>
        </Y>

        <Form onSubmit={handleResetPassword}>
          <Y $space={"$4" as any}>
            <Y $space={"$2" as any}>
              <T>{t('auth.email')}</T>
              <Input
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </Y>

            <Button
              onPress={handleResetPassword}
              disabled={loading}
              theme="blue"
              themeInverse
              size={"$4" as any}
              $marginTop={"$2" as any}
            >
              {loading ? <ActivityIndicator color="white" /> : t('auth.resetPassword')}
            </Button>

            <Button
              variant="outlined"
              onPress={() => navigation.goBack()}
              $marginTop={"$2" as any}
            >
              {t('common.back')}
            </Button>
          </Y>
        </Form>
      </Y>
    </SafeAreaView>
  );
}
