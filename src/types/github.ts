export type GithubUser = {
  login: string;
  avatar_url: string;
  id: number;
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
