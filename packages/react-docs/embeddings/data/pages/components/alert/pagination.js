import { Alert, ButtonBase, Flex, Icon, Text } from '@tonic-ui/react';
import React, { useState } from 'react';

const alerts = [
  { variant: 'solid', severity: 'success', icon: 'success', message: 'This is a success alert' },
  { variant: 'solid', severity: 'info', icon: 'info', message: 'This is an info alert' },
  { variant: 'solid', severity: 'warning', icon: 'warning-minor', message: 'This is a warning alert' },
  { variant: 'solid', severity: 'error', icon: 'error', message: 'This is an error alert' },
];
const pageMin = alerts.length > 0 ? 1 : 0;
const pageMax = alerts.length > 0 ? alerts.length : 0;

const IconButton = (props) => (
  <ButtonBase
    color="black:secondary"
    _disabled={{
      color: 'black:disabled',
    }}
    _hover={{
      color: 'black:primary',
    }}
    {...props}
  />
);

const App = () => {
  const [page, setPage] = useState(pageMin);
  const alert = alerts[page - 1] || {};

  return (
    <Alert
      variant={alert.variant}
      severity={alert.severity}
      icon={alert.icon}
      isClosable
    >
      <Flex justifyContent="space-between">
        <Text>{alert.message}</Text>
        <Flex columnGap="2x" alignItems="center">
          <IconButton
            disabled={page <= pageMin}
            onClick={() => setPage(Math.max(pageMin, page - 1))}
          >
            <Icon icon="chevron-up" />
          </IconButton>
          <Text>{page}/{pageMax}</Text>
          <IconButton
            disabled={page >= pageMax}
            onClick={() => setPage(Math.min(pageMax, page + 1))}
          >
            <Icon icon="chevron-down" />
          </IconButton>
        </Flex>
      </Flex>
    </Alert>
  );
};

export default App;
