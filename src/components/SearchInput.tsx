import SearchBar from '../assets/Search.svg';

type SearchInputProps = {
  search: string;
  error: string | null;
  setSearch: (search: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const SearchInput = ({ search, setSearch, error, onSubmit }: SearchInputProps) => {
  return (
    <>
      <form
        className='flex items-center justify-center rounded-lg bg-background'
        onSubmit={onSubmit}
      >
        <div className='relative w-full'>
          <img
            src={SearchBar}
            alt='Search'
            className='absolute w-6 h-6 -translate-y-1/2 text-foreground left-3 top-1/2'
          />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='username'
            autoFocus
            autoComplete='off'
            className='w-full py-4 pl-12 pr-4 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-white/40'
          />
        </div>
      </form>
      {error && <p className='mt-2 text-red-500'>{error}</p>}
    </>
  );
};

export default SearchInput;
