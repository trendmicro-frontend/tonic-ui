import { Button } from '@tonic-ui/react';

const App = () => (
  <Button
    sx={{
      backgroundColor: 'red.600',
      color: 'text.primary',
      '&:focus:not(:active)': {
        backgroundColor: 'red.600',
      },
      '&:hover': {
        backgroundColor: 'red.500',
      },
      '&:active': {
        backgroundColor: 'red.700',
      },
    }}
  >
    Emphasis Button
  </Button>
);

export default App;
