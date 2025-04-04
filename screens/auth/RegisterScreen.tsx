import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Separator } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase/supabaseClient';
import { AccountTypeSelector } from '../../components/profile/AccountTypeSelector';
import { AccountType, useAuthStore } from '../../store/auth/auth-store';

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
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [accountType, setAccountType] = useState<AccountType>(AccountType.PERSONAL);
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Basic info, Step 2: Account type, Step 3: Additional info

  // Get signUp function from auth store
  const signUp = useAuthStore((state) => state.signUp);

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!email || !password || !confirmPassword || !fullName) {
        Alert.alert(t('common.error'), t('auth.emptyFields'));
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert(t('common.error'), t('auth.passwordsDoNotMatch'));
        return;
      }
    } else if (step === 2) {
      // Account type selection doesn't need validation
    } else if (step === 3) {
      // Business accounts require business name
      if ((accountType === AccountType.BUSINESS_BOAT_OWNER ||
          accountType === AccountType.BUSINESS_DISTRIBUTOR) &&
          !businessName) {
        Alert.alert(t('common.error'), t('auth.businessNameRequired'));
        return;
      }
    }

    // Move to next step if not on the last step
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleRegister();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Prepare user data based on account type
      const userData = {
        email,
        fullName,
        phoneNumber,
        location,
        accountType,
        businessName: accountType === AccountType.PERSONAL ? undefined : businessName,
      };

      await signUp(email, password, userData);

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
    } catch (error) {
      Alert.alert(t('common.error'), t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <X justifyContent="space-between" marginBottom="$4">
      <X flex={1} alignItems="center" opacity={step === 1 ? 1 : 0.5}>
        <Y width={30} height={30} borderRadius={15} backgroundColor={step >= 1 ? '$blue10' : '$gray5'} alignItems="center" justifyContent="center">
          <T color="white">1</T>
        </Y>
        <T fontSize="$2" marginTop="$1">{t('auth.basicInfo')}</T>
      </X>
      <X flex={0.5} height={1} backgroundColor="$gray5" marginTop={15} />
      <X flex={1} alignItems="center" opacity={step === 2 ? 1 : 0.5}>
        <Y width={30} height={30} borderRadius={15} backgroundColor={step >= 2 ? '$blue10' : '$gray5'} alignItems="center" justifyContent="center">
          <T color="white">2</T>
        </Y>
        <T fontSize="$2" marginTop="$1">{t('auth.accountType')}</T>
      </X>
      <X flex={0.5} height={1} backgroundColor="$gray5" marginTop={15} />
      <X flex={1} alignItems="center" opacity={step === 3 ? 1 : 0.5}>
        <Y width={30} height={30} borderRadius={15} backgroundColor={step >= 3 ? '$blue10' : '$gray5'} alignItems="center" justifyContent="center">
          <T color="white">3</T>
        </Y>
        <T fontSize="$2" marginTop="$1">{t('auth.additionalInfo')}</T>
      </X>
    </X>
  );

  const renderStep1 = () => (
    <Y space="$4">
      <Y space="$2">
        <T>{t('auth.fullName')}</T>
        <I
          placeholder={t('auth.fullNamePlaceholder')}
          value={fullName}
          onChangeText={setFullName}
        />
      </Y>

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
    </Y>
  );

  const renderStep2 = () => (
    <AccountTypeSelector
      selectedType={accountType}
      onSelectType={setAccountType}
    />
  );

  const renderStep3 = () => (
    <Y space="$4">
      <Y space="$2">
        <T>{t('auth.location')}</T>
        <I
          placeholder={t('auth.locationPlaceholder')}
          value={location}
          onChangeText={setLocation}
        />
      </Y>

      {(accountType === AccountType.BUSINESS_BOAT_OWNER ||
        accountType === AccountType.BUSINESS_DISTRIBUTOR) && (
        <>
          <Separator marginVertical="$2" />
          <T fontWeight="bold" fontSize="$5">{t('auth.businessInformation')}</T>

          <Y space="$2">
            <T>{t('auth.businessName')}</T>
            <I
              placeholder={t('auth.businessNamePlaceholder')}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </Y>
        </>
      )}
    </Y>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Y padding="$4" space="$4" flex={1} justifyContent="space-between">
          <Y>
            <Y space="$2" alignItems="center" marginBottom="$4">
              <H>{t('auth.register')}</H>
              <P>{t('auth.registerDescription')}</P>
            </Y>

            {renderStepIndicator()}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </Y>

          <Y space="$4" marginTop="$6">
            <X justifyContent="space-between">
              {step > 1 ? (
                <B
                  onPress={handlePreviousStep}
                  disabled={loading}
                  theme="gray"
                  size="$4"
                  flex={1}
                  marginRight="$2"
                >
                  {t('common.back')}
                </B>
              ) : (
                <Y flex={1} marginRight="$2" />
              )}

              <B
                onPress={handleNextStep}
                disabled={loading}
                theme="blue"
                themeInverse
                size="$4"
                flex={1}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : step < 3 ? (
                  t('common.next')
                ) : (
                  t('auth.createAccount')
                )}
              </B>
            </X>

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
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
