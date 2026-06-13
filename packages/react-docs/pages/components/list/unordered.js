import { List, ListItem } from '@tonic-ui/react';

const App = () => (
  <List>
    <ListItem>Item 1</ListItem>
    <ListItem>
      Item 2
      <List>
        <ListItem>Item 2.1</ListItem>
        <ListItem>Item 2.2</ListItem>
      </List>
    </ListItem>
    <ListItem>
      Item 3
      <List>
        <ListItem>Item 3.1</ListItem>
        <ListItem>
          Item 3.2
          <List>
            <ListItem>Item 3.2.1</ListItem>
            <ListItem>Item 3.2.2</ListItem>
          </List>
        </ListItem>
      </List>
    </ListItem>
  </List>
);

export default App;
