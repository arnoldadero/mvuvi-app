import { create } from 'zustand';
import { supabase } from '../../services/supabase/supabaseClient';

// Define account types
export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS_BOAT_OWNER = 'business_boat_owner',
  BUSINESS_DISTRIBUTOR = 'business_distributor',
  ADMIN = 'admin'
}

// Define user type
interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  location?: string;
  accountType: AccountType;
  created_at: string;
}

// Define business profile type
interface BusinessProfile {
  id: string;
  userId: string;
  businessName?: string;
  businessType: 'boat_owner' | 'distributor';
  registrationNumber?: string;
  taxId?: string;
  businessAddress?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  created_at: string;
  updated_at: string;
}

// Define auth state interface
interface AuthState {
  // State
  user: User | null;
  businessProfile: BusinessProfile | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isAuthenticated: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Omit<User, 'id' | 'created_at'>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateBusinessProfile: (profileData: Partial<BusinessProfile>) => Promise<void>;
  fetchBusinessProfile: () => Promise<void>;
  clearErrors: () => void;
  hasPermission: (permission: string) => boolean;
}

// Create auth store with Zustand
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  businessProfile: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  isAuthenticated: false,

  // Actions
  signIn: async (email, password) => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        // Fetch user profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        const user = {
          id: data.user.id,
          email: data.user.email || '',
          fullName: profileData.full_name || '',
          phoneNumber: profileData.phone_number,
          location: profileData.location,
          accountType: profileData.account_type || AccountType.PERSONAL,
          created_at: data.user.created_at || new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // If user is a business account, fetch business profile
        if (user.accountType === AccountType.BUSINESS_BOAT_OWNER ||
            user.accountType === AccountType.BUSINESS_DISTRIBUTOR) {
          await get().fetchBusinessProfile();
        }
      }
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to sign in',
        isLoading: false,
      });
    }
  },

  signUp: async (email, password, userData) => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        // Create user profile in Supabase
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: userData.fullName,
              phone_number: userData.phoneNumber,
              location: userData.location,
              account_type: userData.accountType || AccountType.PERSONAL,
            },
          ]);

        if (profileError) {
          throw new Error(profileError.message);
        }

        const user = {
          id: data.user.id,
          email: data.user.email || '',
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          location: userData.location,
          accountType: userData.accountType || AccountType.PERSONAL,
          created_at: data.user.created_at || new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // If creating a business account, create business profile
        if (user.accountType === AccountType.BUSINESS_BOAT_OWNER ||
            user.accountType === AccountType.BUSINESS_DISTRIBUTOR) {
          // Create business profile
          const businessType = user.accountType === AccountType.BUSINESS_BOAT_OWNER ? 'boat_owner' : 'distributor';

          await get().updateBusinessProfile({
            userId: user.id,
            businessType,
            businessName: userData.businessName,
            contactPerson: userData.fullName,
            contactEmail: userData.email,
            contactPhone: userData.phoneNumber,
          });
        }
      }
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to sign up',
        isLoading: false,
      });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to sign out',
        isLoading: false,
      });
    }
  },

  resetPassword: async (email) => {
    try {
      set({ isLoading: true, hasError: false, errorMessage: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw new Error(error.message);
      }

      set({ isLoading: false });
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to reset password',
        isLoading: false,
      });
    }
  },

  updateProfile: async (userData) => {
    try {
      const { user } = get();

      if (!user) {
        throw new Error('User not authenticated');
      }

      set({ isLoading: true, hasError: false, errorMessage: null });

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: userData.fullName,
          phone_number: userData.phoneNumber,
          location: userData.location,
          account_type: userData.accountType || user.accountType,
        })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      set({
        user: { ...user, ...userData },
        isLoading: false,
      });
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false,
      });
    }
  },

  clearErrors: () => {
    set({ hasError: false, errorMessage: null });
  },

  updateBusinessProfile: async (profileData) => {
    try {
      const { user, businessProfile } = get();

      if (!user) {
        throw new Error('User not authenticated');
      }

      set({ isLoading: true, hasError: false, errorMessage: null });

      if (businessProfile) {
        // Update existing business profile
        const { error } = await supabase
          .from('business_profiles')
          .update({
            business_name: profileData.businessName,
            registration_number: profileData.registrationNumber,
            tax_id: profileData.taxId,
            business_address: profileData.businessAddress,
            contact_person: profileData.contactPerson,
            contact_email: profileData.contactEmail,
            contact_phone: profileData.contactPhone,
            updated_at: new Date().toISOString(),
          })
          .eq('id', businessProfile.id);

        if (error) {
          throw new Error(error.message);
        }

        set({
          businessProfile: { ...businessProfile, ...profileData },
          isLoading: false,
        });
      } else {
        // Create new business profile
        const businessType = user.accountType === AccountType.BUSINESS_BOAT_OWNER ? 'boat_owner' : 'distributor';

        const { data, error } = await supabase
          .from('business_profiles')
          .insert([
            {
              user_id: user.id,
              business_type: profileData.businessType || businessType,
              business_name: profileData.businessName,
              registration_number: profileData.registrationNumber,
              tax_id: profileData.taxId,
              business_address: profileData.businessAddress,
              contact_person: profileData.contactPerson,
              contact_email: profileData.contactEmail,
              contact_phone: profileData.contactPhone,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.length > 0) {
          set({
            businessProfile: {
              id: data[0].id,
              userId: data[0].user_id,
              businessType: data[0].business_type,
              businessName: data[0].business_name,
              registrationNumber: data[0].registration_number,
              taxId: data[0].tax_id,
              businessAddress: data[0].business_address,
              contactPerson: data[0].contact_person,
              contactEmail: data[0].contact_email,
              contactPhone: data[0].contact_phone,
              created_at: data[0].created_at,
              updated_at: data[0].updated_at,
            },
            isLoading: false,
          });
        }
      }
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to update business profile',
        isLoading: false,
      });
    }
  },

  fetchBusinessProfile: async () => {
    try {
      const { user } = get();

      if (!user) {
        return;
      }

      set({ isLoading: true, hasError: false, errorMessage: null });

      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for no rows returned
        throw new Error(error.message);
      }

      if (data) {
        set({
          businessProfile: {
            id: data.id,
            userId: data.user_id,
            businessType: data.business_type,
            businessName: data.business_name,
            registrationNumber: data.registration_number,
            taxId: data.tax_id,
            businessAddress: data.business_address,
            contactPerson: data.contact_person,
            contactEmail: data.contact_email,
            contactPhone: data.contact_phone,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to fetch business profile',
        isLoading: false,
      });
    }
  },

  hasPermission: (permission) => {
    const { user } = get();

    if (!user) {
      return false;
    }

    // Admin has all permissions
    if (user.accountType === AccountType.ADMIN) {
      return true;
    }

    // Define permission mappings for different account types
    const permissionMap = {
      [AccountType.PERSONAL]: [
        'view:products',
        'order:create',
        'profile:edit',
        'tracking:view',
        'favorites:manage',
      ],
      [AccountType.BUSINESS_BOAT_OWNER]: [
        'view:products',
        'order:create',
        'profile:edit',
        'tracking:view',
        'favorites:manage',
        'vessel:manage',
        'catch:log',
        'inventory:manage',
        'sales:view',
        'reports:generate',
      ],
      [AccountType.BUSINESS_DISTRIBUTOR]: [
        'view:products',
        'order:create',
        'profile:edit',
        'tracking:view',
        'favorites:manage',
        'shipments:manage',
        'inventory:manage',
        'orders:process',
        'quality:manage',
        'reports:generate',
      ],
    };

    return permissionMap[user.accountType]?.includes(permission) || false;
  },
}));
