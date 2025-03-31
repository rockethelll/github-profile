import BackGroundPattern from './components/BackgroundPattern';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <main className='min-h-screen bg-background text-foreground relative flex flex-col items-center'>
      <BackGroundPattern />
      <SearchBar />
    </main>
  );
}

export default App;
