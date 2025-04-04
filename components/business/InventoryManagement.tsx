import React, { useState, useEffect } from 'react';
import { YStack, XStack, Text, Card, Button, Input, Separator, Sheet, Spinner, Select } from 'tamagui';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList } from 'react-native';
import { AccountType } from '../../store/auth/auth-store';

// Define aliases for Tamagui components with any type to fix type errors
const Y: any = YStack;
const X: any = XStack;
const T: any = Text;
const C: any = Card;
const H: any = Text;
const S: any = Separator;
const Se: any = Select;

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: '1',
    fishType: 'Nile Perch',
    quantity: 250,
    unit: 'kg',
    quality: 'A',
    catchDate: '2023-10-15',
    expiryDate: '2023-10-22',
    price: 450,
    location: 'Lake Victoria - Dunga Beach',
    status: 'available',
  },
  {
    id: '2',
    fishType: 'Tilapia',
    quantity: 180,
    unit: 'kg',
    quality: 'A',
    catchDate: '2023-10-16',
    expiryDate: '2023-10-23',
    price: 380,
    location: 'Lake Victoria - Kisumu',
    status: 'available',
  },
  {
    id: '3',
    fishType: 'Omena/Dagaa',
    quantity: 100,
    unit: 'kg',
    quality: 'B',
    catchDate: '2023-10-14',
    expiryDate: '2023-10-28',
    price: 200,
    location: 'Lake Victoria - Homa Bay',
    status: 'reserved',
  },
];

interface InventoryItem {
  id: string;
  fishType: string;
  quantity: number;
  unit: string;
  quality: string;
  catchDate: string;
  expiryDate: string;
  price: number;
  location: string;
  status: 'available' | 'reserved' | 'sold';
}

interface InventoryManagementProps {
  accountType: AccountType;
}

