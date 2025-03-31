import searchIcon from '/Search.svg';

type SearchInputProps = {
  search: string;
  setSearch: (search: string) => void;
  error: string | null;
};

const SearchInput = ({ search, setSearch, error }: SearchInputProps) => {
  return (
    <div>
      <form
        className='flex items-center justify-center rounded-lg bg-background'
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='relative w-full'>
          <img
            src={searchIcon}
            alt='Search icon'
            className='absolute w-6 h-6 transform -translate-y-1/2 left-3 top-1/2'
          />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='username'
            className='w-full py-4 pl-12 pr-4 rounded-lg'
          />
        </div>
      </form>
      {error && <p className='mt-2 text-red-500'>{error}</p>}
    </div>
  );
};

export default SearchInput;
