import {
  ButtonBase,
} from '@tonic-ui/react';

const App = () => {
  return (
    <ButtonBase
      disabled
      _disabled={{
        color: 'text.disabled',
      }}
    >
      Button is disabled
    </ButtonBase>
  );
};

export default App;
