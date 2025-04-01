import BackGroundPattern from './components/BackgroundPattern';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import { GithubUser } from './types/github';
// import { useStore } from './store/useStore';

function App() {
  // const { user } = useStore();

  const user: GithubUser = {
    login: 'rockethelll',
    id: 51137055,
    name: 'Alec Remond',
    avatar_url: 'https://avatars.githubusercontent.com/u/51137055?v=4',
    bio: 'Full-stack developer',
    public_repos: 50,
    followers: 10,
    following: 20,
    location: 'France, Caen',
    blog: 'https://alecremond.com',
    twitter_username: null,
    company: null,
    created_at: '2019-05-28T15:07:53Z',
  };

  return (
    <main className='relative flex flex-col items-center min-h-screen bg-background text-foreground'>
      <BackGroundPattern />
      <SearchBar />
      <div className='flex flex-col justify-start p-8 absolute max-w-[1024px] w-full top-[176px]'>
        {user && <UserInfo user={user} />}
      </div>
    </main>
  );
}

export default App;
