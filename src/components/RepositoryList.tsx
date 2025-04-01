import { Repository } from '../types/github';

type RepositoryCardProps = {
  repo: Repository;
};

const RepositoryCard = ({ repo }: RepositoryCardProps) => (
  <a
    href={repo.html_url}
    target='_blank'
    rel='noopener noreferrer'
    className='p-4 transition-shadow rounded-lg shadow bg-background hover:shadow-md'
  >
    <h3 className='text-lg font-semibold'>{repo.name}</h3>
    {repo.description && <p className='mt-1 text-sm text-gray-600'>{repo.description}</p>}
    <div className='flex gap-4 mt-2 text-sm text-gray-500'>
      <span>⭐ {repo.stargazers_count}</span>
      <span>🍴 {repo.forks_count}</span>
    </div>
  </a>
);

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
      <div className='grid grid-cols-2 gap-4'>
        {firstFourRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      {repos.length > 4 && (
        <button
          onClick={() => console.log('View all')}
          className='w-full py-2 mt-4 text-center transition-shadow rounded-lg shadow bg-background hover:shadow-md'
        >
          View all {repos.length} repositories
        </button>
      )}
    </div>
  );
};
