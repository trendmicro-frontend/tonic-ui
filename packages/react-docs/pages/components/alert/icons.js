import { Alert, Stack } from '@tonic-ui/react';
import { CheckCircleOIcon } from '@tonic-ui/react-icons';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert variant="solid" severity="success">
      This is a success alert.
    </Alert>
    <Alert variant="solid" severity="success" icon={<CheckCircleOIcon size="4x" />}>
      This is a success alert.
    </Alert>
    <Alert variant="solid" severity="success" icon={false}>
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success">
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success" icon={<CheckCircleOIcon size="4x" />}>
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success" icon={false}>
      This is a success alert.
    </Alert>
  </Stack>
);

export default App;
