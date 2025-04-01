import { create } from 'zustand';

type GithubUser = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string | null;
  company: string | null;
  created_at: string;
};

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
