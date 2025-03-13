import { create } from 'zustand';
import { supabase } from '../supabase/supabaseClient';

export interface MarketPrice {
  id: string;
  fishSpecies: string;
  location: string;
  price: number;
  unit: string;
  date: string;
  reportedBy?: string;
  notes?: string;
}

export interface MarketLocation {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

interface MarketPricesState {
  prices: MarketPrice[];
  locations: MarketLocation[];
  selectedLocation: string | null;
  isLoadingPrices: boolean;
  isLoadingLocations: boolean;
  isAddingPrice: boolean;
  error: string | null;
  
  // Actions
  fetchMarketPrices: (locationId?: string) => Promise<void>;
  fetchMarketLocations: () => Promise<void>;
  addMarketPrice: (price: Omit<MarketPrice, 'id'>) => Promise<void>;
  setSelectedLocation: (locationId: string | null) => void;
  clearError: () => void;
}

export const useMarketPricesStore = create<MarketPricesState>((set, get) => ({
  prices: [],
  locations: [],
  selectedLocation: null,
  isLoadingPrices: false,
  isLoadingLocations: false,
  isAddingPrice: false,
  error: null,

  fetchMarketPrices: async (locationId) => {
    try {
      set({ isLoadingPrices: true, error: null });
      
      // Get current date minus 7 days for recent prices
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      // Build query
      let query = supabase
        .from('market_prices')
        .select('*')
        .gte('date', sevenDaysAgo.toISOString())
        .order('date', { ascending: false });
      
      // Filter by location if provided
      if (locationId) {
        query = query.eq('location_id', locationId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        set({ error: error.message, isLoadingPrices: false });
        return;
      }
      
      // Transform data to match our interface
      const transformedData: MarketPrice[] = data.map(item => ({
        id: item.id,
        fishSpecies: item.fish_species,
        location: item.location_name,
        price: item.price,
        unit: item.unit,
        date: item.date,
        reportedBy: item.reported_by,
        notes: item.notes,
      }));
      
      set({ 
        prices: transformedData, 
        isLoadingPrices: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch market prices', 
        isLoadingPrices: false 
      });
    }
  },

  fetchMarketLocations: async () => {
    try {
      set({ isLoadingLocations: true, error: null });
      
      const { data, error } = await supabase
        .from('market_locations')
        .select('*')
        .order('name');
      
      if (error) {
        set({ error: error.message, isLoadingLocations: false });
        return;
      }
      
      // Transform data to match our interface
      const transformedData: MarketLocation[] = data.map(item => ({
        id: item.id,
        name: item.name,
        region: item.region,
        latitude: item.latitude,
        longitude: item.longitude,
      }));
      
      set({ 
        locations: transformedData, 
        isLoadingLocations: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch market locations', 
        isLoadingLocations: false 
      });
    }
  },

  addMarketPrice: async (price) => {
    try {
      set({ isAddingPrice: true, error: null });
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare data for insertion
      const priceData = {
        fish_species: price.fishSpecies,
        location_id: price.location,
        location_name: get().locations.find(loc => loc.id === price.location)?.name || '',
        price: price.price,
        unit: price.unit,
        date: price.date,
        reported_by: user?.id,
        notes: price.notes || '',
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('market_prices')
        .insert(priceData)
        .select();
      
      if (error) {
        set({ error: error.message, isAddingPrice: false });
        return;
      }
      
      // Refresh the prices list
      await get().fetchMarketPrices(get().selectedLocation || undefined);
      
      set({ isAddingPrice: false });
    } catch (error) {
      set({ 
        error: 'Failed to add market price', 
        isAddingPrice: false 
      });
    }
  },

  setSelectedLocation: (locationId) => {
    set({ selectedLocation: locationId });
  },

  clearError: () => {
    set({ error: null });
  },
}));
