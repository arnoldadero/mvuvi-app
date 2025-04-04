import React, { useState, useEffect } from 'react';
import { YStack, XStack, Text, Card, Button, Input, Separator, Sheet, Spinner, Select } from 'tamagui';
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
const Se: any = Select;

// Mock orders data
const MOCK_ORDERS = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    customerName: 'John Doe',
    customerType: 'retailer',
    items: [
      { fishType: 'Nile Perch', quantity: 50, unit: 'kg', price: 450 },
      { fishType: 'Tilapia', quantity: 30, unit: 'kg', price: 380 },
    ],
    totalAmount: 34400,
    orderDate: '2023-10-15',
    deliveryDate: '2023-10-18',
    deliveryAddress: 'Kisumu City Market, Stall #45',
    status: 'pending',
    paymentStatus: 'partial',
    paymentAmount: 15000,
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-002',
    customerName: 'Jane Smith',
    customerType: 'restaurant',
    items: [
      { fishType: 'Tilapia', quantity: 25, unit: 'kg', price: 380 },
    ],
    totalAmount: 9500,
    orderDate: '2023-10-16',
    deliveryDate: '2023-10-17',
    deliveryAddress: 'Lakeside Restaurant, Kisumu',
    status: 'processing',
    paymentStatus: 'paid',
    paymentAmount: 9500,
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-003',
    customerName: 'Nairobi Fish Market',
    customerType: 'wholesaler',
    items: [
      { fishType: 'Nile Perch', quantity: 200, unit: 'kg', price: 420 },
      { fishType: 'Omena/Dagaa', quantity: 100, unit: 'kg', price: 200 },
    ],
    totalAmount: 104000,
    orderDate: '2023-10-14',
    deliveryDate: '2023-10-19',
    deliveryAddress: 'Nairobi Fish Market, Cold Storage Area',
    status: 'shipped',
    paymentStatus: 'partial',
    paymentAmount: 50000,
  },
];

interface OrderItem {
  fishType: string;
  quantity: number;
  unit: string;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerType: 'retailer' | 'restaurant' | 'wholesaler' | 'individual';
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentAmount: number;
}

