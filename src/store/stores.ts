import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthStore {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAdmin: false,
  loading: true,
  setUser: (user) => set({ user }),
  setAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (loading) => set({ loading }),
}));

interface FilterStore {
  category: string;
  gauge: string;
  grade: string;
  priceMin: number;
  priceMax: number;
  sortBy: string;
  searchQuery: string;
  setFilter: (key: string, value: string | number) => void;
  resetFilters: () => void;
}

const defaultFilters = {
  category: '',
  gauge: '',
  grade: '',
  priceMin: 0,
  priceMax: 10000000,
  sortBy: 'name_asc',
  searchQuery: '',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...defaultFilters,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set(defaultFilters),
}));
