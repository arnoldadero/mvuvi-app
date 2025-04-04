import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { YStack, Text, Card, XStack, Paragraph, Input, Select, Button } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore, CatchRecord } from '../../services/catch-data/catchDataStore';
import { format } from 'date-fns';
import { Search, Filter, Calendar } from '@tamagui/lucide-icons';
import { MoonPhaseIndicator } from '../../components/catch-data/MoonPhaseIndicator';

// Type aliases for Tamagui components
const Y = YStack;
const T = Text;
const C = Card;
const X = XStack;
const P = Paragraph;
const I = Input;
const Se = Select;
const B = Button;

export function CatchHistoryScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const { catchRecords, isLoadingRecords, error, fetchCatchRecords, clearError } = useCatchDataStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'quantity'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique fish species for filter dropdown
  const uniqueSpecies = [...new Set(catchRecords.map(record => record.fishSpecies))];

  // Filter and sort records
  const filteredRecords = catchRecords
    .filter(record => {
      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          record.fishSpecies.toLowerCase().includes(query) ||
          record.location.toLowerCase().includes(query) ||
          record.gearUsed.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(record => {
      // Apply species filter
      if (filterSpecies) {
        return record.fishSpecies === filterSpecies;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        // Sort by quantity
        return b.quantity - a.quantity;
      }
    });

  useEffect(() => {
    fetchCatchRecords();
  }, [fetchCatchRecords]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('common.error'), error);
      clearError();
    }
  }, [error, clearError, t]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleRecordPress = (record: CatchRecord) => {
    navigation.navigate('CatchRecordDetails', { catchId: record.id });
  };

  const renderCatchRecord = ({ item }: { item: CatchRecord }) => (
    <TouchableOpacity onPress={() => handleRecordPress(item)}>
      <C marginHorizontal="$4" marginBottom="$3" bordered padding="$3">
        <X justifyContent="space-between" alignItems="center">
          <Y>
            <T fontWeight="bold" fontSize="$5">{item.fishSpecies}</T>
            <P fontSize="$3" color="$gray11">{formatDate(item.date)}</P>
          </Y>
          <MoonPhaseIndicator date={new Date(item.date)} size={32} />
        </X>

        <X marginTop="$2" space="$4">
          <Y>
            <T fontSize="$2" color="$gray10">{t('catch.quantity')}</T>
            <T fontSize="$4">{item.quantity} {item.unit}</T>
          </Y>

          <Y>
            <T fontSize="$2" color="$gray10">{t('catch.location')}</T>
            <T fontSize="$4">{item.location}</T>
          </Y>
        </X>
      </C>
    </TouchableOpacity>
  );

  if (isLoadingRecords) {
    return (
      <Y flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#0891b2" />
        <T marginTop="$2">{t('common.loading')}</T>
      </Y>
    );
  }

  return (
    <Y flex={1} paddingTop="$4">
      <X paddingHorizontal="$4" marginBottom="$2" alignItems="center" space="$2">
        <I
          flex={1}
          placeholder={t('common.search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={16} />}
        />
        <B
          icon={<Filter size={16} />}
          variant="outlined"
          onPress={() => setShowFilters(!showFilters)}
        />
      </X>

      {showFilters && (
        <Y padding="$4" backgroundColor="$gray2" marginBottom="$2">
          <X space="$4" marginBottom="$2">
            <Y flex={1}>
              <T fontSize="$2" marginBottom="$1">{t('catch.filterBySpecies')}</T>
              <Se
                id="filter-species-select"
                value={filterSpecies || ''}
                onValueChange={(value: string) => {
                  console.log('Filter species:', value);
                  setFilterSpecies(value || null);
                }}
                native
              >
                <Se.Trigger id="filter-species-trigger">
                  <Se.Value placeholder={t('catch.allSpecies')} />
                </Se.Trigger>
                <Se.Content>
                  <Se.ScrollUpButton />
                  <Se.Viewport>
                    <Se.Group>
                      <Se.Item key="all" value="" index={0}>
                        <Se.ItemText>{t('catch.allSpecies')}</Se.ItemText>
                      </Se.Item>
                      {uniqueSpecies.map((species, index) => (
                        <Se.Item key={species} value={species} index={index + 1}>
                          <Se.ItemText>{species}</Se.ItemText>
                        </Se.Item>
                      ))}
                    </Se.Group>
                  </Se.Viewport>
                  <Se.ScrollDownButton />
                </Se.Content>
              </Se>
            </Y>

            <Y flex={1}>
              <T fontSize="$2" marginBottom="$1">{t('catch.sortBy')}</T>
              <Se
                id="sort-order-select"
                value={sortOrder}
                onValueChange={(value: string) => {
                  console.log('Sort order:', value);
                  setSortOrder(value as 'newest' | 'oldest' | 'quantity');
                }}
                native
              >
                <Se.Trigger id="sort-order-trigger">
                  <Se.Value />
                </Se.Trigger>
                <Se.Content>
                  <Se.ScrollUpButton />
                  <Se.Viewport>
                    <Se.Group>
                      <Se.Item value="newest" index={0}>
                        <Se.ItemText>{t('catch.newest')}</Se.ItemText>
                      </Se.Item>
                      <Se.Item value="oldest" index={1}>
                        <Se.ItemText>{t('catch.oldest')}</Se.ItemText>
                      </Se.Item>
                      <Se.Item value="quantity" index={2}>
                        <Se.ItemText>{t('catch.highestQuantity')}</Se.ItemText>
                      </Se.Item>
                    </Se.Group>
                  </Se.Viewport>
                  <Se.ScrollDownButton />
                </Se.Content>
              </Se>
            </Y>
          </X>

          <B
            onPress={() => {
              setFilterSpecies(null);
              setSearchQuery('');
              setSortOrder('newest');
            }}
          >
            {t('common.resetFilters')}
          </B>
        </Y>
      )}

      {filteredRecords.length === 0 ? (
        <Y flex={1} justifyContent="center" alignItems="center" padding="$4">
          <T textAlign="center">{t('catchData.noCatchesRecorded')}</T>
          <B
            marginTop="$4"
            onPress={() => navigation.navigate('CatchData', { screen: 'record' })}
          >
            {t('catch.recordCatch')}
          </B>
        </Y>
      ) : (
        <FlatList
          data={filteredRecords}
          renderItem={renderCatchRecord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
        />
      )}
    </Y>
  );
}
