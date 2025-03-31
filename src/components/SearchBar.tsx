import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';
import { SearchInput } from './SearchInput';
import { UserDropdown } from './UserDropdown';
import { RepositoryList } from './RepositoryList';
import type { GithubUser, Repository } from '../types/github';

const searchSchema = z.string().min(1, 'Username is required');

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const controller = new AbortController();

    const searchUsers = async () => {
      if (!debouncedSearch) {
        setUsers([]);
        return;
      }

      try {
        searchSchema.parse(debouncedSearch);
        setError('');
        setIsLoading(true);
        const { data } = await axios.get(
          `https://api.github.com/search/users?q=${debouncedSearch}&per_page=5`,
          {
            signal: controller.signal,
          },
        );
        setUsers(data.items || []);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setError(err.errors[0].message);
        }
        if (!axios.isCancel(err)) {
          setUsers([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    searchUsers();
    return () => controller.abort();
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchUserRepos = async () => {
      if (!selectedUser) return;

      setIsLoadingRepos(true);
      try {
        const { data } = await axios.get<Repository[]>(
          `https://api.github.com/users/${selectedUser}/repos?sort=updated&per_page=100`,
        );
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setRepos([]);
      } finally {
        setIsLoadingRepos(false);
      }
    };

    fetchUserRepos();
  }, [selectedUser]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setShowDropdown(true);
    setSelectedUser(null);
    setRepos([]);
  };

  const handleUserSelect = (user: GithubUser) => {
    setSearch(user.login);
    setShowDropdown(false);
    setSelectedUser(user.login);
  };

  return (
    <div className='relative z-10 w-[354px] sm:w-[484px] h-full top-8'>
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)}
      />

      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}

      {showDropdown && (search || isLoading) && (
        <UserDropdown users={users} isLoading={isLoading} onSelectUser={handleUserSelect} />
      )}

      {selectedUser && <RepositoryList repos={repos} isLoading={isLoadingRepos} />}
    </div>
  );
};

export default SearchBar;
