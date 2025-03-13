import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';
import { useAuthStore } from '../../services/supabase/authStore';

interface LoginScreenProps {
  navigation: any;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), t('auth.emptyFields'));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert(t('common.error'), error.message);
      } else if (data?.user) {
        setUser(data.user);
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
      <YStack padding="$4" space="$4" flex={1} justifyContent="center">
        <YStack space="$2" alignItems="center" marginBottom="$4">
          <H2>{t('auth.login')}</H2>
          <Paragraph>{t('auth.loginDescription')}</Paragraph>
        </YStack>

        <Form onSubmit={handleLogin}>
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
              <Text>{t('auth.password')}</Text>
              <Input
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </YStack>

            <Button
              onPress={handleLogin}
              disabled={loading}
              backgroundColor="$blue9"
              color="white"
              marginTop="$2"
            >
              {loading ? <ActivityIndicator color="white" /> : t('auth.login')}
            </Button>

            <Button
              variant="outlined"
              onPress={() => navigation.navigate('ForgotPassword')}
              marginTop="$2"
            >
              {t('auth.forgotPassword')}
            </Button>
          </YStack>
        </Form>

        <XStack justifyContent="center" marginTop="$4">
          <Text>{t('auth.dontHaveAccount')} </Text>
          <Text
            color="$blue9"
            onPress={() => navigation.navigate('Register')}
            fontWeight="bold"
          >
            {t('auth.register')}
          </Text>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
}