export function DistributionManagement() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [isViewingOrder, setIsViewingOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
    orderNumber: `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    customerName: '',
    customerType: 'retailer',
    items: [],
    totalAmount: 0,
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    deliveryAddress: '',
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentAmount: 0,
  });

  // Fetch orders data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're using mock data
  }, []);

  const handleAddOrder = () => {
    setIsAddingOrder(true);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewingOrder(true);
  };

  const handleCancelAddOrder = () => {
    setIsAddingOrder(false);
    // Reset form
    setNewOrder({
      orderNumber: `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      customerName: '',
      customerType: 'retailer',
      items: [],
      totalAmount: 0,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deliveryAddress: '',
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentAmount: 0,
    });
  };

  const handleSaveOrder = async () => {
    // Validate form
    if (!newOrder.customerName || !newOrder.deliveryAddress || newOrder.items.length === 0) {
      Alert.alert(t('common.error'), t('distribution.requiredFields'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add new order
      const order: Order = {
        ...newOrder,
        id: Date.now().toString(),
      };

      setOrders([...orders, order]);
      setIsAddingOrder(false);
      
      // Reset form
      setNewOrder({
        orderNumber: `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        customerName: '',
        customerType: 'retailer',
        items: [],
        totalAmount: 0,
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        deliveryAddress: '',
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentAmount: 0,
      });

      Alert.alert(t('common.success'), t('distribution.addSuccess'));
    } catch (error) {
      Alert.alert(t('common.error'), t('distribution.addFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '$orange9';
      case 'processing':
        return '$blue9';
      case 'shipped':
        return '$purple9';
      case 'delivered':
        return '$green9';
      case 'cancelled':
        return '$red9';
      default:
        return '$gray9';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('distribution.pending');
      case 'processing':
        return t('distribution.processing');
      case 'shipped':
        return t('distribution.shipped');
      case 'delivered':
        return t('distribution.delivered');
      case 'cancelled':
        return t('distribution.cancelled');
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'unpaid':
        return '$red9';
      case 'partial':
        return '$orange9';
      case 'paid':
        return '$green9';
      default:
        return '$gray9';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'unpaid':
        return t('distribution.unpaid');
      case 'partial':
        return t('distribution.partiallyPaid');
      case 'paid':
        return t('distribution.paid');
      default:
        return status;
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <C padding="$4" bordered marginBottom="$3">
      <Y space="$2">
        <X justifyContent="space-between" alignItems="center">
          <H fontSize="$5" fontWeight="bold">{item.orderNumber}</H>
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
        
        <Y space="$2" marginTop="$2">
          <X space="$2" alignItems="center">
            <Feather name="user" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('distribution.customer')}</T>
          </X>
          <T paddingLeft="$6">{item.customerName}</T>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="package" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('distribution.items')}</T>
          </X>
          <T paddingLeft="$6">{item.items.length} {t('distribution.itemsCount')}</T>
        </Y>
        
        <X space="$4" marginTop="$2">
          <Y space="$1" flex={1}>
            <T fontSize="$2" color="$gray10">{t('distribution.totalAmount')}</T>
            <T fontSize="$4" fontWeight="bold">KSh {item.totalAmount.toLocaleString()}</T>
          </Y>
          
          <Y space="$1" flex={1}>
            <T fontSize="$2" color="$gray10">{t('distribution.paymentStatus')}</T>
            <T 
              fontSize="$3" 
              fontWeight="bold" 
              color={getPaymentStatusColor(item.paymentStatus)}
            >
              {getPaymentStatusLabel(item.paymentStatus)}
            </T>
          </Y>
        </X>
        
        <Y space="$2" marginTop="$2">
          <X space="$2" alignItems="center">
            <Feather name="calendar" size={16} color="#0891b2" />
            <T fontSize="$3" fontWeight="bold">{t('distribution.deliveryDate')}</T>
          </X>
          <T paddingLeft="$6">{item.deliveryDate}</T>
        </Y>
        
        <X space="$2" marginTop="$3">
          <Button 
            flex={1}
            icon={<Feather name="eye" size={16} />}
            variant="outlined"
            onPress={() => handleViewOrder(item)}
          >
            {t('distribution.viewDetails')}
          </Button>
          
          {item.status === 'pending' && (
            <Button 
              flex={1}
              icon={<Feather name="play" size={16} />}
              backgroundColor="$blue9"
            >
              {t('distribution.startProcessing')}
            </Button>
          )}
          
          {item.status === 'processing' && (
            <Button 
              flex={1}
              icon={<Feather name="truck" size={16} />}
              backgroundColor="$purple9"
            >
              {t('distribution.markAsShipped')}
            </Button>
          )}
          
          {item.status === 'shipped' && (
            <Button 
              flex={1}
              icon={<Feather name="check" size={16} />}
              backgroundColor="$green9"
            >
              {t('distribution.markAsDelivered')}
            </Button>
          )}
        </X>
      </Y>
    </C>
  );

  return (
    <Y space="$4">
      <X justifyContent="space-between" alignItems="center">
        <H fontSize="$6" fontWeight="bold">{t('distribution.title')}</H>
        <Button 
          size="$3"
          onPress={handleAddOrder}
          icon={<Feather name="plus" size={16} />}
        >
          {t('distribution.addOrder')}
        </Button>
      </X>
      
      <X space="$2" alignItems="center">
        <T>{t('distribution.filterBy')}</T>
        <Se value={filter} onValueChange={(val: string) => setFilter(val)}>
          <Se.Trigger>
            <Se.Value placeholder={t('distribution.selectStatus')} />
          </Se.Trigger>
          <Se.Content>
            <Se.Item index={0} value="all">
              <Se.ItemText>{t('distribution.all')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={1} value="pending">
              <Se.ItemText>{t('distribution.pending')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={2} value="processing">
              <Se.ItemText>{t('distribution.processing')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={3} value="shipped">
              <Se.ItemText>{t('distribution.shipped')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={4} value="delivered">
              <Se.ItemText>{t('distribution.delivered')}</Se.ItemText>
            </Se.Item>
            <Se.Item index={5} value="cancelled">
              <Se.ItemText>{t('distribution.cancelled')}</Se.ItemText>
            </Se.Item>
          </Se.Content>
        </Se>
      </X>
      
      {filteredOrders.length === 0 ? (
        <Y padding="$4" alignItems="center" justifyContent="center">
          <Feather name="shopping-cart" size={48} color="#ccc" />
          <T marginTop="$2" color="$gray10">{t('distribution.noOrders')}</T>
          <Button 
            marginTop="$4"
            onPress={handleAddOrder}
            icon={<Feather name="plus" size={16} />}
          >
            {t('distribution.addFirstOrder')}
          </Button>
        </Y>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      
      {/* View Order Details Sheet */}
      <Sheet
        modal
        open={isViewingOrder}
        onOpenChange={setIsViewingOrder}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          {selectedOrder && (
            <Y space="$4" marginTop="$4">
              <X justifyContent="space-between" alignItems="center">
                <H fontSize="$5" fontWeight="bold">{t('distribution.orderDetails')}</H>
                <T 
                  fontSize="$2" 
                  backgroundColor={getStatusColor(selectedOrder.status).replace('9', '2')} 
                  color={getStatusColor(selectedOrder.status)}
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  {getStatusLabel(selectedOrder.status).toUpperCase()}
                </T>
              </X>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="hash" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.orderNumber')}</T>
                </X>
                <T paddingLeft="$6">{selectedOrder.orderNumber}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="user" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.customer')}</T>
                </X>
                <T paddingLeft="$6">{selectedOrder.customerName}</T>
                <T paddingLeft="$6" fontSize="$2" color="$gray10">
                  {selectedOrder.customerType === 'retailer' && t('distribution.retailer')}
                  {selectedOrder.customerType === 'restaurant' && t('distribution.restaurant')}
                  {selectedOrder.customerType === 'wholesaler' && t('distribution.wholesaler')}
                  {selectedOrder.customerType === 'individual' && t('distribution.individual')}
                </T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="package" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.items')}</T>
                </X>
                {selectedOrder.items.map((item, index) => (
                  <Y key={index} paddingLeft="$6" paddingVertical="$1">
                    <X justifyContent="space-between">
                      <T>{item.fishType}</T>
                      <T>{item.quantity} {item.unit}</T>
                    </X>
                    <T fontSize="$2" color="$gray10">KSh {item.price} per {item.unit}</T>
                  </Y>
                ))}
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="dollar-sign" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.payment')}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between">
                  <T>{t('distribution.totalAmount')}</T>
                  <T fontWeight="bold">KSh {selectedOrder.totalAmount.toLocaleString()}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between">
                  <T>{t('distribution.amountPaid')}</T>
                  <T fontWeight="bold">KSh {selectedOrder.paymentAmount.toLocaleString()}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between">
                  <T>{t('distribution.balance')}</T>
                  <T fontWeight="bold">KSh {(selectedOrder.totalAmount - selectedOrder.paymentAmount).toLocaleString()}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between" marginTop="$1">
                  <T>{t('distribution.paymentStatus')}</T>
                  <T 
                    fontWeight="bold" 
                    color={getPaymentStatusColor(selectedOrder.paymentStatus)}
                  >
                    {getPaymentStatusLabel(selectedOrder.paymentStatus)}
                  </T>
                </X>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="calendar" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.dates')}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between">
                  <T>{t('distribution.orderDate')}</T>
                  <T>{selectedOrder.orderDate}</T>
                </X>
                <X paddingLeft="$6" justifyContent="space-between">
                  <T>{t('distribution.deliveryDate')}</T>
                  <T>{selectedOrder.deliveryDate}</T>
                </X>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="map-pin" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('distribution.deliveryAddress')}</T>
                </X>
                <T paddingLeft="$6">{selectedOrder.deliveryAddress}</T>
              </Y>
              
              <Button 
                marginTop="$4"
                onPress={() => setIsViewingOrder(false)}
              >
                {t('common.close')}
              </Button>
            </Y>
          )}
        </Sheet.Frame>
      </Sheet>
      
      {/* Add Order Sheet - Simplified for this example */}
      <Sheet
        modal
        open={isAddingOrder}
        onOpenChange={setIsAddingOrder}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          <Y space="$4" marginTop="$4">
            <H fontSize="$5" fontWeight="bold">{t('distribution.addNewOrder')}</H>
            
            <Y space="$3">
              <T>{t('distribution.customerName')}</T>
              <Input
                value={newOrder.customerName}
                onChangeText={(text: string) => setNewOrder({...newOrder, customerName: text})}
                placeholder={t('distribution.customerNamePlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('distribution.customerType')}</T>
              <Se value={newOrder.customerType} onValueChange={(val: string) => setNewOrder({...newOrder, customerType: val as any})}>
                <Se.Trigger>
                  <Se.Value placeholder={t('distribution.selectCustomerType')} />
                </Se.Trigger>
                <Se.Content>
                  <Se.Item index={0} value="retailer">
                    <Se.ItemText>{t('distribution.retailer')}</Se.ItemText>
                  </Se.Item>
                  <Se.Item index={1} value="restaurant">
                    <Se.ItemText>{t('distribution.restaurant')}</Se.ItemText>
                  </Se.Item>
                  <Se.Item index={2} value="wholesaler">
                    <Se.ItemText>{t('distribution.wholesaler')}</Se.ItemText>
                  </Se.Item>
                  <Se.Item index={3} value="individual">
                    <Se.ItemText>{t('distribution.individual')}</Se.ItemText>
                  </Se.Item>
                </Se.Content>
              </Se>
            </Y>
            
            <Y space="$3">
              <T>{t('distribution.deliveryAddress')}</T>
              <Input
                value={newOrder.deliveryAddress}
                onChangeText={(text: string) => setNewOrder({...newOrder, deliveryAddress: text})}
                placeholder={t('distribution.deliveryAddressPlaceholder')}
              />
            </Y>
            
            <Y space="$3">
              <T>{t('distribution.deliveryDate')}</T>
              <Input
                value={newOrder.deliveryDate}
                onChangeText={(text: string) => setNewOrder({...newOrder, deliveryDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </Y>
            
            <Y space="$3">
              <X justifyContent="space-between" alignItems="center">
                <T fontSize="$3" fontWeight="bold">{t('distribution.items')}</T>
                <T fontSize="$2" color="$gray10">
                  {t('distribution.itemsNote')}
                </T>
              </X>
              <T fontSize="$2" color="$gray10" marginTop="$2">
                {t('distribution.addItemsNote')}
              </T>
            </Y>
            
            <X space="$3" justifyContent="flex-end" marginTop="$4">
              <Button 
                variant="outlined"
                onPress={handleCancelAddOrder}
                disabled={isLoading}
              >
                {t('common.cancel')}
              </Button>
              
              <Button 
                onPress={handleSaveOrder}
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
