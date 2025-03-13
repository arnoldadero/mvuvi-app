import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, View } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore, CatchRecord } from '../../services/catch-data/catchDataStore';
import { ChevronRight, Plus, Trash } from '@tamagui/lucide-icons';
import { format } from 'date-fns';

interface CatchDataScreenProps {
  navigation: any;
}

export function CatchDataScreen({ navigation }: CatchDataScreenProps) {
  const { t } = useTranslation();
  const { 
    catchRecords, 
    statistics,
    isLoadingRecords,
    isDeletingRecord,
    error,
    fetchCatchRecords,
    calculateStatistics,
    deleteCatchRecord,
    clearError
  } = useCatchDataStore();

  useEffect(() => {
    const loadData = async () => {
      await fetchCatchRecords();
      await calculateStatistics();
    };
    
    loadData();
    
    // Set up navigation listener to refresh data when screen is focused
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [fetchCatchRecords, calculateStatistics, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('common.error'), error);
      clearError();
    }
  }, [error, clearError, t]);

  const handleAddCatch = () => {
    navigation.navigate('AddCatchRecord');
  };

  const handleViewCatchDetails = (catchRecord: CatchRecord) => {
    navigation.navigate('CatchRecordDetails', { catchId: catchRecord.id });
  };

  const handleDeleteCatch = async (id: string) => {
    Alert.alert(
      t('catchData.confirmDelete'),
      t('catchData.confirmDeleteMessage'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            await deleteCatchRecord(id);
            await calculateStatistics();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H2>{t('catchData.title')}</H2>
            <Button
              size="$3"
              backgroundColor="$blue9"
              color="white"
              icon={<Plus color="white" />}
              onPress={handleAddCatch}
            >
              {t('catchData.addCatch')}
            </Button>
          </XStack>
          
          <Paragraph>{t('catchData.description')}</Paragraph>
          
          {/* Statistics Card */}
          <Card borderRadius="$4" bordered>
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold" fontSize="$5">{t('catchData.statistics')}</Text>
              
              {isLoadingRecords ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : !statistics ? (
                <Text>{t('catchData.noStatistics')}</Text>
              ) : (
                <YStack space="$2">
                  <XStack justifyContent="space-between">
                    <Text>{t('catchData.totalCatches')}</Text>
                    <Text fontWeight="bold">{statistics.totalCatches}</Text>
                  </XStack>
                  
                  <XStack justifyContent="space-between">
                    <Text>{t('catchData.totalQuantity')}</Text>
                    <Text fontWeight="bold">{statistics.totalQuantity.toFixed(2)} kg</Text>
                  </XStack>
                  
                  <XStack justifyContent="space-between">
                    <Text>{t('catchData.mostCaughtSpecies')}</Text>
                    <Text fontWeight="bold">{statistics.mostCaughtSpecies}</Text>
                  </XStack>
                  
                  <XStack justifyContent="space-between">
                    <Text>{t('catchData.averageEffortHours')}</Text>
                    <Text fontWeight="bold">{statistics.averageEffortHours.toFixed(1)} hrs</Text>
                  </XStack>
                  
                  <XStack justifyContent="space-between">
                    <Text>{t('catchData.bestLocation')}</Text>
                    <Text fontWeight="bold">{statistics.bestLocation}</Text>
                  </XStack>
                </YStack>
              )}
              
              <Button
                variant="outlined"
                onPress={() => navigation.navigate('CatchStatistics')}
              >
                {t('catchData.viewDetailedStats')}
              </Button>
            </YStack>
          </Card>
          
          {/* Recent Catches */}
          <YStack space="$2">
            <Text fontWeight="bold" fontSize="$5">{t('catchData.recentCatches')}</Text>
            
            {isLoadingRecords ? (
              <YStack alignItems="center" padding="$4">
                <ActivityIndicator size="small" color="#0000ff" />
              </YStack>
            ) : catchRecords.length === 0 ? (
              <Card padding="$4" marginTop="$2">
                <Text textAlign="center">{t('catchData.noCatchesRecorded')}</Text>
              </Card>
            ) : (
              <YStack space="$3">
                {catchRecords.map((catchRecord) => (
                  <Card 
                    key={catchRecord.id} 
                    borderRadius="$4" 
                    bordered
                    pressStyle={{ opacity: 0.8 }}
                    onPress={() => handleViewCatchDetails(catchRecord)}
                  >
                    <YStack>
                      <XStack 
                        backgroundColor="$blue2" 
                        padding="$3"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottomWidth={1}
                        borderBottomColor="$gray5"
                      >
                        <Text fontWeight="bold">{catchRecord.fishSpecies}</Text>
                        <Text fontSize="$2" color="$gray9">
                          {formatDate(catchRecord.date)}
                        </Text>
                      </XStack>
                      
                      <YStack padding="$3" space="$2">
                        <XStack justifyContent="space-between">
                          <Text>{t('catchData.quantity')}</Text>
                          <Text fontWeight="bold">
                            {catchRecord.quantity} {catchRecord.unit}
                          </Text>
                        </XStack>
                        
                        <XStack justifyContent="space-between">
                          <Text>{t('catchData.location')}</Text>
                          <Text>{catchRecord.location}</Text>
                        </XStack>
                        
                        <XStack justifyContent="space-between">
                          <Text>{t('catchData.gearUsed')}</Text>
                          <Text>{catchRecord.gearUsed}</Text>
                        </XStack>
                      </YStack>
                      
                      <XStack 
                        padding="$2"
                        justifyContent="space-between"
                        backgroundColor="$gray1"
                      >
                        <Button
                          size="$2"
                          variant="outlined"
                          color="$red9"
                          icon={<Trash size="$1" color="$red9" />}
                          onPress={() => handleDeleteCatch(catchRecord.id)}
                          disabled={isDeletingRecord}
                        >
                          {t('common.delete')}
                        </Button>
                        
                        <Button
                          size="$2"
                          variant="outlined"
                          icon={<ChevronRight size="$1" />}
                          onPress={() => handleViewCatchDetails(catchRecord)}
                        >
                          {t('common.details')}
                        </Button>
                      </XStack>
                    </YStack>
                  </Card>
                ))}
              </YStack>
            )}
          </YStack>
          
          {/* Export Data Card */}
          <Card borderRadius="$4" backgroundColor="$blue2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('catchData.exportData')}</Text>
              <Paragraph fontSize="$2">
                {t('catchData.exportDescription')}
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => navigation.navigate('ExportCatchData')}
              >
                {t('catchData.export')}
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
