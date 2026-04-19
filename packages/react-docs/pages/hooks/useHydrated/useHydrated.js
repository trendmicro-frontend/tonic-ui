import { useHydrated } from '@tonic-ui/react-hooks';
const App = () => {
  const isHydrated = useHydrated();

  return (
    <>
      {isHydrated ? 'Hydrated' : 'Not hydrated'}
    </>
  );
};

export default App;
