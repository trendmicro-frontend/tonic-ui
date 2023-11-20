import { Alert, Icon, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <Alert variant="solid" severity="success">
      This is a success alert.
    </Alert>
    <Alert variant="solid" severity="success" icon="success">
      This is a success alert.
    </Alert>
    <Alert variant="solid" severity="success" icon={<Icon icon="check-circle-o" />}>
      This is a success alert.
    </Alert>
    <Alert variant="solid" severity="success" icon={false}>
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success">
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success" icon="success">
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success" icon={<Icon icon="check-circle-o" />}>
      This is a success alert.
    </Alert>
    <Alert variant="outline" severity="success" icon={false}>
      This is a success alert.
    </Alert>
  </Stack>
);

export default App;
