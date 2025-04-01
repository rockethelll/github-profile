export type GithubUser = {
  id: number;
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

export type Repository = {
  id: number;
  name: string;
  description: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  license: {
    name: string;
  } | null;
  html_url: string;
};
