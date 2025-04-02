import { useEffect } from 'react';
import SearchInput from './SearchInput';
import { useGithubUser } from '../hooks/useGithubUser';
import { useStore } from '../store/useStore';
import { useGithubSearch } from '../hooks/useGithubSearch';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const { search, setSearch, setSelectedUser, debouncedSearch } = useGithubSearch();
  const { user } = useStore();
  const { isLoading, error, fetchUser } = useGithubUser(debouncedSearch);

  useEffect(() => {
    fetchUser(debouncedSearch);
  }, [debouncedSearch, fetchUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      fetchUser(search);
    }
  };

  return (
    <div className='relative z-10 w-[354px] sm:w-[484px] h-full top-8'>
      <SearchInput search={search} setSearch={setSearch} error={error} onSubmit={handleSubmit} />

      {error && <p className='p-2 text-sm text-red-500'>{error}</p>}

      <SearchResults
        isLoading={isLoading}
        user={user}
        search={search}
        setSearch={setSearch}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default SearchBar;
