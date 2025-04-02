import { Repository } from '../types/github';
import RepositoryCard from './RepositoryCard';
import { useState } from 'react';

type RepositoryListProps = {
  repos: Repository[];
  isLoading: boolean;
};

export const RepositoryList = ({ repos, isLoading }: RepositoryListProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedRepos = showAll ? repos : repos.slice(0, 4);

  if (isLoading) {
    return <div className='text-center'>Loading repositories...</div>;
  }

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {displayedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {!showAll && repos.length > 4 && (
        <div className='flex justify-center mt-[46px]'>
          <button
            onClick={() => setShowAll(true)}
            className='px-6 py-2 text-center transition-all duration-200 cursor-pointer bg-background hover:text-white/60'
          >
            View all repositories
          </button>
        </div>
      )}
    </div>
  );
};
