import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { YStack, H2, Text, Card, Paragraph, Button, XStack, Input, Select } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';

interface FishingLicenseScreenProps {
  navigation: any;
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const P: any = Paragraph;
const B: any = Button;
const X: any = XStack;
const I: any = Input;
const S: any = Select;

// License types data
const licenseTypes = [
  {
    id: 'recreational',
    name: 'Recreational Fishing License',
    description: 'For individuals fishing for leisure and personal consumption.',
    duration: ['Daily', 'Weekly', 'Monthly', 'Annual'],
    fees: {
      Daily: 'KSh 500',
      Weekly: 'KSh 1,500',
      Monthly: 'KSh 3,000',
      Annual: 'KSh 8,000',
    },
  },
  {
    id: 'commercial',
    name: 'Commercial Fishing License',
    description: 'For individuals or businesses fishing for commercial purposes.',
    duration: ['Monthly', 'Annual'],
    fees: {
      Monthly: 'KSh 10,000',
      Annual: 'KSh 50,000',
    },
  },
  {
    id: 'artisanal',
    name: 'Artisanal Fishing License',
    description: 'For small-scale, traditional fishers using non-motorized boats.',
    duration: ['Monthly', 'Annual'],
    fees: {
      Monthly: 'KSh 1,000',
      Annual: 'KSh 5,000',
    },
  },
];

export function FishingLicenseScreen({ navigation }: FishingLicenseScreenProps) {
  const { t } = useTranslation();
  const [selectedLicenseType, setSelectedLicenseType] = useState('recreational');
  const [selectedDuration, setSelectedDuration] = useState('');

  const selectedLicense = licenseTypes.find(license => license.id === selectedLicenseType);

  const handleApplyForLicense = () => {
    // In a real app, this would navigate to a license application form
    alert('License application form would open here in a real app');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <Y padding="$4" space="$4">
          <H>{t('sustainableFishing.fishingLicense')}</H>
          <P>{t('sustainableFishing.fishingLicenseDescription', 'Information about fishing licenses, requirements, and how to apply.')}</P>
          
          <C borderRadius="$4" backgroundColor="$blue2" borderColor="$blue7" bordered>
            <Y padding="$4" space="$2">
              <X space="$2" alignItems="center">
                <Feather name="info" size={20} color="#0891b2" />
                <T fontSize="$4" fontWeight="bold">{t('sustainableFishing.licenseRequirement')}</T>
              </X>
              <P paddingLeft="$6">
                {t('sustainableFishing.licenseRequirementDescription', 'All fishing activities in Kenyan waters require a valid fishing license. Fishing without a license is illegal and subject to penalties.')}
              </P>
            </Y>
          </C>
          
          <Y space="$3">
            <T fontSize="$5" fontWeight="bold">{t('sustainableFishing.licenseTypes')}</T>
            
            <Y space="$2">
              <T>{t('sustainableFishing.selectLicenseType')}</T>
              <S value={selectedLicenseType} onValueChange={setSelectedLicenseType}>
                <S.Trigger>
                  <S.Value placeholder={t('sustainableFishing.selectLicenseType')} />
                </S.Trigger>
                <S.Content>
                  {licenseTypes.map((license, index) => (
                    <S.Item key={license.id} value={license.id} index={index}>
                      <S.ItemText>{license.name}</S.ItemText>
                    </S.Item>
                  ))}
                </S.Content>
              </S>
            </Y>
            
            {selectedLicense && (
              <C borderRadius="$4" bordered marginTop="$2">
                <Y padding="$4" space="$3">
                  <T fontSize="$5" fontWeight="bold">{selectedLicense.name}</T>
                  <P>{selectedLicense.description}</P>
                  
                  <Y space="$2" marginTop="$2">
                    <T fontWeight="bold">{t('sustainableFishing.licenseDuration')}</T>
                    <S value={selectedDuration} onValueChange={setSelectedDuration}>
                      <S.Trigger>
                        <S.Value placeholder={t('sustainableFishing.selectDuration')} />
                      </S.Trigger>
                      <S.Content>
                        {selectedLicense.duration.map((duration, index) => (
                          <S.Item key={duration} value={duration} index={index}>
                            <S.ItemText>{duration}</S.ItemText>
                          </S.Item>
                        ))}
                      </S.Content>
                    </S>
                  </Y>
                  
                  {selectedDuration && (
                    <Y space="$2" marginTop="$2">
                      <T fontWeight="bold">{t('sustainableFishing.licenseFee')}</T>
                      <T fontSize="$6" color="$blue9">{selectedLicense.fees[selectedDuration]}</T>
                    </Y>
                  )}
                  
                  <B 
                    marginTop="$3"
                    backgroundColor="$green9"
                    onPress={handleApplyForLicense}
                    disabled={!selectedDuration}
                  >
                    {t('sustainableFishing.applyForLicense')}
                  </B>
                </Y>
              </C>
            )}
          </Y>
          
          <Y space="$3">
            <T fontSize="$5" fontWeight="bold">{t('sustainableFishing.requiredDocuments')}</T>
            
            <Y space="$2">
              <X space="$2" alignItems="center">
                <Feather name="check-circle" size={16} color="#0891b2" />
                <T>{t('sustainableFishing.identificationCard')}</T>
              </X>
              <X space="$2" alignItems="center">
                <Feather name="check-circle" size={16} color="#0891b2" />
                <T>{t('sustainableFishing.passportPhotos')}</T>
              </X>
              <X space="$2" alignItems="center">
                <Feather name="check-circle" size={16} color="#0891b2" />
                <T>{t('sustainableFishing.proofOfResidence')}</T>
              </X>
              <X space="$2" alignItems="center">
                <Feather name="check-circle" size={16} color="#0891b2" />
                <T>{t('sustainableFishing.applicationFee')}</T>
              </X>
              {selectedLicenseType === 'commercial' && (
                <X space="$2" alignItems="center">
                  <Feather name="check-circle" size={16} color="#0891b2" />
                  <T>{t('sustainableFishing.businessRegistration')}</T>
                </X>
              )}
            </Y>
          </Y>
          
          <C borderRadius="$4" backgroundColor="$green2" borderColor="$green7" bordered>
            <Y padding="$4" space="$2">
              <X space="$2" alignItems="center">
                <Feather name="phone" size={20} color="#059669" />
                <T fontSize="$4" fontWeight="bold">{t('sustainableFishing.contactForInquiries')}</T>
              </X>
              <P paddingLeft="$6">
                {t('sustainableFishing.fishingLicenseContact', 'For inquiries about fishing licenses, contact the Fisheries Department at +254 20 123 4567 or email licenses@fisheries.go.ke')}
              </P>
            </Y>
          </C>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
