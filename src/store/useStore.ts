import { create } from 'zustand';
import { GithubUser } from '../types/github';



type GithubRepo = {
  name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  updated_at: string;
  license: string;
};

type Store = {
  user: GithubUser | null;
  error: string | null;
  repos: GithubRepo[];
  setUser: (user: GithubUser | null) => void;
  setRepos: (repos: GithubRepo[]) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  error: null,
  repos: [],
  setUser: (user) => set({ user }),
  setRepos: (repos) => set({ repos }),
}));
