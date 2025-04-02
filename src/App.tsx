import BackGroundPattern from './components/BackgroundPattern';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import { useStore } from './store/useStore';
import { RepositoryList } from './components/RepositoryList';
import { useGithubRepos } from './hooks/useGithubRepos';
import { useEffect } from 'react';

// TODO: remove line above and use the one below
// import { user } from './data/user';

function App() {
  // const { selectedUser, repos } = useStore();
  // TODO: remove line above and use the one below
  const { user, selectedUser, repos } = useStore();
  const { isLoading: isLoadingRepos, fetchRepos } = useGithubRepos();

  useEffect(() => {
    if (selectedUser) {
      fetchRepos(selectedUser);
    }
  }, [selectedUser, fetchRepos]);

  return (
    <main className='relative flex flex-col items-center min-h-screen bg-background text-foreground'>
      <BackGroundPattern />
      <SearchBar />
      <div className='flex flex-col justify-start p-8 absolute max-w-[1024px] w-full top-[176px]'>
        {user && (
          <>
            <UserInfo user={user} />

            <h1 className='mt-8 lg:mt-0 mb-2 text-[32px]'>{user.login} </h1>
            <p className='text-sm text-card-text mb-[34px] '>{user.bio}</p>

            {selectedUser && (
              <div className=''>
                <RepositoryList repos={repos} isLoading={isLoadingRepos} />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