export function InventoryManagement({ accountType }: InventoryManagementProps) {
  const { t } = useTranslation();
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>({
    fishType: '',
    quantity: 0,
    unit: 'kg',
    quality: 'A',
    catchDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: 0,
    location: '',
    status: 'available',
  });

  // Fetch inventory data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're using mock data
  }, []);

  const handleAddItem = () => {
    setIsAddingItem(true);
  };

  const handleCancelAddItem = () => {
    setIsAddingItem(false);
    // Reset form
    setNewItem({
      fishType: '',
      quantity: 0,
      unit: 'kg',
      quality: 'A',
      catchDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 0,
      location: '',
      status: 'available',
    });
  };

  const handleSaveItem = async () => {
    // Validate form
    if (!newItem.fishType || newItem.quantity <= 0 || !newItem.location) {
      Alert.alert(t('common.error'), t('inventory.requiredFields'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new item to inventory
      const item: InventoryItem = {
        ...newItem,
        id: Date.now().toString(),
      };

      setInventory([...inventory, item]);
      setIsAddingItem(false);
      
      // Reset form
      setNewItem({
        fishType: '',
        quantity: 0,
        unit: 'kg',
        quality: 'A',
        catchDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: 0,
        location: '',
        status: 'available',
      });

      Alert.alert(t('common.success'), t('inventory.addSuccess'));
    } catch (error) {
      Alert.alert(t('common.error'), t('inventory.addFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '$green9';
      case 'reserved':
        return '$orange9';
      case 'sold':
        return '$blue9';
      default:
        return '$gray9';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return t('inventory.available');
      case 'reserved':
        return t('inventory.reserved');
      case 'sold':
        return t('inventory.sold');
      default:
        return status;
    }
  };

  const filteredInventory = filter === 'all' 
    ? inventory 
    : inventory.filter(item => item.status === filter);

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <C padding="$4" bordered marginBottom="$3">
      <Y space="$2">
        <X justifyContent="space-between" alignItems="center">
          <H fontSize="$5" fontWeight="bold">{item.fishType}</H>
          <T 
            fontSize="$2" 
            backgroundColor={getStatusColor(item.status).replace('9', '2')} 
            color={getStatusColor(item.status)}
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$2"
          >
            {getStatusLabel(item.status).toUpperCase()}
          </T>
        </X>
        
        <X space="$4" marginTop="$2">
          <Y space="$1" flex={1}>
            <T fontSize="$2" color="$gray10">{t('inventory.quantity')}</T>
            <T fontSize="$4" fontWeight="bold">{item.quantity} {item.unit}</T>
          </Y>
          
          <Y space="$1" flex={1}>
            <T fontSize="$2" color="$gray10">{t('inventory.quality')}</T>
            <T fontSize="$4" fontWeight="bold">{item.quality}</T>
          </Y>
          
          <Y space="$1" flex={1}>
            <T fontSize="$2" color="$gray10">{t('inventory.price')}</T>
            <T fontSize="$4" fontWeight="bold">KSh {item.price}</T>
          </Y>
        </X>
        
        <Y space="$2" marginTop="$2">
          <X space="$2" alignItems="center">
            <Feather name="map-pin" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('inventory.location')}</T>
          </X>
          <T paddingLeft="$6">{item.location}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="calendar" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('inventory.catchDate')}</T>
          </X>
          <T paddingLeft="$6">{item.catchDate}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="clock" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('inventory.expiryDate')}</T>
          </X>
          <T paddingLeft="$6">{item.expiryDate}</T>
        </Y>
        
        <X space="$2" marginTop="$3">
          <Button 
            flex={1}
            icon={<Feather name="edit-2" size={16} />}
            variant="outlined"
          >
            {t('common.edit')}
          </Button>
          
          {item.status === 'available' && (
            <Button 
              flex={1}
              icon={<Feather name="shopping-cart" size={16} />}
              backgroundColor="$blue9"
            >
              {accountType === AccountType.BUSINESS_DISTRIBUTOR 
                ? t('inventory.sell') 
                : t('inventory.markAsReserved')}
            </Button>
          )}
          
          {item.status === 'reserved' && (
            <Button 
              flex={1}
              icon={<Feather name="check" size={16} />}
              backgroundColor="$green9"
            >
              {t('inventory.markAsSold')}
            </Button>
          )}
        </X>
      </Y>
    </C>
  );

  return (
    <Y space="$4">
      <X justifyContent="space-between" alignItems="center">
        <H fontSize="$6" fontWeight="bold">{t('inventory.title')}</H>
        <Button 
          size="$3"
          onPress={handleAddItem}
          icon={<Feather name="plus" size={16} />}
        >
          {t('inventory.addItem')}
        </Button>
      </X>
      
      <X space="$2" alignItems="center">
        <T>{t('inventory.filterBy')}</T>
        <Se value={filter} onValueChange={(val: string) => setFilter(val)}>
          <Se.Trigger>
            <Se.Value placeholder={t('inventory.selectStatus')} />
          </Se.Trigger>
          <Se.Content>
            <Se.Item index={0} value="all">
              <Se.ItemText>{t('inventory.all')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={1} value="available">
              <Se.ItemText>{t('inventory.available')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={2} value="reserved">
              <Se.ItemText>{t('inventory.reserved')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={3} value="sold">
              <Se.ItemText>{t('inventory.sold')}</Se.ItemText>
            </Se.Item>
          </Se.Content>
        </Se>
      </X>
      
      {filteredInventory.length === 0 ? (
        <Y padding="$4" alignItems="center" justifyContent="center">
          <Feather name="package" size={48} color="#ccc" />
          <T marginTop="$2" color="$gray10">{t('inventory.noItems')}</T>
          <Button 
            marginTop="$4"
            onPress={handleAddItem}
            icon={<Feather name="plus" size={16} />}
          >
            {t('inventory.addFirstItem')}
          </Button>
        </Y>
      ) : (
        <FlatList
          data={filteredInventory}
          renderItem={renderInventoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      
      {/* Add Inventory Item Sheet */}
      <Sheet
        modal
        open={isAddingItem}
        onOpenChange={setIsAddingItem}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          <Y space="$4" marginTop="$4">
            <H fontSize="$5" fontWeight="bold">{t('inventory.addNewItem')}</H>
            
            <Y space="$3">
              <T>{t('inventory.fishType')}</T>
              <Input
                value={newItem.fishType}
                onChangeText={(text: string) => setNewItem({...newItem, fishType: text})}
                placeholder={t('inventory.fishTypePlaceholder')}
              />
            </Y>
            
            <X space="$3">
              <Y space="$3" flex={1}>
                <T>{t('inventory.quantity')}</T>
                <Input
                  value={newItem.quantity.toString()}
                  onChangeText={(text: string) => setNewItem({...newItem, quantity: parseFloat(text) || 0})}
                  placeholder={t('inventory.quantityPlaceholder')}
                  keyboardType="numeric"
                />
              </Y>
              
              <Y space="$3" flex={1}>
                <T>{t('inventory.unit')}</T>
                <Se value={newItem.unit} onValueChange={(val: string) => setNewItem({...newItem, unit: val})}>
                  <Se.Trigger>
                    <Se.Value placeholder={t('inventory.selectUnit')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.Item index={0} value="kg">
                      <Se.ItemText>kg</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={1} value="g">
                      <Se.ItemText>g</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={2} value="pieces">
                      <Se.ItemText>{t('inventory.pieces')}</Se.ItemText>
                    </Se.Item>
                  </Se.Content>
                </Se>
              </Y>
            </X>
            
            <Y space="$3">
              <T>{t('inventory.quality')}</T>
              <Se value={newItem.quality} onValueChange={(val: string) => setNewItem({...newItem, quality: val})}>
                <Se.Trigger>
                  <Se.Value placeholder={t('inventory.selectQuality')} />
                </Se.Trigger>
                <Se.Content>
                  <Se.Item index={0} value="A">
                    <Se.ItemText>A - {t('inventory.qualityA')}</Se.ItemText>
                  </Se.Item>
                  <Se.Item index={1} value="B">
                    <Se.ItemText>B - {t('inventory.qualityB')}</Se.ItemText>
                  </Se.Item>
                  <Se.Item index={2} value="C">
                    <Se.ItemText>C - {t('inventory.qualityC')}</Se.ItemText>
                  </Se.Item>
                </Se.Content>
              </Se>
            </Y>
            
            <Y space="$3">
              <T>{t('inventory.price')}</T>
              <Input
                value={newItem.price.toString()}
                onChangeText={(text: string) => setNewItem({...newItem, price: parseFloat(text) || 0})}
                placeholder={t('inventory.pricePlaceholder')}
                keyboardType="numeric"
              />
            </Y>
            
            <Y space="$3">
              <T>{t('inventory.location')}</T>
              <Input
                value={newItem.location}
                onChangeText={(text: string) => setNewItem({...newItem, location: text})}
                placeholder={t('inventory.locationPlaceholder')}
              />
            </Y>
            
            <X space="$3">
              <Y space="$3" flex={1}>
                <T>{t('inventory.catchDate')}</T>
                <Input
                  value={newItem.catchDate}
                  onChangeText={(text: string) => setNewItem({...newItem, catchDate: text})}
                  placeholder="YYYY-MM-DD"
                />
              </Y>
              
              <Y space="$3" flex={1}>
                <T>{t('inventory.expiryDate')}</T>
                <Input
                  value={newItem.expiryDate}
                  onChangeText={(text: string) => setNewItem({...newItem, expiryDate: text})}
                  placeholder="YYYY-MM-DD"
                />
              </Y>
            </X>
            
            <X space="$3" justifyContent="flex-end" marginTop="$4">
              <Button 
                variant="outlined"
                onPress={handleCancelAddItem}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>
              
              <Button 
                onPress={handleSaveItem}
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
