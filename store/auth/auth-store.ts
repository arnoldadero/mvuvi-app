import { create } from 'zustand';
import { supabase } from '../../services/supabase/supabaseClient';

// Define user type
interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  location?: string;
  created_at: string;
}

// Define auth state interface
interface AuthState {
  // State
  user: User | null;
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
  clearErrors: () => void;
}

// Create auth store with Zustand
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
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
        
        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            fullName: profileData.full_name || '',
            phoneNumber: profileData.phone_number,
            location: profileData.location,
            created_at: data.user.created_at || new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
        });
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
            },
          ]);
          
        if (profileError) {
          throw new Error(profileError.message);
        }
        
        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            location: userData.location,
            created_at: data.user.created_at || new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
        });
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
}));
