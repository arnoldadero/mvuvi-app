import React from 'react';
import { YStack, Text, RadioGroup, XStack, Label, Separator } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { AccountType } from '../../store/auth/auth-store';

interface AccountTypeSelectorProps {
  selectedType: AccountType;
  onSelectType: (type: AccountType) => void;
  showAdminOption?: boolean;
}

export function AccountTypeSelector({
  selectedType,
  onSelectType,
  showAdminOption = false,
}: AccountTypeSelectorProps) {
  const { t } = useTranslation();

  return (
    <YStack space="$4">
      <Text fontSize="$5" fontWeight="bold">
        {t('profile.selectAccountType')}
      </Text>
      
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onSelectType(value as AccountType)}
      >
        <YStack space="$4">
          <XStack>
            <RadioGroup.Item value={AccountType.PERSONAL} id="personal">
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <Label htmlFor="personal" paddingLeft="$2">
              <YStack>
                <Text fontWeight="bold">{t('profile.personalAccount')}</Text>
                <Text fontSize="$3" color="$gray10">
                  {t('profile.personalAccountDescription')}
                </Text>
              </YStack>
            </Label>
          </XStack>
          
          <Separator />
          
          <XStack>
            <RadioGroup.Item value={AccountType.BUSINESS_BOAT_OWNER} id="boat_owner">
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <Label htmlFor="boat_owner" paddingLeft="$2">
              <YStack>
                <Text fontWeight="bold">{t('profile.boatOwnerAccount')}</Text>
                <Text fontSize="$3" color="$gray10">
                  {t('profile.boatOwnerAccountDescription')}
                </Text>
              </YStack>
            </Label>
          </XStack>
          
          <XStack>
            <RadioGroup.Item value={AccountType.BUSINESS_DISTRIBUTOR} id="distributor">
              <RadioGroup.Indicator />
            </RadioGroup.Item>
            <Label htmlFor="distributor" paddingLeft="$2">
              <YStack>
                <Text fontWeight="bold">{t('profile.distributorAccount')}</Text>
                <Text fontSize="$3" color="$gray10">
                  {t('profile.distributorAccountDescription')}
                </Text>
              </YStack>
            </Label>
          </XStack>
          
          {showAdminOption && (
            <>
              <Separator />
              
              <XStack>
                <RadioGroup.Item value={AccountType.ADMIN} id="admin">
                  <RadioGroup.Indicator />
                </RadioGroup.Item>
                <Label htmlFor="admin" paddingLeft="$2">
                  <YStack>
                    <Text fontWeight="bold">{t('profile.adminAccount')}</Text>
                    <Text fontSize="$3" color="$gray10">
                      {t('profile.adminAccountDescription')}
                    </Text>
                  </YStack>
                </Label>
              </XStack>
            </>
          )}
        </YStack>
      </RadioGroup>
    </YStack>
  );
}
