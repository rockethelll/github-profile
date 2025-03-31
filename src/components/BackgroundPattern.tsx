import backgroundPattern from '../assets/DreamShaper.webp';

const BackGroundPattern = () => {
  return (
    <img
      src={backgroundPattern}
      className='w-full h-[240px] object-cover object-top absolute top-0'
      alt='Background Pattern'
    />
  );
};

export default BackGroundPattern;
