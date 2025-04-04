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

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+254712345678',
    accountType: AccountType.PERSONAL,
    location: 'Kisumu',
    created_at: '2023-09-15T10:30:00Z',
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+254723456789',
    accountType: AccountType.BUSINESS_BOAT_OWNER,
    location: 'Mombasa',
    created_at: '2023-09-20T14:45:00Z',
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phoneNumber: '+254734567890',
    accountType: AccountType.BUSINESS_DISTRIBUTOR,
    location: 'Nairobi',
    created_at: '2023-09-25T09:15:00Z',
    status: 'inactive',
  },
  {
    id: '4',
    fullName: 'Mary Williams',
    email: 'mary.williams@example.com',
    phoneNumber: '+254745678901',
    accountType: AccountType.ADMIN,
    location: 'Nairobi',
    created_at: '2023-09-10T08:00:00Z',
    status: 'active',
  },
];

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: AccountType;
  location: string;
  created_at: string;
  status: 'active' | 'inactive' | 'suspended';
}

export function UserManagement() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isViewingUser, setIsViewingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  // Fetch users data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're using mock data
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewingUser(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditedUser({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      accountType: user.accountType,
      location: user.location,
      status: user.status,
    });
    setIsEditingUser(true);
  };

  const handleCancelEdit = () => {
    setIsEditingUser(false);
    setEditedUser({});
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    // Validate form
    if (!editedUser.fullName || !editedUser.email) {
      Alert.alert(t('common.error'), t('admin.requiredFields'));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user in the list
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            ...editedUser,
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setIsEditingUser(false);
      setEditedUser({});

      Alert.alert(t('common.success'), t('admin.userUpdated'));
    } catch (error) {
      Alert.alert(t('common.error'), t('admin.updateFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspendUser = async (user: User) => {
    Alert.alert(
      t('admin.confirmSuspend'),
      t('admin.suspendUserConfirmation', { name: user.fullName }),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('admin.suspend'),
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));

              // Update user status in the list
              const updatedUsers = users.map(u => {
                if (u.id === user.id) {
                  return {
                    ...u,
                    status: 'suspended' as 'suspended',
                  };
                }
                return u;
              });

              setUsers(updatedUsers);
              Alert.alert(t('common.success'), t('admin.userSuspended'));
            } catch (error) {
              Alert.alert(t('common.error'), t('admin.actionFailed'));
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleActivateUser = async (user: User) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user status in the list
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            status: 'active' as 'active',
          };
        }
        return u;
      });

      setUsers(updatedUsers);
      Alert.alert(t('common.success'), t('admin.userActivated'));
    } catch (error) {
      Alert.alert(t('common.error'), t('admin.actionFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeLabel = (accountType: AccountType) => {
    switch (accountType) {
      case AccountType.PERSONAL:
        return t('profile.personalAccount');
      case AccountType.BUSINESS_BOAT_OWNER:
        return t('profile.boatOwnerAccount');
      case AccountType.BUSINESS_DISTRIBUTOR:
        return t('profile.distributorAccount');
      case AccountType.ADMIN:
        return t('profile.adminAccount');
      default:
        return accountType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '$green9';
      case 'inactive':
        return '$orange9';
      case 'suspended':
        return '$red9';
      default:
        return '$gray9';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t('admin.active');
      case 'inactive':
        return t('admin.inactive');
      case 'suspended':
        return t('admin.suspended');
      default:
        return status;
    }
  };

  // Filter users based on filter and search query
  const filteredUsers = users.filter(user => {
    // Filter by account type
    if (filter !== 'all' && user.accountType !== filter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phoneNumber.includes(query)
      );
    }
    
    return true;
  });

  const renderUserItem = ({ item }: { item: User }) => (
    <C padding="$4" bordered marginBottom="$3">
      <Y space="$2">
        <X justifyContent="space-between" alignItems="center">
          <H fontSize="$5" fontWeight="bold">{item.fullName}</H>
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
            <Feather name="mail" size={16} color="#0891b2" />
            <T fontSize="$3">{item.email}</T>
          </X>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="phone" size={16} color="#0891b2" />
            <T fontSize="$3">{item.phoneNumber}</T>
          </X>
        </Y>
        
        <Y space="$2">
          <X space="$2" alignItems="center">
            <Feather name="user" size={16} color="#0891b2" />
            <T fontSize="$3">{getAccountTypeLabel(item.accountType)}</T>
          </X>
        </Y>
        
        <X space="$2" marginTop="$3">
          <Button 
            flex={1}
            icon={<Feather name="eye" size={16} />}
            variant="outlined"
            onPress={() => handleViewUser(item)}
          >
            {t('admin.viewDetails')}
          </Button>
          
          <Button 
            flex={1}
            icon={<Feather name="edit-2" size={16} />}
            backgroundColor="$blue9"
            onPress={() => handleEditUser(item)}
          >
            {t('common.edit')}
          </Button>
        </X>
        
        <X space="$2" marginTop="$2">
          {item.status === 'active' ? (
            <Button 
              flex={1}
              icon={<Feather name="slash" size={16} />}
              backgroundColor="$red9"
              onPress={() => handleSuspendUser(item)}
            >
              {t('admin.suspend')}
            </Button>
          ) : (
            <Button 
              flex={1}
              icon={<Feather name="check" size={16} />}
              backgroundColor="$green9"
              onPress={() => handleActivateUser(item)}
            >
              {t('admin.activate')}
            </Button>
          )}
        </X>
      </Y>
    </C>
  );

  return (
    <Y space="$4">
      <X justifyContent="space-between" alignItems="center">
        <H fontSize="$6" fontWeight="bold">{t('admin.userManagement')}</H>
      </X>
      
      <Y space="$3">
        <Input
          placeholder={t('admin.searchUsers')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Feather name="search" size={16} color="#999" />}
        />
        
        <X space="$2" alignItems="center">
          <T>{t('admin.filterByAccountType')}</T>
          <Se value={filter} onValueChange={(val: string) => setFilter(val)}>
            <Se.Trigger>
              <Se.Value placeholder={t('admin.selectAccountType')} />
            </Se.Trigger>
            <Se.Content>
              <Se.Item index={0} value="all">
                <Se.ItemText>{t('distribution.all')}</Se.ItemText>
              </Se.Item>
              <Se.Item index={1} value={AccountType.PERSONAL}>
                <Se.ItemText>{t('profile.personalAccount')}</Se.ItemText>
              </Se.Item>
              <Se.Item index={2} value={AccountType.BUSINESS_BOAT_OWNER}>
                <Se.ItemText>{t('profile.boatOwnerAccount')}</Se.ItemText>
              </Se.Item>
              <Se.Item index={3} value={AccountType.BUSINESS_DISTRIBUTOR}>
                <Se.ItemText>{t('profile.distributorAccount')}</Se.ItemText>
              </Se.Item>
              <Se.Item index={4} value={AccountType.ADMIN}>
                <Se.ItemText>{t('profile.adminAccount')}</Se.ItemText>
              </Se.Item>
            </Se.Content>
          </Se>
        </X>
      </Y>
      
      {filteredUsers.length === 0 ? (
        <Y padding="$4" alignItems="center" justifyContent="center">
          <Feather name="users" size={48} color="#ccc" />
          <T marginTop="$2" color="$gray10">{t('admin.noUsersFound')}</T>
        </Y>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      
      {/* View User Details Sheet */}
      <Sheet
        modal
        open={isViewingUser}
        onOpenChange={setIsViewingUser}
        snapPoints={[70]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          {selectedUser && (
            <Y space="$4" marginTop="$4">
              <X justifyContent="space-between" alignItems="center">
                <H fontSize="$5" fontWeight="bold">{t('admin.userDetails')}</H>
                <T 
                  fontSize="$2" 
                  backgroundColor={getStatusColor(selectedUser.status).replace('9', '2')} 
                  color={getStatusColor(selectedUser.status)}
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  {getStatusLabel(selectedUser.status).toUpperCase()}
                </T>
              </X>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="user" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('profile.fullName')}</T>
                </X>
                <T paddingLeft="$6">{selectedUser.fullName}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="mail" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('profile.email')}</T>
                </X>
                <T paddingLeft="$6">{selectedUser.email}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="phone" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('profile.phoneNumber')}</T>
                </X>
                <T paddingLeft="$6">{selectedUser.phoneNumber}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="map-pin" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('profile.location')}</T>
                </X>
                <T paddingLeft="$6">{selectedUser.location}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="shield" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('admin.accountType')}</T>
                </X>
                <T paddingLeft="$6">{getAccountTypeLabel(selectedUser.accountType)}</T>
              </Y>
              
              <Y space="$3">
                <X space="$2" alignItems="center">
                  <Feather name="calendar" size={16} color="#0891b2" />
                  <T fontSize="$3" fontWeight="bold">{t('profile.memberSince')}</T>
                </X>
                <T paddingLeft="$6">
                  {new Date(selectedUser.created_at).toLocaleDateString()}
                </T>
              </Y>
              
              <X space="$2" marginTop="$4">
                <Button 
                  flex={1}
                  onPress={() => {
                    setIsViewingUser(false);
                    handleEditUser(selectedUser);
                  }}
                  icon={<Feather name="edit-2" size={16} />}
                >
                  {t('common.edit')}
                </Button>
                
                <Button 
                  flex={1}
                  variant="outlined"
                  onPress={() => setIsViewingUser(false)}
                >
                  {t('common.close')}
                </Button>
              </X>
            </Y>
          )}
        </Sheet.Frame>
      </Sheet>
      
      {/* Edit User Sheet */}
      <Sheet
        modal
        open={isEditingUser}
        onOpenChange={setIsEditingUser}
        snapPoints={[80]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4">
          <Sheet.Handle />
          
          {selectedUser && (
            <Y space="$4" marginTop="$4">
              <H fontSize="$5" fontWeight="bold">{t('admin.editUser')}</H>
              
              <Y space="$3">
                <T>{t('profile.fullName')}</T>
                <Input
                  value={editedUser.fullName}
                  onChangeText={(text: string) => setEditedUser({...editedUser, fullName: text})}
                  placeholder={t('profile.fullNamePlaceholder')}
                />
              </Y>
              
              <Y space="$3">
                <T>{t('profile.email')}</T>
                <Input
                  value={editedUser.email}
                  onChangeText={(text: string) => setEditedUser({...editedUser, email: text})}
                  placeholder={t('auth.emailPlaceholder')}
                  keyboardType="email-address"
                />
              </Y>
              
              <Y space="$3">
                <T>{t('profile.phoneNumber')}</T>
                <Input
                  value={editedUser.phoneNumber}
                  onChangeText={(text: string) => setEditedUser({...editedUser, phoneNumber: text})}
                  placeholder={t('profile.phoneNumberPlaceholder')}
                  keyboardType="phone-pad"
                />
              </Y>
              
              <Y space="$3">
                <T>{t('profile.location')}</T>
                <Input
                  value={editedUser.location}
                  onChangeText={(text: string) => setEditedUser({...editedUser, location: text})}
                  placeholder={t('profile.locationPlaceholder')}
                />
              </Y>
              
              <Y space="$3">
                <T>{t('admin.accountType')}</T>
                <Se 
                  value={editedUser.accountType} 
                  onValueChange={(val: string) => setEditedUser({...editedUser, accountType: val as AccountType})}
                >
                  <Se.Trigger>
                    <Se.Value placeholder={t('admin.selectAccountType')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.Item index={0} value={AccountType.PERSONAL}>
                      <Se.ItemText>{t('profile.personalAccount')}</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={1} value={AccountType.BUSINESS_BOAT_OWNER}>
                      <Se.ItemText>{t('profile.boatOwnerAccount')}</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={2} value={AccountType.BUSINESS_DISTRIBUTOR}>
                      <Se.ItemText>{t('profile.distributorAccount')}</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={3} value={AccountType.ADMIN}>
                      <Se.ItemText>{t('profile.adminAccount')}</Se.ItemText>
                    </Se.Item>
                  </Se.Content>
                </Se>
              </Y>
              
              <Y space="$3">
                <T>{t('admin.status')}</T>
                <Se 
                  value={editedUser.status} 
                  onValueChange={(val: string) => setEditedUser({...editedUser, status: val as 'active' | 'inactive' | 'suspended'})}
                >
                  <Se.Trigger>
                    <Se.Value placeholder={t('admin.selectStatus')} />
                  </Se.Trigger>
                  <Se.Content>
                    <Se.Item index={0} value="active">
                      <Se.ItemText>{t('admin.active')}</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={1} value="inactive">
                      <Se.ItemText>{t('admin.inactive')}</Se.ItemText>
                    </Se.Item>
                    <Se.Item index={2} value="suspended">
                      <Se.ItemText>{t('admin.suspended')}</Se.ItemText>
                    </Se.Item>
                  </Se.Content>
                </Se>
              </Y>
              
              <X space="$3" justifyContent="flex-end" marginTop="$4">
                <Button 
                  variant="outlined"
                  onPress={handleCancelEdit}
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                
                <Button 
                  onPress={handleSaveUser}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : t('common.save')}
                </Button>
              </X>
            </Y>
          )}
        </Sheet.Frame>
      </Sheet>
    </Y>
  );
}
