import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { YStack, Tabs, Text, Button, XStack } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { RecordCatchScreen } from './RecordCatchScreen';
import { CatchHistoryScreen } from './CatchHistoryScreen';
import { CatchStatisticsScreen } from './CatchStatisticsScreen';
import { useCatchDataStore } from '../../services/catch-data/catchDataStore';
import { Plus, List, BarChart2 } from '@tamagui/lucide-icons';

// Type aliases for Tamagui components
const Y = YStack;
const T = Text;
const B = Button;
const X = XStack;

export function CatchDataScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const { fetchCatchRecords, calculateStatistics } = useCatchDataStore();
  const [activeTab, setActiveTab] = useState<string>('record');

  useEffect(() => {
    // Load data when the screen mounts
    const loadData = async () => {
      await fetchCatchRecords();
      await calculateStatistics();
    };

    loadData();
  }, [fetchCatchRecords, calculateStatistics]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Y flex={1}>
        <Tabs
          defaultValue="record"
          orientation="horizontal"
          flexDirection="column"
          flex={1}
          onValueChange={setActiveTab}
        >
          <Tabs.List
            disablePassBorderRadius="bottom"
            backgroundColor="$background"
          >
            <Tabs.Tab
              flex={1}
              value="record"
              backgroundColor={activeTab === 'record' ? '$blue2' : 'transparent'}
            >
              <X alignItems="center" space="$2" justifyContent="center">
                <Plus size={16} color={activeTab === 'record' ? '#0891b2' : '#666'} />
                <T color={activeTab === 'record' ? '#0891b2' : '#666'} fontWeight={activeTab === 'record' ? 'bold' : 'normal'}>
                  {t('catch.recordCatch')}
                </T>
              </X>
            </Tabs.Tab>

            <Tabs.Tab
              flex={1}
              value="history"
              backgroundColor={activeTab === 'history' ? '$blue2' : 'transparent'}
            >
              <X alignItems="center" space="$2" justifyContent="center">
                <List size={16} color={activeTab === 'history' ? '#0891b2' : '#666'} />
                <T color={activeTab === 'history' ? '#0891b2' : '#666'} fontWeight={activeTab === 'history' ? 'bold' : 'normal'}>
                  {t('catchData.catchHistory')}
                </T>
              </X>
            </Tabs.Tab>

            <Tabs.Tab
              flex={1}
              value="statistics"
              backgroundColor={activeTab === 'statistics' ? '$blue2' : 'transparent'}
            >
              <X alignItems="center" space="$2" justifyContent="center">
                <BarChart2 size={16} color={activeTab === 'statistics' ? '#0891b2' : '#666'} />
                <T color={activeTab === 'statistics' ? '#0891b2' : '#666'} fontWeight={activeTab === 'statistics' ? 'bold' : 'normal'}>
                  {t('catchData.statistics')}
                </T>
              </X>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Content value="record" flex={1}>
            <RecordCatchScreen navigation={navigation} />
          </Tabs.Content>

          <Tabs.Content value="history" flex={1}>
            <CatchHistoryScreen navigation={navigation} />
          </Tabs.Content>

          <Tabs.Content value="statistics" flex={1}>
            <CatchStatisticsScreen navigation={navigation} />
          </Tabs.Content>
        </Tabs>
      </Y>
    </SafeAreaView>
  );
}
