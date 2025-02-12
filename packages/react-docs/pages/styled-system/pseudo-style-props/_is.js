import { Box } from '@tonic-ui/react';
import React from 'react';

const List = (props) => <Box as="ul" {...props} />;

const ListItem = (props) => (
  <Box
    as="li"
    _is={{
      ':first-of-type, :last-of-type': {
        color: 'red:50',
      },
    }}
    {...props}
  />
);

const App = () => (
  <List>
    <ListItem>First</ListItem>
    <ListItem>Second</ListItem>
    <ListItem>Third</ListItem>
  </List>
);

export default App;
