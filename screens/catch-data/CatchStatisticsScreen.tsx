import React, { useEffect } from 'react';
import { ScrollView, ActivityIndicator, Alert } from 'react-native';
import { YStack, Text, Card, XStack, H3, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore } from '../../services/catch-data/catchDataStore';
import { RefreshCw, Fish, MapPin, Clock, Scale } from '@tamagui/lucide-icons';

// Type aliases for Tamagui components
const Y = YStack;
const T = Text;
const C = Card;
const X = XStack;
const H = H3;
const B = Button;

export function CatchStatisticsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const {
    statistics,
    catchRecords,
    isCalculatingStats,
    error,
    calculateStatistics,
    clearError
  } = useCatchDataStore();

  useEffect(() => {
    calculateStatistics();
  }, [calculateStatistics, catchRecords]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('common.error'), error);
      clearError();
    }
  }, [error, clearError, t]);

  // Calculate monthly statistics
  const getMonthlyData = () => {
    const monthlyData: Record<string, { count: number; quantity: number }> = {};

    catchRecords.forEach(record => {
      const date = new Date(record.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { count: 0, quantity: 0 };
      }

      monthlyData[monthYear].count += 1;
      monthlyData[monthYear].quantity += record.quantity;
    });

    // Convert to array and sort by date
    return Object.entries(monthlyData)
      .map(([monthYear, data]) => {
        const [year, month] = monthYear.split('-').map(Number);
        return {
          monthYear,
          month,
          year,
          count: data.count,
          quantity: data.quantity,
          label: new Date(year, month - 1).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return a.month - b.month;
      })
      .slice(-6); // Get last 6 months
  };

  const monthlyData = getMonthlyData();

  // Find the maximum monthly catch count for scaling the chart
  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count), 1);

  if (isCalculatingStats) {
    return (
      <Y flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#0891b2" />
        <T marginTop="$2">{t('common.loading')}</T>
      </Y>
    );
  }

  if (!statistics || catchRecords.length === 0) {
    return (
      <Y flex={1} justifyContent="center" alignItems="center" padding="$4">
        <T textAlign="center">{t('catchData.noStatistics')}</T>
        <B
          marginTop="$4"
          onPress={() => navigation.navigate('CatchData', { screen: 'record' })}
        >
          {t('catch.recordCatch')}
        </B>
      </Y>
    );
  }

  return (
    <ScrollView>
      <Y padding="$4" space="$4">
        <X justifyContent="space-between" alignItems="center">
          <H>{t('catchData.statistics')}</H>
          <B
            icon={<RefreshCw size={16} />}
            variant="outlined"
            onPress={calculateStatistics}
            disabled={isCalculatingStats}
          >
            {t('common.refresh')}
          </B>
        </X>

        {/* Summary Cards */}
        <X flexWrap="wrap" marginHorizontal="$-2">
          <Y width="50%" paddingHorizontal="$2" paddingBottom="$2">
            <C bordered padding="$3">
                <X alignItems="center" space="$2">
                  <Fish size={20} color="#0891b2" />
                  <T fontSize="$2" color="$gray10">{t('catchData.totalCatches')}</T>
                </X>
                <T fontSize="$7" fontWeight="bold" color="$blue9">{statistics.totalCatches}</T>
            </C>
          </Y>

          <Y width="50%" paddingHorizontal="$2" paddingBottom="$2">
            <C bordered padding="$3">
                <X alignItems="center" space="$2">
                  <Scale size={20} color="#0891b2" />
                  <T fontSize="$2" color="$gray10">{t('catchData.totalQuantity')}</T>
                </X>
                <T fontSize="$7" fontWeight="bold" color="$blue9">{statistics.totalQuantity.toFixed(1)}</T>
            </C>
          </Y>

          <Y width="50%" paddingHorizontal="$2" paddingBottom="$2">
            <C bordered padding="$3">
                <X alignItems="center" space="$2">
                  <Clock size={20} color="#0891b2" />
                  <T fontSize="$2" color="$gray10">{t('catchData.averageEffortHours')}</T>
                </X>
                <T fontSize="$7" fontWeight="bold" color="$blue9">{statistics.averageEffortHours.toFixed(1)}</T>
            </C>
          </Y>

          <Y width="50%" paddingHorizontal="$2" paddingBottom="$2">
            <C bordered padding="$3">
                <X alignItems="center" space="$2">
                  <MapPin size={20} color="#0891b2" />
                  <T fontSize="$2" color="$gray10">{t('catchData.bestLocation')}</T>
                </X>
                <T fontSize="$5" fontWeight="bold" color="$blue9" numberOfLines={1}>{statistics.bestLocation}</T>
            </C>
          </Y>
        </X>

        {/* Most Caught Species */}
        <C bordered padding="$4">
            <T fontWeight="bold" fontSize="$5" marginBottom="$2">{t('catchData.mostCaughtSpecies')}</T>
            <X alignItems="center" space="$2">
              <Fish size={24} color="#0891b2" />
              <T fontSize="$6" fontWeight="bold">{statistics.mostCaughtSpecies}</T>
            </X>
        </C>

        {/* Monthly Catch Chart */}
        <C bordered padding="$4">
            <T fontWeight="bold" fontSize="$5" marginBottom="$3">{t('catchData.monthlyCatches')}</T>

            <Y height={200} space="$2">
              <X height={180} justifyContent="space-between">
                {monthlyData.map((data, index) => (
                  <Y key={data.monthYear} alignItems="center" flex={1}>
                    <Y
                      height={160}
                      justifyContent="flex-end"
                      alignItems="center"
                      paddingBottom="$2"
                    >
                      <Y
                        width={20}
                        backgroundColor="$blue9"
                        borderRadius="$2"
                        height={`${(data.count / maxMonthlyCount) * 100}%`}
                      />
                    </Y>
                    <T fontSize="$2">{data.label}</T>
                  </Y>
                ))}
              </X>
            </Y>
        </C>

        {/* Species Distribution */}
        <C bordered padding="$4">
            <T fontWeight="bold" fontSize="$5" marginBottom="$3">{t('catchData.speciesDistribution')}</T>

            <Y space="$3">
              {Object.entries(
                catchRecords.reduce((acc, record) => {
                  acc[record.fishSpecies] = (acc[record.fishSpecies] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([species, count]) => {
                  const percentage = (count / statistics.totalCatches) * 100;
                  return (
                    <Y key={species} space="$1">
                      <X justifyContent="space-between">
                        <T fontSize="$3">{species}</T>
                        <T fontSize="$3">{count} ({percentage.toFixed(1)}%)</T>
                      </X>
                      <Y height={8} backgroundColor="$gray3" borderRadius="$1">
                        <Y
                          height={8}
                          width={`${percentage}%`}
                          backgroundColor="$blue9"
                          borderRadius="$1"
                        />
                      </Y>
                    </Y>
                  );
                })}
            </Y>
        </C>
      </Y>
    </ScrollView>
  );
}
