import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, Alert, Share } from 'react-native';
import { YStack, H2, Text, Card, Button, XStack, Paragraph, ScrollView, Separator } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useCatchDataStore, CatchRecord } from '../../services/catch-data/catchDataStore';
import { ArrowLeft, Share2, Edit3, Trash } from '@tamagui/lucide-icons';
import { format } from 'date-fns';

interface CatchRecordDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      catchId: string;
    };
  };
}

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const T: any = Text;
const C: any = Card;
const B: any = Button;
const X: any = XStack;
const P: any = Paragraph;
const S: any = ScrollView;
const Sep: any = Separator;

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
        <Y flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="#0000ff" />
        </Y>
      </SafeAreaView>
    );
  }

  if (!catchRecord) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Y padding="$4" space="$4">
          <B
            icon={<ArrowLeft size={"$4" as any} />}
            variant="outlined"
            onPress={() => navigation.goBack()}
          >
            {t('common.back')}
          </B>
          <Y flex={1} justifyContent="center" alignItems="center" paddingVertical="$10">
            <T>{t('catchData.recordNotFound')}</T>
          </Y>
        </Y>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <S>
        <Y padding="$4" space="$4">
          <X justifyContent="space-between" alignItems="center">
            <B
              icon={<ArrowLeft size={"$4" as any} />}
              variant="outlined"
              onPress={() => navigation.goBack()}
            >
              {t('common.back')}
            </B>
            
            <B
              icon={<Share2 size={"$4" as any} />}
              variant="outlined"
              onPress={handleShare}
            >
              {t('common.share')}
            </B>
          </X>
          
          <H>{catchRecord.fishSpecies}</H>
          <P>{formatDate(catchRecord.date)}</P>
          
          <C borderRadius="$4" bordered>
            <Y padding="$4" space="$3">
              <T fontWeight="bold" fontSize="$5">{t('catchData.catchDetails')}</T>
              
              <Y space="$3">
                <X justifyContent="space-between">
                  <T>{t('catchData.quantity')}</T>
                  <T fontWeight="bold">
                    {catchRecord.quantity} {catchRecord.unit}
                  </T>
                </X>
                
                <Sep />
                
                <X justifyContent="space-between">
                  <T>{t('catchData.location')}</T>
                  <T>{catchRecord.location}</T>
                </X>
                
                <Sep />
                
                <X justifyContent="space-between">
                  <T>{t('catchData.gearUsed')}</T>
                  <T>{catchRecord.gearUsed}</T>
                </X>
                
                <Sep />
                
                <X justifyContent="space-between">
                  <T>{t('catchData.effortHours')}</T>
                  <T>{catchRecord.effortHours} {t('catchData.hours')}</T>
                </X>
                
                {catchRecord.notes && (
                  <>
                    <Sep />
                    <Y space="$2">
                      <T>{t('catchData.notes')}</T>
                      <T>{catchRecord.notes}</T>
                    </Y>
                  </>
                )}
              </Y>
            </Y>
          </C>
          
          {/* Map section if coordinates are available */}
          {catchRecord.latitude && catchRecord.longitude && (
            <C borderRadius="$4" bordered>
              <Y padding="$4" space="$3">
                <T fontWeight="bold" fontSize="$5">{t('catchData.location')}</T>
                {/* Map component would go here */}
                <Y 
                  height={200} 
                  backgroundColor="$gray3" 
                  justifyContent="center" 
                  alignItems="center"
                  borderRadius="$2"
                >
                  <T>{t('catchData.mapUnavailable')}</T>
                </Y>
              </Y>
            </C>
          )}
          
          <X space="$4" justifyContent="center" marginTop="$4">
            <B
              icon={<Edit3 size={"$4" as any} />}
              variant="outlined"
              onPress={handleEdit}
            >
              {t('common.edit')}
            </B>
            
            <B
              icon={<Trash size={"$4" as any} />}
              variant="outlined"
              theme="red"
              onPress={handleDelete}
              disabled={isDeletingRecord}
            >
              {isDeletingRecord ? t('common.deleting') : t('common.delete')}
            </B>
          </X>
        </Y>
      </S>
    </SafeAreaView>
  );
}
