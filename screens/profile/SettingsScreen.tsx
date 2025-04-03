import React, { useState } from 'react';
import { Alert, ScrollView, Switch as RNSwitch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { 
  YStack, XStack, Text, Button, Card, H4, Paragraph, 
  Separator, Switch, Select, Sheet, H5
} from 'tamagui';
import { Feather } from '@expo/vector-icons';

import { useAuthStore } from '../../store/auth/auth-store';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { LanguageSelector } from '../../components/common/LanguageSelector';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const B: any = Button;
const C: any = Card;
const H: any = H4;
const P: any = Paragraph;
const S: any = Switch;
const Sel: any = Select;
const Sh: any = Sheet;
const H5C: any = H5;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { t, i18n } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signOut } = useAuthStore();
  
  // Settings state
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    locationSharingEnabled: true,
    darkMode: false,
    offlineMode: false,
    distanceUnit: 'km',
    weightUnit: 'kg',
    temperatureUnit: 'celsius',
  });
  
  // About sheet
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  
  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    });
  };
  
  const handleLogout = async () => {
    Alert.alert(
      t('auth.logoutConfirm'),
      t('profile.logoutDescription'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('auth.logout'),
          onPress: async () => {
            await signOut();
            nav.navigate('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleValueChange = (setting: keyof typeof settings, value: any) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };
  
  return (
    <ScrollView>
      <Y $padding={"$4" as any} $space={"$4" as any}>
        {/* Language settings */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.language')}</H>
            <P>{t('settings.languageDescription')}</P>
            
            <LanguageSelector />
          </Y>
        </C>
        
        {/* Notification settings */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.notifications')}</H>
            
            <X $justifyContent="space-between" $alignItems="center">
              <T>{t('settings.enableNotifications')}</T>
              <S
                checked={settings.notificationsEnabled}
                onCheckedChange={() => handleToggleSetting('notificationsEnabled')}
              >
                <S.Thumb animation="quick" />
              </S>
            </X>
            
            {settings.notificationsEnabled && (
              <Y $space={"$3" as any} $paddingTop={"$2" as any}>
                <Y $space={"$2" as any}>
                  <T $fontWeight="bold">{t('settings.notificationTypes')}</T>
                  
                  <X $justifyContent="space-between" $alignItems="center" $paddingLeft={"$4" as any}>
                    <T>{t('settings.weatherAlerts')}</T>
                    <S size={"$2" as any} defaultChecked>
                      <S.Thumb animation="quick" />
                    </S>
                  </X>
                  
                  <X $justifyContent="space-between" $alignItems="center" $paddingLeft={"$4" as any}>
                    <T>{t('settings.marketPriceAlerts')}</T>
                    <S size={"$2" as any} defaultChecked>
                      <S.Thumb animation="quick" />
                    </S>
                  </X>
                  
                  <X $justifyContent="space-between" $alignItems="center" $paddingLeft={"$4" as any}>
                    <T>{t('settings.safetyAlerts')}</T>
                    <S size={"$2" as any} defaultChecked>
                      <S.Thumb animation="quick" />
                    </S>
                  </X>
                </Y>
              </Y>
            )}
          </Y>
        </C>
        
        {/* Privacy settings */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.privacy')}</H>
            
            <X $justifyContent="space-between" $alignItems="center">
              <T>{t('settings.locationSharing')}</T>
              <S
                checked={settings.locationSharingEnabled}
                onCheckedChange={() => handleToggleSetting('locationSharingEnabled')}
              >
                <S.Thumb animation="quick" />
              </S>
            </X>
            
            <P $fontSize={"$2" as any} $color="$gray10">
              {t('settings.locationSharingDescription')}
            </P>
          </Y>
        </C>
        
        {/* Appearance settings */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.appearance')}</H>
            
            <X $justifyContent="space-between" $alignItems="center">
              <T>{t('settings.darkMode')}</T>
              <S
                checked={settings.darkMode}
                onCheckedChange={() => handleToggleSetting('darkMode')}
              >
                <S.Thumb animation="quick" />
              </S>
            </X>
          </Y>
        </C>
        
        {/* Unit preferences */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.unitPreferences')}</H>
            
            <Y $space={"$3" as any}>
              <T>{t('settings.distanceUnit')}</T>
              <Sel
                value={settings.distanceUnit}
                onValueChange={(value: string) => handleValueChange('distanceUnit', value)}
              >
                <Sel.Trigger>
                  <Sel.Value placeholder={t('settings.selectUnit')} />
                </Sel.Trigger>
                
                <Sel.Content>
                  <Sel.ScrollUpButton />
                  <Sel.Viewport>
                    <Sel.Group>
                      <Sel.Label>{t('settings.selectUnit')}</Sel.Label>
                      <Sel.Item value="km">
                        <Sel.ItemText>Kilometers (km)</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                      <Sel.Item value="miles">
                        <Sel.ItemText>Miles</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                    </Sel.Group>
                  </Sel.Viewport>
                  <Sel.ScrollDownButton />
                </Sel.Content>
              </Sel>
            </Y>
            
            <Y $space={"$3" as any}>
              <T>{t('settings.weightUnit')}</T>
              <Sel
                value={settings.weightUnit}
                onValueChange={(value: string) => handleValueChange('weightUnit', value)}
              >
                <Sel.Trigger>
                  <Sel.Value placeholder={t('settings.selectUnit')} />
                </Sel.Trigger>
                
                <Sel.Content>
                  <Sel.ScrollUpButton />
                  <Sel.Viewport>
                    <Sel.Group>
                      <Sel.Label>{t('settings.selectUnit')}</Sel.Label>
                      <Sel.Item value="kg">
                        <Sel.ItemText>Kilograms (kg)</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                      <Sel.Item value="lbs">
                        <Sel.ItemText>Pounds (lbs)</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                    </Sel.Group>
                  </Sel.Viewport>
                  <Sel.ScrollDownButton />
                </Sel.Content>
              </Sel>
            </Y>
            
            <Y $space={"$3" as any}>
              <T>{t('settings.temperatureUnit')}</T>
              <Sel
                value={settings.temperatureUnit}
                onValueChange={(value: string) => handleValueChange('temperatureUnit', value)}
              >
                <Sel.Trigger>
                  <Sel.Value placeholder={t('settings.selectUnit')} />
                </Sel.Trigger>
                
                <Sel.Content>
                  <Sel.ScrollUpButton />
                  <Sel.Viewport>
                    <Sel.Group>
                      <Sel.Label>{t('settings.selectUnit')}</Sel.Label>
                      <Sel.Item value="celsius">
                        <Sel.ItemText>Celsius (°C)</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                      <Sel.Item value="fahrenheit">
                        <Sel.ItemText>Fahrenheit (°F)</Sel.ItemText>
                        <Sel.ItemIndicator />
                      </Sel.Item>
                    </Sel.Group>
                  </Sel.Viewport>
                  <Sel.ScrollDownButton />
                </Sel.Content>
              </Sel>
            </Y>
          </Y>
        </C>
        
        {/* Data management */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.dataManagement')}</H>
            
            <X $justifyContent="space-between" $alignItems="center">
              <T>{t('settings.offlineMode')}</T>
              <S
                checked={settings.offlineMode}
                onCheckedChange={() => handleToggleSetting('offlineMode')}
              >
                <S.Thumb animation="quick" />
              </S>
            </X>
            
            <P $fontSize={"$2" as any} $color="$gray10">
              {t('settings.offlineModeDescription')}
            </P>
            
            <B 
              $marginTop={"$2" as any}
              variant="outlined"
              icon={<Feather name="download" size={16} />}
            >
              {t('settings.syncData')}
            </B>
            
            <B 
              $marginTop={"$2" as any}
              variant="outlined"
              theme="red"
              icon={<Feather name="trash-2" size={16} />}
            >
              {t('settings.clearCache')}
            </B>
          </Y>
        </C>
        
        {/* About and Help */}
        <C $padding={"$4" as any} $bordered>
          <Y $space={"$3" as any}>
            <H>{t('settings.helpSupport')}</H>
            
            <B 
              variant="outlined"
              $marginTop={"$2" as any}
              icon={<Feather name="help-circle" size={16} />}
              onPress={() => navigation.navigate('Help')}
            >
              {t('settings.help')}
            </B>
            
            <B 
              variant="outlined"
              $marginTop={"$2" as any}
              icon={<Feather name="info" size={16} />}
              onPress={() => setShowAboutSheet(true)}
            >
              {t('settings.about')}
            </B>
            
            <B 
              variant="outlined"
              $marginTop={"$2" as any}
              icon={<Feather name="mail" size={16} />}
            >
              {t('settings.contactSupport')}
            </B>
          </Y>
        </C>
        
        {/* Logout */}
        <B 
          $marginTop={"$4" as any}
          size={"$5" as any}
          theme="red"
          icon={<Feather name="log-out" size={16} />}
          onPress={handleLogout}
        >
          {t('auth.logout')}
        </B>
        
        {/* About Sheet */}
        <Sh
          modal
          open={showAboutSheet}
          onOpenChange={setShowAboutSheet}
          snapPoints={[45]}
          dismissOnSnapToBottom
        >
          <Sh.Overlay />
          <Sh.Frame $padding={"$4" as any}>
            <Sh.Handle />
            
            <Y $space={"$4" as any} $marginTop={"$4" as any} $alignItems="center">
              <H5C>{t('settings.aboutMvuvi')}</H5C>
              
              <Y $space={"$1" as any} $alignItems="center">
                <T $fontWeight="bold">Mvuvi v1.0.0</T>
                <T $fontSize={"$2" as any} $color="$gray10"> 2025 Mvuvi Team</T>
              </Y>
              
              <Y $space={"$4" as any} width="100%" $marginTop={"$4" as any}>
                <H5C $marginTop={"$4" as any}>{t('settings.aboutDescription')}</H5C>
                <P>
                  {t('settings.aboutContent')}
                </P>
                
                <H5C $marginTop={"$4" as any}>{t('settings.mission')}</H5C>
                <P>
                  {t('settings.missionContent')}
                </P>
              </Y>
            </Y>
          </Sh.Frame>
        </Sh>
      </Y>
    </ScrollView>
  );
}
