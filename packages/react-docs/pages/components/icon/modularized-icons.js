import React from 'react';
import {
  Stack,
  AddSVGIcon,
  DesktopUpdateSVGIcon
} from '@tonic-ui/react';

const App = () => {
  return (
    <Stack direction="row" spacing="4x" alignItems="center">
      <AddSVGIcon size="12x" color="teal:40" />
      <DesktopUpdateSVGIcon size="12x" color="teal:40" />
    </Stack>
  );
};

export default App;
