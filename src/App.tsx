import BackGroundPattern from './components/BackgroundPattern';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import { useStore } from './store/useStore';
import RepositorySection from './components/RepositorySection';
import { useGithubRepos } from './hooks/useGithubRepos';
import { useEffect } from 'react';

function App() {
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
        {user && <UserInfo user={user} />}
        <RepositorySection
          selectedUser={selectedUser}
          repos={repos}
          isLoadingRepos={isLoadingRepos}
        />
      </div>
    </main>
  );
}

export default App;
