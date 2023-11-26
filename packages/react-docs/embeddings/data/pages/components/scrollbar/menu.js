import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';

const App = () => {
  return (
    <Menu>
      <MenuButton>Select an option</MenuButton>
      <MenuList width="100%">
        <Scrollbar height={200}>
          <MenuItem>List item 1</MenuItem>
          <MenuItem>List item 2</MenuItem>
          <MenuItem>List item 3</MenuItem>
          <MenuItem>List item 4</MenuItem>
          <MenuItem>List item 5</MenuItem>
          <MenuItem>List item 6</MenuItem>
          <MenuItem>List item 7</MenuItem>
          <MenuItem>List item 8</MenuItem>
          <MenuItem>List item 9</MenuItem>
          <MenuItem>List item 10</MenuItem>
          <MenuItem>List item 11</MenuItem>
          <MenuItem>List item 12</MenuItem>
        </Scrollbar>
      </MenuList>
    </Menu>
  );
};

export default App;
