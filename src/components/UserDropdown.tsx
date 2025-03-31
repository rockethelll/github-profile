type GithubUser = {
  login: string;
  avatar_url: string;
  id: number;
};

type UserDropdownProps = {
  users: GithubUser[];
  isLoading: boolean;
  onSelectUser: (user: GithubUser) => void;
};

export const UserDropdown = ({ users, isLoading, onSelectUser }: UserDropdownProps) => {
  return (
    <div className='absolute w-full mt-1 bg-background rounded-lg shadow-lg max-h-[300px] overflow-y-auto'>
      {isLoading ? (
        <div className='p-4 text-center'>Loading...</div>
      ) : users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className='flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer'
            onClick={() => onSelectUser(user)}
          >
            <img src={user.avatar_url} alt={user.login} className='w-8 h-8 rounded-full' />
            <span>{user.login}</span>
          </div>
        ))
      ) : (
        <div className='p-4 text-center'>No users found</div>
      )}
    </div>
  );
};
