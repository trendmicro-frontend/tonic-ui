import { Highlight } from '@tonic-ui/react';

const App = () => (
  <Highlight
    variant="none"
    query="highlight"
    slotProps={{
      mark: {
        sx: {
          color: 'white:primary',
          backgroundColor: 'blue:60',
          fontWeight: 'semibold',
          px: '1x',
        },
      },
    }}
  >
    The word highlight in this text will be rendered with a different style.
  </Highlight>
);

export default App;
