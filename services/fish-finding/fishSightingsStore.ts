import { create } from 'zustand';
import { supabase } from '../supabase/supabaseClient';

export interface FishSighting {
  id: string;
  species: string;
  quantity: string;
  location: string;
  notes: string;
  latitude: number;
  longitude: number;
  reportedAt: string;
  isFavorable: boolean;
  userId?: string;
}

interface FishSightingsState {
  sightings: FishSighting[];
  isLoadingSightings: boolean;
  isAddingSighting: boolean;
  error: string | null;
  
  // Actions
  fetchSightings: () => Promise<void>;
  getSightingById: (id: string) => FishSighting | undefined;
  addSighting: (sighting: Omit<FishSighting, 'id'>) => Promise<void>;
  clearError: () => void;
}

export const useFishSightingsStore = create<FishSightingsState>((set, get) => ({
  sightings: [],
  isLoadingSightings: false,
  isAddingSighting: false,
  error: null,

  fetchSightings: async () => {
    try {
      set({ isLoadingSightings: true, error: null });
      
      // Get current date minus 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Fetch sightings from Supabase
      const { data, error } = await supabase
        .from('fish_sightings')
        .select('*')
        .gte('reported_at', sevenDaysAgo.toISOString())
        .order('reported_at', { ascending: false });
      
      if (error) {
        set({ error: error.message, isLoadingSightings: false });
        return;
      }
      
      // Transform data to match our interface
      const transformedData: FishSighting[] = data.map(item => ({
        id: item.id,
        species: item.species,
        quantity: item.quantity,
        location: item.location,
        notes: item.notes || '',
        latitude: item.latitude,
        longitude: item.longitude,
        reportedAt: item.reported_at,
        isFavorable: item.is_favorable,
        userId: item.user_id,
      }));
      
      set({ 
        sightings: transformedData, 
        isLoadingSightings: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch fish sightings', 
        isLoadingSightings: false 
      });
    }
  },

  getSightingById: (id: string) => {
    return get().sightings.find(sighting => sighting.id === id);
  },

  addSighting: async (sighting: Omit<FishSighting, 'id'>) => {
    try {
      set({ isAddingSighting: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare data for insertion
      const sightingData = {
        species: sighting.species,
        quantity: sighting.quantity,
        location: sighting.location,
        notes: sighting.notes,
        latitude: sighting.latitude,
        longitude: sighting.longitude,
        reported_at: sighting.reportedAt,
        is_favorable: sighting.isFavorable,
        user_id: user?.id,
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('fish_sightings')
        .insert(sightingData)
        .select();
      
      if (error) {
        set({ error: error.message, isAddingSighting: false });
        return;
      }
      
      // Transform the returned data
      if (data && data.length > 0) {
        const newSighting: FishSighting = {
          id: data[0].id,
          species: data[0].species,
          quantity: data[0].quantity,
          location: data[0].location,
          notes: data[0].notes || '',
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          reportedAt: data[0].reported_at,
          isFavorable: data[0].is_favorable,
          userId: data[0].user_id,
        };
        
        // Add to local state
        set(state => ({ 
          sightings: [newSighting, ...state.sightings],
          isAddingSighting: false 
        }));
      }
    } catch (error) {
      set({ 
        error: 'Failed to add fish sighting', 
        isAddingSighting: false 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
