import { create } from 'zustand';
import { supabase } from '../supabase/supabaseClient';

export interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  relationship: string;
  userId?: string;
}

interface SafetyState {
  emergencyContacts: EmergencyContact[];
  isLocationSharingEnabled: boolean;
  isLoadingContacts: boolean;
  isAddingContact: boolean;
  isRemovingContact: boolean;
  error: string | null;
  
  // Actions
  fetchEmergencyContacts: () => Promise<void>;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'> & { id?: string }) => Promise<void>;
  removeEmergencyContact: (id: string) => Promise<void>;
  toggleLocationSharing: () => void;
  clearError: () => void;
}

export const useSafetyStore = create<SafetyState>((set, get) => ({
  emergencyContacts: [],
  isLocationSharingEnabled: false,
  isLoadingContacts: false,
  isAddingContact: false,
  isRemovingContact: false,
  error: null,

  fetchEmergencyContacts: async () => {
    try {
      set({ isLoadingContacts: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          emergencyContacts: [],
          isLoadingContacts: false 
        });
        return;
      }
      
      // Fetch emergency contacts from Supabase
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('name');
      
      if (error) {
        set({ error: error.message, isLoadingContacts: false });
        return;
      }
      
      // Transform data to match our interface
      const transformedData: EmergencyContact[] = data.map(item => ({
        id: item.id,
        name: item.name,
        phoneNumber: item.phone_number,
        relationship: item.relationship,
        userId: item.user_id,
      }));
      
      set({ 
        emergencyContacts: transformedData, 
        isLoadingContacts: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch emergency contacts', 
        isLoadingContacts: false 
      });
    }
  },

  addEmergencyContact: async (contact) => {
    try {
      set({ isAddingContact: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          error: 'User not authenticated', 
          isAddingContact: false 
        });
        return;
      }
      
      // Check if this is an update or a new contact
      const isUpdate = !!contact.id;
      
      // Prepare data for insertion/update
      const contactData = {
        name: contact.name,
        phone_number: contact.phoneNumber,
        relationship: contact.relationship,
        user_id: user.id,
      };
      
      let data, error;
      
      if (isUpdate) {
        // Update existing contact
        const result = await supabase
          .from('emergency_contacts')
          .update(contactData)
          .eq('id', contact.id)
          .eq('user_id', user.id) // Security check
          .select();
          
        data = result.data;
        error = result.error;
      } else {
        // Insert new contact
        const result = await supabase
          .from('emergency_contacts')
          .insert(contactData)
          .select();
          
        data = result.data;
        error = result.error;
      }
      
      if (error) {
        set({ error: error.message, isAddingContact: false });
        return;
      }
      
      // Refresh the contacts list
      await get().fetchEmergencyContacts();
      
      set({ isAddingContact: false });
    } catch (error) {
      set({ 
        error: 'Failed to add emergency contact', 
        isAddingContact: false 
      });
    }
  },

  removeEmergencyContact: async (id) => {
    try {
      set({ isRemovingContact: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          error: 'User not authenticated', 
          isRemovingContact: false 
        });
        return;
      }
      
      // Delete the contact
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Security check
      
      if (error) {
        set({ error: error.message, isRemovingContact: false });
        return;
      }
      
      // Update local state
      set(state => ({ 
        emergencyContacts: state.emergencyContacts.filter(c => c.id !== id),
        isRemovingContact: false 
      }));
    } catch (error) {
      set({ 
        error: 'Failed to remove emergency contact', 
        isRemovingContact: false 
      });
    }
  },

  toggleLocationSharing: () => {
    set(state => ({ 
      isLocationSharingEnabled: !state.isLocationSharingEnabled 
    }));
  },

  clearError: () => {
    set({ error: null });
  },
}));
