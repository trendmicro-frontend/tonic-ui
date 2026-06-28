import {
  Button,
} from '@tonic-ui/react';

const App = () => {
  const disabledBackgroundColor = '_foreground.secondary.disabled';
  const disabledColor = 'text.disabled';

  return (
    <Button
      disabled
      // Customize the visual appearance of the selected state
      _disabled={{
        backgroundColor: disabledBackgroundColor,
        color: disabledColor,
        cursor: 'not-allowed',
      }}
    >
      Custom Button
    </Button>
  );
};

export default App;
