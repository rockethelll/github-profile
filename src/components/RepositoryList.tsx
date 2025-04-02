import { Repository } from '../types/github';
import RepositoryCard from './RepositoryCard';

type RepositoryListProps = {
  repos: Repository[];
  isLoading: boolean;
};

export const RepositoryList = ({ repos, isLoading }: RepositoryListProps) => {
  const firstFourRepos = repos.slice(0, 4);

  if (isLoading) {
    return <div className='text-center'>Loading repositories...</div>;
  }

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {firstFourRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {repos.length > 4 && (
        <div className='flex justify-center mt-[46px]'>
          <button
            onClick={() => console.log('View all')}
            className='px-6 py-2 text-center transition-all duration-200 cursor-pointer bg-background hover:text-white/60'
          >
            View all {repos.length} repositories
          </button>
        </div>
      )}
    </div>
  );
};
