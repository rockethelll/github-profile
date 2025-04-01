import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { Repository } from '../types/github';

export const useGithubRepos = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = useCallback(async (username: string) => {
    if (!username) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      );
      setRepos(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { repos, isLoading, error, fetchRepos };
};
