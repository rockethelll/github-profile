import { Repository } from '../types/github';
import { RepositoryList } from './RepositoryList';

interface RepositorySectionProps {
  selectedUser: string | null;
  repos: Repository[];
  isLoadingRepos: boolean;
}

const RepositorySection = ({ selectedUser, repos, isLoadingRepos }: RepositorySectionProps) => {
  if (!selectedUser) return null;

  return (
    <div className='mt-80'>
      <RepositoryList repos={repos} isLoading={isLoadingRepos} />
    </div>
  );
};

export default RepositorySection;
