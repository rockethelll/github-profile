import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useStore } from '../store/useStore';

export const useGithubUser = (debouncedSearch: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useStore();

  const fetchUser = useCallback(
    async (username: string) => {
      if (!username) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 404) {
            setError('User not found');
          } else if (err.response?.status === 403) {
            setError('Rate limit exceeded. Please add a GitHub token.');
          } else {
            setError(err.message);
          }
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setUser],
  );

  useEffect(() => {
    if (debouncedSearch) {
      fetchUser(debouncedSearch);
    }
  }, [debouncedSearch, fetchUser]);

  return { isLoading, error, fetchUser };
};
