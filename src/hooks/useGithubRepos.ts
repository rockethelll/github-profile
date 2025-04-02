import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useStore } from '../store/useStore';
import { Repository } from '../types/github';

export const useGithubRepos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setRepos } = useStore();

  const fetchRepos = useCallback(
    async (username: string) => {
      if (!username) return;

      setIsLoading(true);
      try {
        const response = await axios.get<Repository[]>(
          `https://api.github.com/users/${username}/repos`,
        );
        const sortedRepos = response.data.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        setRepos(sortedRepos);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setRepos],
  );

  return { isLoading, error, fetchRepos };
};
