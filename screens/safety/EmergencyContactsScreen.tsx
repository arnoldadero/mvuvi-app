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

// Type aliases for Tamagui components
const Y: any = YStack;
const H: any = H2;
const P: any = Paragraph;
const T: any = Text;
const X: any = XStack;
const C: any = Card;
const I: any = Input;
const B: any = Button;
const F: any = Form;

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
        <Y padding="$4" space="$4">
          <H>{t('safety.emergencyContacts')}</H>
          <P>{t('safety.emergencyContactsDescription')}</P>

          {/* Contact Form */}
          <C borderRadius="$4">
            <Y padding="$4" space="$3">
              <T fontWeight="bold">
                {isEditing ? t('safety.editContact') : t('safety.addContact')}
              </T>

              <F onSubmit={handleSubmit}>
                <Y space="$3">
                  {/* Name Input */}
                  <Y space="$1">
                    <T>{t('safety.contactName')}</T>
                    <I
                      value={formData.name}
                      onChangeText={(text: string) => setFormData({ ...formData, name: text })}
                      placeholder={t('safety.contactNamePlaceholder')}
                    />
                    {validationErrors.name && (
                      <T color="$red9" fontSize="$2">{validationErrors.name}</T>
                    )}
                  </Y>

                  {/* Phone Number Input */}
                  <Y space="$1">
                    <T>{t('safety.phoneNumber')}</T>
                    <I
                      value={formData.phoneNumber}
                      onChangeText={(text: string) => setFormData({ ...formData, phoneNumber: text })}
                      placeholder={t('safety.phoneNumberPlaceholder')}
                      keyboardType="phone-pad"
                    />
                    {validationErrors.phoneNumber && (
                      <T color="$red9" fontSize="$2">{validationErrors.phoneNumber}</T>
                    )}
                  </Y>

                  {/* Relationship Input */}
                  <Y space="$1">
                    <T>{t('safety.relationship')}</T>
                    <I
                      value={formData.relationship}
                      onChangeText={(text: string) => setFormData({ ...formData, relationship: text })}
                      placeholder={t('safety.relationshipPlaceholder')}
                    />
                    {validationErrors.relationship && (
                      <T color="$red9" fontSize="$2">{validationErrors.relationship}</T>
                    )}
                  </Y>

                  {/* Submit Button */}
                  <X space="$2" marginTop="$2">
                    <B
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
                    </B>

                    {isEditing && (
                      <B
                        flex={1}
                        variant="outlined"
                        onPress={handleCancel}
                      >
                        {t('common.cancel')}
                      </B>
                    )}
                  </X>
                </Y>
              </F>
            </Y>
          </C>

          {/* Contact List */}
          <Y space="$2">
            <T fontWeight="bold" fontSize="$5">{t('safety.yourContacts')}</T>

            {isLoadingContacts ? (
              <Y alignItems="center" padding="$4">
                <ActivityIndicator size="small" color="#0000ff" />
              </Y>
            ) : emergencyContacts.length === 0 ? (
              <C padding="$4" marginTop="$2">
                <T textAlign="center">{t('safety.noContactsAdded')}</T>
              </C>
            ) : (
              <Y space="$2">
                {emergencyContacts.map((contact) => (
                  <C key={contact.id} borderRadius="$4" bordered>
                    <Y padding="$3">
                      <X justifyContent="space-between">
                        <T fontWeight="bold">{contact.name}</T>
                        <T fontSize="$2" color="$gray9">{contact.relationship}</T>
                      </X>
                      <T>{contact.phoneNumber}</T>

                      <X space="$2" marginTop="$2">
                        <B
                          size="$2"
                          flex={1}
                          onPress={() => handleEdit(contact.id)}
                        >
                          {t('common.edit')}
                        </B>
                        <B
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
                        </B>
                      </X>
                    </Y>
                  </C>
                ))}
              </Y>
            )}
          </Y>

          {/* Back Button */}
          <B
            variant="outlined"
            onPress={() => navigation.goBack()}
            marginTop="$2"
          >
            {t('common.back')}
          </B>
        </Y>
      </ScrollView>
    </SafeAreaView>
  );
}
