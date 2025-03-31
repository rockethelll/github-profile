import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';

const searchSchema = z.string().min(1, 'Username is required');

type User = {
  login: string;
  avatar_url: string;
  url: string;
};

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const searchResult = searchSchema.safeParse(debouncedSearch);
    const controller = new AbortController();

    if (!searchResult.success) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${debouncedSearch}&per_page=5`,
          { signal: controller.signal },
        );

        setUser(response.data.items[0]);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.name === 'CanceledError') return;
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  return (
    <div className='relative z-10 w-[354px] sm:w-[484px] h-full top-8'>
      <SearchInput search={search} setSearch={setSearch} error={error} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && (
        <p>{user.login}</p>
        // <div className='flex items-center gap-4'>
        //   <img src={user.avatar_url} alt={user.login} className='w-10 h-10 rounded-full' />
        //   <p>{user.login}</p>
        // </div>
      )}
    </div>
  );
};

export default SearchBar;
