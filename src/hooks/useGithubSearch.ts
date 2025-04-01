import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { useStore } from '../store/useStore';

export const useGithubSearch = (initialSearch = '') => {
  const [search, setSearch] = useState(initialSearch);
  const { selectedUser, setSelectedUser } = useStore();
  const debouncedSearch = useDebounce(search, 500);

  // Move all the user and repos fetching logic here
  return { search, setSearch, selectedUser, setSelectedUser, debouncedSearch };
};
