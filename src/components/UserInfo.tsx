import { GithubUser } from '../types/github';
import UserStats from './UserStats';

type UserInfoProps = {
  user: GithubUser;
};

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className='flex flex-col gap-5 lg:flex-row lg:items-center'>
      <div className='bg-background w-[120px] h-[120px] rounded-[20px] flex items-center justify-center mb-8 sm:mb-5 mr-5'>
        <img
          src={user.avatar_url}
          alt={user.login}
          className='w-[100px] h-[100px] rounded-[20px]'
        />
      </div>
      <UserStats label='Followers' value={user.followers} />
      <UserStats label='Following' value={user.following} />
      <UserStats label='Location' value={user.location} />
    </div>
  );
};

export default UserInfo;
