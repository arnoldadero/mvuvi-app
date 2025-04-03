import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from 'tamagui';
import i18n from '../../localization/i18n';

interface LanguageSelectorProps {
  minimal?: boolean;
}

export function LanguageSelector({ minimal = false }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  if (minimal) {
    return (
      <View style={styles.minimalContainer}>
        <Button
          size="$2"
          marginHorizontal="$1"
          theme={currentLanguage === 'en' ? 'active' : 'alt1'}
          onPress={() => changeLanguage('en')}
        >
          EN
        </Button>
        <Button
          size="$2"
          marginHorizontal="$1"
          theme={currentLanguage === 'sw' ? 'active' : 'alt1'}
          onPress={() => changeLanguage('sw')}
        >
          SW
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNText style={styles.label}>{t('common.selectLanguage')}</RNText>
      <View style={styles.buttonContainer}>
        <Button
          flex={1}
          marginHorizontal="$1"
          theme={currentLanguage === 'en' ? 'active' : 'alt1'}
          onPress={() => changeLanguage('en')}
        >
          {t('languages.english')}
        </Button>
        <Button
          flex={1}
          marginHorizontal="$1"
          theme={currentLanguage === 'sw' ? 'active' : 'alt1'}
          onPress={() => changeLanguage('sw')}
        >
          {t('languages.swahili')}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  container: {
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  minimalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  }
});
