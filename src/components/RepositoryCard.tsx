import star from '../assets/Star.svg';
import fork from '../assets/Nesting.svg';
import license from '../assets/Chield_alt.svg';
import { Repository } from '../types/github';
type RepositoryCardProps = {
  repo: Repository;
};

const RepositoryCard = ({ repo }: RepositoryCardProps) => (
  <a
    href={repo.html_url}
    target='_blank'
    rel='noopener noreferrer'
    className='p-5 transition-all duration-200 shadow rounded-xl card hover:bg-white/10 flex flex-col min-h-[160px]'
  >
    <div className='flex-grow'>
      <h3 className='text-lg font-semibold'>{repo.name}</h3>
      {repo.description && <p className='mt-3 text-card-text'>{repo.description}</p>}
    </div>
    <div className='flex items-center mt-5 text-card-text'>
      {repo.license && (
        <span className='flex items-center gap-1 mr-3'>
          <img src={license} alt='License icon' /> {repo.license?.name.split(' ')[0]}
        </span>
      )}
      <span className='flex items-center gap-1 mr-3'>
        <img src={fork} alt='Fork icon' /> {repo.forks_count}
      </span>
      <span className='flex items-center gap-1'>
        <img src={star} alt='Star icon' /> {repo.stargazers_count}
      </span>
      <span className='ml-6 text-sm'>
        updated{' '}
        {Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24))}{' '}
        days ago
      </span>
    </div>
  </a>
);

export default RepositoryCard;
