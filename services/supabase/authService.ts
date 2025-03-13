import { supabase, type User, type Session } from './supabaseClient';

interface AuthError {
  message: string;
}

interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

/**
 * Service for handling authentication operations with Supabase
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, session: null, error: { message: error.message } };
      }

      return { 
        user: data.user, 
        session: data.session, 
        error: null 
      };
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: { message: 'An unexpected error occurred' } 
      };
    }
  },

  /**
   * Sign up with email and password
   */
  async signUpWithEmail(email: string, password: string, phone?: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone,
        options: {
          data: {
            phone,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error: { message: error.message } };
      }

      return { 
        user: data.user, 
        session: data.session, 
        error: null 
      };
    } catch (error) {
      return { 
        user: null, 
        session: null, 
        error: { message: 'An unexpected error occurred' } 
      };
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  },

  /**
   * Reset password with email
   */
  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'mvuvi://reset-password',
      });
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  },

  /**
   * Get the current session
   */
  async getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return { session: null, error: { message: error.message } };
      }
      
      return { session: data.session, error: null };
    } catch (error) {
      return { session: null, error: { message: 'An unexpected error occurred' } };
    }
  },

  /**
   * Get the current user
   */
  async getUser(): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        return { user: null, error: { message: error.message } };
      }
      
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: { message: 'An unexpected error occurred' } };
    }
  },

  /**
   * Update the current user's profile
   */
  async updateProfile(userData: { [key: string]: any }): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData,
      });
      
      if (error) {
        return { error: { message: error.message } };
      }
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred' } };
    }
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },
};
