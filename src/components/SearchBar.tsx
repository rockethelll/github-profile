import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { RepositoryList } from './RepositoryList';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { useGithubUser } from '../hooks/useGithubUser';
import { useStore } from '../store/useStore';
import SearchDropdown from './SearchDropdown';
const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { user } = useStore();
  const debouncedSearch = useDebounce(search, 500);
  const { isLoading, error, fetchUser } = useGithubUser(debouncedSearch);
  const { repos, isLoading: isLoadingRepos, fetchRepos } = useGithubRepos();

  useEffect(() => {
    fetchUser(debouncedSearch);
  }, [debouncedSearch, fetchUser]);

  useEffect(() => {
    if (selectedUser) {
      fetchRepos(selectedUser);
    }
  }, [selectedUser, fetchRepos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      fetchUser(search);
      fetchRepos(search);
    }
  };

  return (
    <div className='relative z-10 w-[354px] sm:w-[484px] h-full top-8'>
      <SearchInput search={search} setSearch={setSearch} error={error} onSubmit={handleSubmit} />
      {error && <p className='p-2 text-sm text-red-500'>{error}</p>}
      {isLoading && <p className='p-2 text-sm text-foreground'>Loading...</p>}
      {search.length > 0 && !isLoading && user && (
        <SearchDropdown
          key={user.id}
          user={user}
          setSearch={setSearch}
          setSelectedUser={setSelectedUser}
        />
      )}
      {search.length > 0 && !isLoading && !user && (
        <div className='absolute w-full p-3 mt-2 rounded-lg shadow-lg bg-gradient-1'>
          <p className='text-sm text-gray-500'>No user found</p>
        </div>
      )}
      {selectedUser && (
        <div className='mt-8'>
          <RepositoryList repos={repos} isLoading={isLoadingRepos} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
