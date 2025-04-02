type UserStatsProps = {
  label: string;
  value: number | string;
};

const UserStats = ({ label, value }: UserStatsProps) => {
  return (
    <div className='flex'>
      <div className='flex items-center gap-5 px-5 py-4 rounded-xl bg-gradient-1 h-[52px]'>
        <p>{label}</p>
        <span className='w-[1px] bg-separator h-9'></span>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default UserStats;
