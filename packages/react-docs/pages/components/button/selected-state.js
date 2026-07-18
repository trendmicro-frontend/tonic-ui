import {
  Button,
} from '@tonic-ui/react';

const App = () => {
  const selectedBackgroundColor = '_foreground.tertiary.selected';
  const selectedColor = 'text._inverse.accent';

  return (
    <Button
      selected
      // Customize the visual appearance of the selected state
      _selected={{
        backgroundColor: selectedBackgroundColor,
        color: selectedColor,
        pointerEvents: 'none',
      }}
    >
      Custom Button
    </Button>
  );
};

export default App;
