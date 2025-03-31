import searchIcon from '/Search.svg';

const SearchBar = () => {
  return (
    <form className='relative z-10 w-[354px] sm:w-[484px]  h-full top-8 flex justify-center items-center bg-background rounded-lg'>
      <div className='relative w-full'>
        <img
          src={searchIcon}
          alt='Search icon'
          className='absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6'
        />
        <input type='text' placeholder='username' className='w-full pl-12 pr-4 py-4' />
      </div>
    </form>
  );
};

export default SearchBar;
