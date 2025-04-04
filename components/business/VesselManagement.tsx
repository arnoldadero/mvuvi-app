import React, { useState } from 'react';
import { YStack, XStack, Text, Card, Button, Input, Separator, Sheet, Spinner } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList } from 'react-native';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;
const S: any = Separator;

// Mock vessel data
const MOCK_VESSELS = [
  {
    id: '1',
    name: 'Fishing Vessel 1',
    registrationNumber: 'FV-001-2023',
    type: 'Trawler',
    capacity: '5 tons',
    crew: 8,
    status: 'active',
  },
  {
    id: '2',
    name: 'Fishing Vessel 2',
    registrationNumber: 'FV-002-2023',
    type: 'Longliner',
    capacity: '3 tons',
    crew: 5,
    status: 'maintenance',
  },
  {
    id: '3',
    name: 'Fishing Vessel 3',
    registrationNumber: 'FV-003-2023',
    type: 'Purse Seiner',
    capacity: '8 tons',
    crew: 12,
    status: 'active',
  },
];

interface Vessel {
  id: string;
  name: string;
  registrationNumber: string;
  type: string;
  capacity: string;
  crew: number;
  status: 'active' | 'maintenance' | 'inactive';
}

export function VesselManagement() {
  const { t } = useTranslation();
  const [vessels, setVessels] = useState<Vessel[]>(MOCK_VESSELS);
  const [isAddingVessel, setIsAddingVessel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newVessel, setNewVessel] = useState<Omit<Vessel, 'id'>>({
    name: '',
    registrationNumber: '',
    type: '',
    capacity: '',
    crew: 0,
    status: 'inactive',
  });

  const handleAddVessel = () => {
    setIsAddingVessel(true);
  };

  const handleCancelAddVessel = () => {
    setIsAddingVessel(false);
    // Reset form
    setNewVessel({
      name: '',
      registrationNumber: '',
      type: '',
      capacity: '',
      crew: 0,
      status: 'inactive',
    });
  };

  const handleSaveVessel = async () => {
    // Validate form
    if (!newVessel.name || !newVessel.registrationNumber || !newVessel.type) {
      Alert.alert(t('common.error'), t('vessel.requiredFields'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new vessel to list
      const vessel: Vessel = {
        ...newVessel,
        id: Date.now().toString(),
      };

      setVessels([...vessels, vessel]);
      setIsAddingVessel(false);
      
      // Reset form
      setNewVessel({
        name: '',
        registrationNumber: '',
        type: '',
        capacity: '',
        crew: 0,
        status: 'inactive',
      });

      Alert.alert(t('common.success'), t('vessel.addSuccess'));
    } catch (error) {
      Alert.alert(t('common.error'), t('vessel.addFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '$green9';
      case 'maintenance':
        return '$orange9';
      case 'inactive':
        return '$gray9';
      default:
        return '$gray9';
    }
  };

  const renderVesselItem = ({ item }: { item: Vessel }) => (
    <C padding="$4" bordered marginBottom="$3">
      <Y space="$2">
        <X justifyContent="space-between" alignItems="center">
          <H fontSize="$5" fontWeight="bold">{item.name}</H>
          <T 
            fontSize="$2" 
            backgroundColor={getStatusColor(item.status).replace('9', '2')} 
            color={getStatusColor(item.status)}
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$2"
          >
            {item.status.toUpperCase()}
          </T>
        </X>
        
        <Y space="$2" marginTop="$2">
          <X space="$2" alignItems="center">
            <Feather name="hash" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('vessel.registrationNumber')}</T>
          </X>
          <T paddingLeft="$6">{item.registrationNumber}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="anchor" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('vessel.type')}</T>
          </X>
          <T paddingLeft="$6">{item.type}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="box" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('vessel.capacity')}</T>
          </X>
          <T paddingLeft="$6">{item.capacity}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="users" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('vessel.crew')}</T>
          </X>
          <T paddingLeft="$6">{item.crew} {t('vessel.people')}</T>
        </Y>
        
        <X space="$2" marginTop="$3">
          <Button 
            flex={1}
            icon={<Feather name="edit-2" size={16} />}
            variant="outlined"
          >
            {t('common.edit')}
          </Button>
          
          <Button 
            flex={1}
            icon={<Feather name="clipboard" size={16} />}
            backgroundColor="$blue9"
          >
            {t('vessel.logCatch')}
          </Button>
        </X>
      </Y>
    </C>
  );

  return (
    <Y space="$4">
      <X justifyContent="space-between" alignItems="center">
        <H fontSize="$6" fontWeight="bold">{t('vessel.myVessels')}</H>
        <Button 
          size="$3"
          onPress={handleAddVessel}
          icon={<Feather name="plus" size={16} />}
        >
          {t('vessel.addVessel')}
        </Button>
      </X>
      
      {vessels.length === 0 ? (
        <Y padding="$4" alignItems="center" justifyContent="center">
          <Feather name="anchor" size={48} color="#ccc" />
          <T marginTop="$2" color="$gray10">{t('vessel.noVessels')}</T>
          <Button 
            marginTop="$4"
            onPress={handleAddVessel}
            icon={<Feather name="plus" size={16} />}
          >
            {t('vessel.addFirstVessel')}
          </Button>
        </Y>
      ) : (
        <FlatList
          data={vessels}
          renderItem={renderVesselItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      
      {/* Add Vessel Sheet */}
      <Sheet
        modal
        open={isAddingVessel}
        onOpenChange={setIsAddingVessel}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          <Y space="$4" marginTop="$4">
            <H fontSize="$5" fontWeight="bold">{t('vessel.addNewVessel')}</H>
            
            <Y space="$3">
              <T>{t('vessel.vesselName')}</T>
              <Input
                value={newVessel.name}
                onChangeText={(text: string) => setNewVessel({...newVessel, name: text})}
                placeholder={t('vessel.vesselNamePlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('vessel.registrationNumber')}</T>
              <Input
                value={newVessel.registrationNumber}
                onChangeText={(text: string) => setNewVessel({...newVessel, registrationNumber: text})}
                placeholder={t('vessel.registrationNumberPlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('vessel.type')}</T>
              <Input
                value={newVessel.type}
                onChangeText={(text: string) => setNewVessel({...newVessel, type: text})}
                placeholder={t('vessel.typePlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('vessel.capacity')}</T>
              <Input
                value={newVessel.capacity}
                onChangeText={(text: string) => setNewVessel({...newVessel, capacity: text})}
                placeholder={t('vessel.capacityPlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('vessel.crew')}</T>
              <Input
                value={newVessel.crew.toString()}
                onChangeText={(text: string) => setNewVessel({...newVessel, crew: parseInt(text) || 0})}
                placeholder={t('vessel.crewPlaceholder')}
                keyboardType="number-pad"
              />
            </Y>
            
            <X space="$3" justifyContent="flex-end" marginTop="$4">
              <Button 
                variant="outlined"
                onPress={handleCancelAddVessel}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>
              
              <Button 
                onPress={handleSaveVessel}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : t('common.save')}
              </Button>
            </X>
          </Y>
        </Sheet.Frame>
      </Sheet>
    </Y>
  );
}
