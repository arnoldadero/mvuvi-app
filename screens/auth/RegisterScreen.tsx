import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';

interface RegisterScreenProps {
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

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('common.error'), t('auth.emptyFields'));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('auth.passwordsDoNotMatch'));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone_number: phoneNumber,
          },
        },
      });

      if (error) {
        Alert.alert(t('common.error'), error.message);
      } else {
        Alert.alert(
          t('common.success'),
          t('auth.registerSuccess'),
          [
            {
              text: t('common.ok'),
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Y padding="$4" space="$4" flex={1} justifyContent="center">
        <Y space="$2" alignItems="center" marginBottom="$4">
          <H>{t('auth.register')}</H>
          <P>{t('auth.registerDescription')}</P>
        </Y>

        <F onSubmit={handleRegister}>
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
              <T>{t('auth.phoneNumber')}</T>
              <I
                placeholder={t('auth.phoneNumberPlaceholder')}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
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

            <Y space="$2">
              <T>{t('auth.confirmPassword')}</T>
              <I
                placeholder={t('auth.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </Y>

            <B
              onPress={handleRegister}
              disabled={loading}
              theme="blue"
              themeInverse
              size="$4"
              marginTop="$2"
            >
              {loading ? <ActivityIndicator color="white" /> : t('auth.createAccount')}
            </B>
          </Y>
        </F>

        <X justifyContent="center" marginTop="$4">
          <T>{t('auth.alreadyHaveAccount')} </T>
          <T
            theme="blue"
            onPress={() => navigation.navigate('Login')}
            fontWeight="bold"
          >
            {t('auth.login')}
          </T>
        </X>
      </Y>
    </SafeAreaView>
  );
}
