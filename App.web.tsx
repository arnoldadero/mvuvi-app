import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import './localization/i18n';
import { useTranslation } from 'react-i18next';

// Simple web-specific version of the app
export default function App() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mvuvi App</Text>
        <Text style={styles.subtitle}>{t('common.webNotSupported')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>
          {t('common.webMessage')}
        </Text>
        <Text style={styles.instruction}>
          {t('common.downloadInstructions')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
