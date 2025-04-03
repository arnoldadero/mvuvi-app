import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';
import { useAuthStore } from '../../services/supabase/authStore';

interface LoginScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const I: any = Input;
const B: any = Button;
const F: any = Form;
const P: any = Paragraph;
const X: any = XStack;

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('auth.emptyFields'));
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      const user = useAuthStore.getState().user;
      
      if (user) {
        Alert.alert(t('common.success'), t('auth.loginSuccess'));
        navigation.navigate('Weather');
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Y padding="$4" space="$4" flex={1} justifyContent="center">
        <Y space="$2" alignItems="center" marginBottom="$4">
          <H>{t('auth.login')}</H>
          <P>{t('auth.loginDescription')}</P>
        </Y>

        <F onSubmit={handleLogin}>
          <Y space="$4">
            <Y space="$2">
              <T>{t('auth.email')}</T>
              <I
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </Y>

            <Y space="$2">
              <T>{t('auth.password')}</T>
              <I
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </Y>

            <B
              onPress={handleLogin}
              disabled={loading}
              backgroundColor="$blue9"
              color="white"
              marginTop="$2"
            >
              {loading ? <ActivityIndicator color="white" size={24} /> : t('auth.login')}
            </B>

            <B
              variant="outlined"
              onPress={() => navigation.navigate('ForgotPassword')}
              marginTop="$2"
            >
              {t('auth.forgotPassword')}
            </B>
          </Y>
        </F>

        <X justifyContent="center" marginTop="$4">
          <T>{t('auth.dontHaveAccount')} </T>
          <T
            color="$blue9"
            onPress={() => navigation.navigate('Register')}
            fontWeight="bold"
          >
            {t('auth.register')}
          </T>
        </X>
      </Y>
    </SafeAreaView>
  );
}
