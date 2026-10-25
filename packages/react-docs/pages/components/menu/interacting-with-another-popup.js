import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@tonic-ui/react';
import { useRef, useState } from 'react';

const App = () => {
  const popupRef = useRef(null);
  const [layout, setLayout] = useState('comfortable');

  return (
    <>
      <Text mb="3x">Layout: {layout}</Text>
      <Menu
        closeOnSelect={false}
        onInteractOutside={(event) => {
          if (popupRef.current?.contains(event.target)) {
            event.preventDefault();
          }
        }}
      >
        <MenuButton>Display options</MenuButton>
        <MenuList>
          <Popover placement="right-start" portalled>
            <PopoverTrigger>
              <MenuItem>Choose layout</MenuItem>
            </PopoverTrigger>
            <PopoverContent ref={popupRef}>
              <PopoverBody>
                <Button onClick={() => setLayout('compact')}>
                  Use compact layout
                </Button>
                <Button onClick={() => setLayout('comfortable')}>
                  Use comfortable layout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </MenuList>
      </Menu>
    </>
  );
};

export default App;
