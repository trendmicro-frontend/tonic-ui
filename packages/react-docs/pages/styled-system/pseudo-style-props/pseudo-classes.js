import { ButtonBase } from '@tonic-ui/react';

const App = () => (
  <ButtonBase
    _hover={{ // same as ':hover'
      color: 'blue:50',
    }}
  >
    Hover Me
  </ButtonBase>
);

export default App;
