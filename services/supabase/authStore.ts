import { create } from 'zustand';
import { type User, type Session } from './supabaseClient';
import { authService } from './authService';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    const { user, session, error } = await authService.signInWithEmail(email, password);
    
    if (error) {
      set({ isLoading: false, error: error.message });
      return;
    }
    
    set({ 
      user, 
      session, 
      isAuthenticated: !!user, 
      isLoading: false 
    });
  },

  signUp: async (email: string, password: string, phone?: string) => {
    set({ isLoading: true, error: null });
    
    const { user, session, error } = await authService.signUpWithEmail(email, password, phone);
    
    if (error) {
      set({ isLoading: false, error: error.message });
      return;
    }
    
    set({ 
      user, 
      session, 
      isAuthenticated: !!user, 
      isLoading: false 
    });
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    
    const { error } = await authService.signOut();
    
    if (error) {
      set({ isLoading: false, error: error.message });
      return;
    }
    
    set({ 
      user: null, 
      session: null, 
      isAuthenticated: false, 
      isLoading: false 
    });
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    
    const { error } = await authService.resetPassword(email);
    
    if (error) {
      set({ isLoading: false, error: error.message });
      return;
    }
    
    set({ isLoading: false });
  },

  loadUser: async () => {
    set({ isLoading: true, error: null });
    
    const { session, error: sessionError } = await authService.getSession();
    
    if (sessionError) {
      set({ 
        isLoading: false, 
        error: sessionError.message,
        user: null,
        session: null,
        isAuthenticated: false
      });
      return;
    }
    
    if (!session) {
      set({ 
        isLoading: false,
        user: null,
        session: null,
        isAuthenticated: false
      });
      return;
    }
    
    const { user, error: userError } = await authService.getUser();
    
    if (userError) {
      set({ 
        isLoading: false, 
        error: userError.message,
        user: null,
        session: null,
        isAuthenticated: false
      });
      return;
    }
    
    set({ 
      user, 
      session, 
      isAuthenticated: !!user, 
      isLoading: false 
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
