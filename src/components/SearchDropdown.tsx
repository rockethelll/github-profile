import { User } from "../types/github";


type SearchDropdownProps = {
  user: User;
  setSearch: (search: string) => void;
  setSelectedUser: (selectedUser: string) => void;
};

const SearchDropdown = ({ user, setSearch, setSelectedUser }: SearchDropdownProps) => {
  return (
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
  );
};

export default SearchDropdown;
