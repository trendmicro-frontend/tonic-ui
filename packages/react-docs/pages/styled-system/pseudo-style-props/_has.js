import { Box } from '@tonic-ui/react';
const List = (props) => <Box as="ul" {...props} />;

const ListItem = (props) => (
  <Box
    as="li"
    _has={{
      '+ li': {
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
