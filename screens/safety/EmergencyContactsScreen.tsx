import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { YStack, H2, Text, Input, Button, Form, Paragraph, XStack, Card, ScrollView } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useSafetyStore } from '../../services/safety/safetyStore';
import { z } from 'zod';

interface EmergencyContactsScreenProps {
  navigation: any;
}

// Define schema for form validation
const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phoneNumber: z.string().min(10, { message: 'Valid phone number is required' }),
  relationship: z.string().min(1, { message: 'Relationship is required' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function EmergencyContactsScreen({ navigation }: EmergencyContactsScreenProps) {
  const { t } = useTranslation();
  const { 
    emergencyContacts, 
    isLoadingContacts, 
    isAddingContact,
    isRemovingContact,
    fetchEmergencyContacts,
    addEmergencyContact,
    removeEmergencyContact
  } = useSafetyStore();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phoneNumber: '',
    relationship: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  useEffect(() => {
    fetchEmergencyContacts();
  }, [fetchEmergencyContacts]);

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await addEmergencyContact({
        ...formData,
        id: editingContactId || undefined,
      });
      
      // Reset form
      setFormData({
        name: '',
        phoneNumber: '',
        relationship: '',
      });
      setIsEditing(false);
      setEditingContactId(null);
      
      Alert.alert(
        t('common.success'),
        isEditing 
          ? t('safety.contactUpdated') 
          : t('safety.contactAdded')
      );
    } catch (error) {
      Alert.alert(
        t('common.error'),
        isEditing 
          ? t('safety.updateContactError') 
          : t('safety.addContactError')
      );
    }
  };

  const handleEdit = (contactId: string) => {
    const contactToEdit = emergencyContacts.find(contact => contact.id === contactId);
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        phoneNumber: contactToEdit.phoneNumber,
        relationship: contactToEdit.relationship,
      });
      setIsEditing(true);
      setEditingContactId(contactId);
    }
  };

  const handleDelete = (contactId: string) => {
    Alert.alert(
      t('safety.deleteContact'),
      t('safety.deleteContactConfirmation'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('common.delete'),
          onPress: async () => {
            try {
              await removeEmergencyContact(contactId);
              Alert.alert(t('common.success'), t('safety.contactDeleted'));
            } catch (error) {
              Alert.alert(t('common.error'), t('safety.deleteContactError'));
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      relationship: '',
    });
    setIsEditing(false);
    setEditingContactId(null);
    setValidationErrors({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <YStack padding="$4" space="$4">
          <H2>{t('safety.emergencyContacts')}</H2>
          <Paragraph>{t('safety.emergencyContactsDescription')}</Paragraph>
          
          {/* Contact Form */}
          <Card borderRadius="$4">
            <YStack padding="$4" space="$3">
              <Text fontWeight="bold">
                {isEditing ? t('safety.editContact') : t('safety.addContact')}
              </Text>
              
              <Form onSubmit={handleSubmit}>
                <YStack space="$3">
                  {/* Name Input */}
                  <YStack space="$1">
                    <Text>{t('safety.contactName')}</Text>
                    <Input
                      value={formData.name}
                      onChangeText={(text) => setFormData({ ...formData, name: text })}
                      placeholder={t('safety.contactNamePlaceholder')}
                    />
                    {validationErrors.name && (
                      <Text color="$red9" fontSize="$2">{validationErrors.name}</Text>
                    )}
                  </YStack>
                  
                  {/* Phone Number Input */}
                  <YStack space="$1">
                    <Text>{t('safety.phoneNumber')}</Text>
                    <Input
                      value={formData.phoneNumber}
                      onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                      placeholder={t('safety.phoneNumberPlaceholder')}
                      keyboardType="phone-pad"
                    />
                    {validationErrors.phoneNumber && (
                      <Text color="$red9" fontSize="$2">{validationErrors.phoneNumber}</Text>
                    )}
                  </YStack>
                  
                  {/* Relationship Input */}
                  <YStack space="$1">
                    <Text>{t('safety.relationship')}</Text>
                    <Input
                      value={formData.relationship}
                      onChangeText={(text) => setFormData({ ...formData, relationship: text })}
                      placeholder={t('safety.relationshipPlaceholder')}
                    />
                    {validationErrors.relationship && (
                      <Text color="$red9" fontSize="$2">{validationErrors.relationship}</Text>
                    )}
                  </YStack>
                  
                  {/* Submit Button */}
                  <XStack space="$2" marginTop="$2">
                    <Button
                      flex={1}
                      backgroundColor="$blue9"
                      color="white"
                      onPress={handleSubmit}
                      disabled={isAddingContact}
                    >
                      {isAddingContact ? (
                        <ActivityIndicator color="white" />
                      ) : isEditing ? (
                        t('common.update')
                      ) : (
                        t('common.add')
                      )}
                    </Button>
                    
                    {isEditing && (
                      <Button
                        flex={1}
                        variant="outlined"
                        onPress={handleCancel}
                      >
                        {t('common.cancel')}
                      </Button>
                    )}
                  </XStack>
                </YStack>
              </Form>
            </YStack>
          </Card>
          
          {/* Contact List */}
          <YStack space="$2">
            <Text fontWeight="bold" fontSize="$5">{t('safety.yourContacts')}</Text>
            
            {isLoadingContacts ? (
              <YStack alignItems="center" padding="$4">
                <ActivityIndicator size="small" color="#0000ff" />
              </YStack>
            ) : emergencyContacts.length === 0 ? (
              <Card padding="$4" marginTop="$2">
                <Text textAlign="center">{t('safety.noContactsAdded')}</Text>
              </Card>
            ) : (
              <YStack space="$2">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} borderRadius="$4" bordered>
                    <YStack padding="$3">
                      <XStack justifyContent="space-between">
                        <Text fontWeight="bold">{contact.name}</Text>
                        <Text fontSize="$2" color="$gray9">{contact.relationship}</Text>
                      </XStack>
                      <Text>{contact.phoneNumber}</Text>
                      
                      <XStack space="$2" marginTop="$2">
                        <Button
                          size="$2"
                          flex={1}
                          onPress={() => handleEdit(contact.id)}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button
                          size="$2"
                          flex={1}
                          backgroundColor="$red9"
                          color="white"
                          onPress={() => handleDelete(contact.id)}
                          disabled={isRemovingContact}
                        >
                          {isRemovingContact ? (
                            <ActivityIndicator color="white" size="small" />
                          ) : (
                            t('common.delete')
                          )}
                        </Button>
                      </XStack>
                    </YStack>
                  </Card>
                ))}
              </YStack>
            )}
          </YStack>
          
          {/* Back Button */}
          <Button
            variant="outlined"
            onPress={() => navigation.goBack()}
            marginTop="$2"
          >
            {t('common.back')}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
