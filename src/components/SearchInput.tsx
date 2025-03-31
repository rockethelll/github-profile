import searchIcon from '/Search.svg';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
};

export const SearchInput = ({ value, onChange, onFocus }: SearchInputProps) => {
  return (
    <form
      className='flex justify-center items-center bg-background rounded-lg'
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='relative w-full'>
        <img
          src={searchIcon}
          alt='Search icon'
          className='absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6'
        />
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder='username'
          className='w-full pl-12 pr-4 py-4 rounded-lg'
        />
      </div>
    </form>
  );
};
