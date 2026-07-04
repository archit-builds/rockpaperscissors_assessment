import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean; // used for mobile drawer
  setSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

interface DirectoryFilterState {
  search: string;
  department: string;
  status: string;
  setSearch: (v: string) => void;
  setDepartment: (v: string) => void;
  setStatus: (v: string) => void;
  reset: () => void;
}

export const useDirectoryFilterStore = create<DirectoryFilterState>((set) => ({
  search: '',
  department: 'all',
  status: 'all',
  setSearch: (v) => set({ search: v }),
  setDepartment: (v) => set({ department: v }),
  setStatus: (v) => set({ status: v }),
  reset: () => set({ search: '', department: 'all', status: 'all' }),
}));
