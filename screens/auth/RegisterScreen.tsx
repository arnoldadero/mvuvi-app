import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';

interface RegisterScreenProps {
  navigation: any;
}

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
      <YStack padding="$4" space="$4" flex={1} justifyContent="center">
        <YStack space="$2" alignItems="center" marginBottom="$4">
          <H2>{t('auth.register')}</H2>
          <Paragraph>{t('auth.registerDescription')}</Paragraph>
        </YStack>

        <Form onSubmit={handleRegister}>
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

            <YStack space="$2">
              <Text>{t('auth.phoneNumber')}</Text>
              <Input
                placeholder={t('auth.phoneNumberPlaceholder')}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </YStack>

            <YStack space="$2">
              <Text>{t('auth.password')}</Text>
              <Input
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </YStack>

            <YStack space="$2">
              <Text>{t('auth.confirmPassword')}</Text>
              <Input
                placeholder={t('auth.confirmPasswordPlaceholder')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </YStack>

            <Button
              onPress={handleRegister}
              disabled={loading}
              backgroundColor="$blue9"
              color="white"
              marginTop="$2"
            >
              {loading ? <ActivityIndicator color="white" /> : t('auth.createAccount')}
            </Button>
          </YStack>
        </Form>

        <XStack justifyContent="center" marginTop="$4">
          <Text>{t('auth.alreadyHaveAccount')} </Text>
          <Text
            color="$blue9"
            onPress={() => navigation.navigate('Login')}
            fontWeight="bold"
          >
            {t('auth.login')}
          </Text>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}
