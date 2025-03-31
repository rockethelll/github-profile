type Repository = {
  id: number;
  name: string;
  description: string | null;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
  license: {
    name: string;
  } | null;
  html_url: string;
};

type RepositoryCardProps = {
  repo: Repository;
};

const RepositoryCard = ({ repo }: RepositoryCardProps) => (
  <a
    href={repo.html_url}
    target='_blank'
    rel='noopener noreferrer'
    className='p-4 bg-background rounded-lg shadow hover:shadow-md transition-shadow'
  >
    <h3 className='font-semibold text-lg'>{repo.name}</h3>
    {repo.description && <p className='text-sm text-gray-600 mt-1'>{repo.description}</p>}
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
          className='mt-4 w-full py-2 text-center bg-background rounded-lg shadow hover:shadow-md transition-shadow'
        >
          View all {repos.length} repositories
        </button>
      )}
    </div>
  );
}; 