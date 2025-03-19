import { create } from 'zustand';
import { supabase } from '../supabase/supabaseClient';
import { locationService } from '../location/locationService';

export interface CatchRecord {
  id: string;
  fishSpecies: string;
  quantity: number;
  unit: string;
  location: string;
  date: string;
  gearUsed: string;
  effortHours: number;
  notes?: string;
  userId?: string;
  latitude?: number;
  longitude?: number;
}

export interface CatchStatistics {
  totalCatches: number;
  totalQuantity: number;
  mostCaughtSpecies: string;
  averageEffortHours: number;
  bestLocation: string;
}

interface CatchDataState {
  catchRecords: CatchRecord[];
  statistics: CatchStatistics | null;
  isLoadingRecords: boolean;
  isAddingRecord: boolean;
  isDeletingRecord: boolean;
  isCalculatingStats: boolean;
  error: string | null;
  
  // Actions
  fetchCatchRecords: () => Promise<void>;
  addCatchRecord: (record: Omit<CatchRecord, 'id'>) => Promise<void>;
  deleteCatchRecord: (id: string) => Promise<void>;
  calculateStatistics: () => Promise<void>;
  clearError: () => void;
}

export const useCatchDataStore = create<CatchDataState>((set, get) => ({
  catchRecords: [],
  statistics: null,
  isLoadingRecords: false,
  isAddingRecord: false,
  isDeletingRecord: false,
  isCalculatingStats: false,
  error: null,

  fetchCatchRecords: async () => {
    try {
      set({ isLoadingRecords: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          catchRecords: [],
          isLoadingRecords: false 
        });
        return;
      }
      
      // Fetch catch records from Supabase
      const { data, error } = await supabase
        .from('catch_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (error) {
        set({ error: error.message, isLoadingRecords: false });
        return;
      }
      
      // Transform data to match our interface
      const transformedData: CatchRecord[] = data.map(item => ({
        id: item.id,
        fishSpecies: item.fish_species,
        quantity: item.quantity,
        unit: item.unit,
        location: item.location,
        date: item.date,
        gearUsed: item.gear_used,
        effortHours: item.effort_hours,
        notes: item.notes,
        userId: item.user_id,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      
      set({ 
        catchRecords: transformedData, 
        isLoadingRecords: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch catch records', 
        isLoadingRecords: false 
      });
    }
  },

  addCatchRecord: async (record) => {
    try {
      set({ isAddingRecord: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          error: 'User not authenticated', 
          isAddingRecord: false 
        });
        return;
      }
      
      // Get current location if not provided
      if (!record.latitude || !record.longitude) {
        try {
          const locationResult = await locationService.getCurrentLocation();
          
          if (locationResult.coordinates) {
            record.latitude = locationResult.coordinates.latitude;
            record.longitude = locationResult.coordinates.longitude;
            
            // Use the reverse geocoded location name if no location was provided
            if (!record.location && locationResult.locationName) {
              record.location = locationResult.locationName;
            }
          }
        } catch (error) {
          console.warn('Failed to get location data:', error);
          // Continue without location data if it fails
        }
      }
      
      // Prepare data for insertion
      const recordData = {
        fish_species: record.fishSpecies,
        quantity: record.quantity,
        unit: record.unit,
        location: record.location,
        date: record.date,
        gear_used: record.gearUsed,
        effort_hours: record.effortHours,
        notes: record.notes || '',
        user_id: user.id,
        latitude: record.latitude,
        longitude: record.longitude,
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('catch_records')
        .insert(recordData)
        .select();
      
      if (error) {
        set({ error: error.message, isAddingRecord: false });
        return;
      }
      
      // Transform the returned data
      if (data && data.length > 0) {
        const newRecord: CatchRecord = {
          id: data[0].id,
          fishSpecies: data[0].fish_species,
          quantity: data[0].quantity,
          unit: data[0].unit,
          location: data[0].location,
          date: data[0].date,
          gearUsed: data[0].gear_used,
          effortHours: data[0].effort_hours,
          notes: data[0].notes,
          userId: data[0].user_id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
        };
        
        // Add to local state
        set(state => ({ 
          catchRecords: [newRecord, ...state.catchRecords],
          isAddingRecord: false 
        }));
      }
    } catch (error) {
      set({ 
        error: 'Failed to add catch record', 
        isAddingRecord: false 
      });
    }
  },

  deleteCatchRecord: async (id) => {
    try {
      set({ isDeletingRecord: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ 
          error: 'User not authenticated', 
          isDeletingRecord: false 
        });
        return;
      }
      
      // Delete from Supabase
      const { error } = await supabase
        .from('catch_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Security check
      
      if (error) {
        set({ error: error.message, isDeletingRecord: false });
        return;
      }
      
      // Update local state
      set(state => ({ 
        catchRecords: state.catchRecords.filter(record => record.id !== id),
        isDeletingRecord: false 
      }));
    } catch (error) {
      set({ 
        error: 'Failed to delete catch record', 
        isDeletingRecord: false 
      });
    }
  },

  calculateStatistics: async () => {
    try {
      set({ isCalculatingStats: true, error: null });
      
      const { catchRecords } = get();
      
      if (catchRecords.length === 0) {
        set({
          statistics: null,
          isCalculatingStats: false,
        });
        return;
      }
      
      // Calculate total catches
      const totalCatches = catchRecords.length;
      
      // Calculate total quantity (assuming all records use the same unit)
      const totalQuantity = catchRecords.reduce((sum, record) => sum + record.quantity, 0);
      
      // Find most caught species
      const speciesCounts: Record<string, number> = {};
      catchRecords.forEach(record => {
        speciesCounts[record.fishSpecies] = (speciesCounts[record.fishSpecies] || 0) + record.quantity;
      });
      
      const mostCaughtSpecies = Object.entries(speciesCounts).reduce(
        (max, [species, count]) => count > max.count ? { species, count } : max,
        { species: '', count: 0 }
      ).species;
      
      // Calculate average effort hours
      const totalEffortHours = catchRecords.reduce((sum, record) => sum + record.effortHours, 0);
      const averageEffortHours = totalEffortHours / totalCatches;
      
      // Find best location
      const locationCounts: Record<string, number> = {};
      catchRecords.forEach(record => {
        locationCounts[record.location] = (locationCounts[record.location] || 0) + record.quantity;
      });
      
      const bestLocation = Object.entries(locationCounts).reduce(
        (max, [location, count]) => count > max.count ? { location, count } : max,
        { location: '', count: 0 }
      ).location;
      
      // Set statistics
      set({
        statistics: {
          totalCatches,
          totalQuantity,
          mostCaughtSpecies,
          averageEffortHours,
          bestLocation,
        },
        isCalculatingStats: false,
      });
    } catch (error) {
      set({ 
        error: 'Failed to calculate statistics', 
        isCalculatingStats: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
