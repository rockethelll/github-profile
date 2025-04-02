import { create } from 'zustand';
import { User, Repository } from '../types/github';

interface Store {
  user: User | null;
  selectedUser: string | null;
  repos: Repository[];
  setUser: (user: User | null) => void;
  setSelectedUser: (username: string | null) => void;
  setRepos: (repos: Repository[]) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  selectedUser: null,
  repos: [],
  setUser: (user) => set({ user }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setRepos: (repos) => set({ repos }),
}));
