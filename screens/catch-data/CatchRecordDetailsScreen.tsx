import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, Alert, Share } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, Separator } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore, CatchRecord } from '../../services/catch-data/catchDataStore';
import { ArrowLeft, Share2, Edit, Trash } from '@tamagui/lucide-icons';
import { format } from 'date-fns';

interface CatchRecordDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      catchId: string;
    };
  };
}

export function CatchRecordDetailsScreen({ navigation, route }: CatchRecordDetailsScreenProps) {
  const { catchId } = route.params;
  const { t } = useTranslation();
  const { 
    catchRecords, 
    isLoadingRecords,
    isDeletingRecord,
    error,
    fetchCatchRecords,
    deleteCatchRecord,
    clearError
  } = useCatchDataStore();

  const [catchRecord, setCatchRecord] = useState<CatchRecord | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (catchRecords.length === 0) {
        await fetchCatchRecords();
      }
      
      const record = catchRecords.find(r => r.id === catchId);
      setCatchRecord(record || null);
    };
    
    loadData();
  }, [catchId, catchRecords, fetchCatchRecords]);

  useEffect(() => {
    if (error) {
      Alert.alert(t('common.error'), error);
      clearError();
    }
  }, [error, clearError, t]);

  const handleDelete = async () => {
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
            await deleteCatchRecord(catchId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    // Navigate to edit screen with catch record data
    navigation.navigate('EditCatchRecord', { catchId });
  };

  const handleShare = async () => {
    if (!catchRecord) return;
    
    try {
      const formattedDate = formatDate(catchRecord.date);
      
      const message = `${t('catchData.shareMessage')}
      
${t('catchData.fishSpecies')}: ${catchRecord.fishSpecies}
${t('catchData.quantity')}: ${catchRecord.quantity} ${catchRecord.unit}
${t('catchData.location')}: ${catchRecord.location}
${t('catchData.date')}: ${formattedDate}
${t('catchData.gearUsed')}: ${catchRecord.gearUsed}
${t('catchData.effortHours')}: ${catchRecord.effortHours} ${t('catchData.hours')}
${catchRecord.notes ? `${t('catchData.notes')}: ${catchRecord.notes}` : ''}

${t('app.name')} - ${t('app.slogan')}`;
      
      await Share.share({
        message,
      });
    } catch (error) {
      Alert.alert(t('common.error'), t('catchData.shareError'));
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString;
    }
  };

  if (isLoadingRecords) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <YStack flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#0000ff" />
        </YStack>
      </SafeAreaView>
    );
  }

  if (!catchRecord) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <YStack padding="$4" space="$4">
          <Button
            icon={<ArrowLeft />}
            variant="outlined"
            onPress={() => navigation.goBack()}
          >
            {t('common.back')}
          </Button>
          <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$10">
            <Text>{t('catchData.recordNotFound')}</Text>
          </YStack>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <Button
              icon={<ArrowLeft />}
              variant="outlined"
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </Button>
            
            <Button
              icon={<Share2 />}
              variant="outlined"
              onPress={handleShare}
            >
              {t('common.share')}
            </Button>
          </XStack>
          
          <H2>{catchRecord.fishSpecies}</H2>
          <Paragraph>{formatDate(catchRecord.date)}</Paragraph>
          
          <Card borderRadius="$4" bordered>
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold" fontSize="$5">{t('catchData.catchDetails')}</Text>
              
              <YStack space="$3">
                <XStack justifyContent="space-between">
                  <Text>{t('catchData.quantity')}</Text>
                  <Text fontWeight="bold">
                    {catchRecord.quantity} {catchRecord.unit}
                  </Text>
                </XStack>
                
                <Separator />
                
                <XStack justifyContent="space-between">
                  <Text>{t('catchData.location')}</Text>
                  <Text>{catchRecord.location}</Text>
                </XStack>
                
                <Separator />
                
                <XStack justifyContent="space-between">
                  <Text>{t('catchData.gearUsed')}</Text>
                  <Text>{catchRecord.gearUsed}</Text>
                </XStack>
                
                <Separator />
                
                <XStack justifyContent="space-between">
                  <Text>{t('catchData.effortHours')}</Text>
                  <Text>{catchRecord.effortHours} {t('catchData.hours')}</Text>
                </XStack>
                
                {catchRecord.notes && (
                  <>
                    <Separator />
                    <YStack>
                      <Text>{t('catchData.notes')}</Text>
                      <Text paddingTop="$2">{catchRecord.notes}</Text>
                    </YStack>
                  </>
                )}
              </YStack>
            </YStack>
          </Card>
          
          {/* Action Buttons */}
          <XStack space="$2">
            <Button
              flex={1}
              icon={<Edit />}
              onPress={handleEdit}
            >
              {t('common.edit')}
            </Button>
            
            <Button
              flex={1}
              icon={<Trash />}
              color="$red9"
              variant="outlined"
              onPress={handleDelete}
              disabled={isDeletingRecord}
            >
              {isDeletingRecord ? (
                <ActivityIndicator size="small" color="$red9" />
              ) : (
                t('common.delete')
              )}
            </Button>
          </XStack>
          
          {/* Catch Insights */}
          <Card borderRadius="$4" backgroundColor="$blue2">
            <YStack padding="$4" space="$2">
              <Text fontWeight="bold">{t('catchData.insights')}</Text>
              <Paragraph fontSize="$2">
                {t('catchData.insightsDescription')}
              </Paragraph>
              <Button
                marginTop="$2"
                onPress={() => navigation.navigate('CatchInsights', { catchId })}
              >
                {t('catchData.viewInsights')}
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
