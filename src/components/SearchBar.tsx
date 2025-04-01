import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { RepositoryList } from './RepositoryList';
import { useGithubRepos } from '../hooks/useGithubRepos';
import { useGithubUser } from '../hooks/useGithubUser';
import { useStore } from '../store/useStore';
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
      <SearchInput
        search={search}
        setSearch={setSearch}
        error={error}
        onSubmit={handleSubmit}
      />
      {error && <p className='p-2 text-sm text-red-500'>{error}</p>}
      {isLoading && <p className='p-2 text-sm text-foreground'>Loading...</p>}
      {search.length > 0 && !isLoading && user && (
        <div className='absolute w-full mt-2 overflow-hidden rounded-lg shadow-lg bg-gradient-1'>
          <div
            key={user.login}
            className='flex items-center gap-4 p-2 h-[88px] cursor-pointer hover:bg-white/10'
            onClick={() => {
              setSearch(user.login);
              setSelectedUser(user.login);
              setSearch('');
            }}
          >
            <img src={user.avatar_url} alt={user.login} className='w-[72px] h-[72px] rounded-xl' />
            <div className='flex flex-col'>
              <p className='font-semibold'>{user.login}</p>
              <p className='overflow-hidden text-sm text-card-text '>
                {user.bio?.length > 100 ? `${user.bio.slice(0, 70)}...` : user.bio}
              </p>
            </div>
          </div>
        </div>
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
