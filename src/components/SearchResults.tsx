import { User } from '../types/github';
import SearchDropdown from './SearchDropdown';

interface SearchResultsProps {
  isLoading: boolean;
  user: User | null;
  search: string;
  setSearch: (search: string) => void;
  setSelectedUser: (user: string) => void;
}

const SearchResults = ({
  isLoading,
  user,
  search,
  setSearch,
  setSelectedUser,
}: SearchResultsProps) => {
  if (isLoading) {
    return <p className='p-2 text-sm text-foreground'>Loading...</p>;
  }

  if (search.length > 0 && user) {
    return (
      <SearchDropdown
        key={user.id}
        user={user}
        setSearch={setSearch}
        setSelectedUser={setSelectedUser}
      />
    );
  }

  if (search.length > 0 && !user) {
    return (
      <div className='absolute w-full p-3 mt-2 rounded-lg shadow-lg bg-gradient-1'>
        <p className='text-sm text-gray-500'>No user found</p>
      </div>
    );
  }

  return null;
};

export default SearchResults;
