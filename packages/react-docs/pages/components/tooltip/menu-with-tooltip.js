import {
  Input,
  InputGroup,
  InputGroupPrepend,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React, { useCallback, useRef, useState } from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const inputRef = useRef();
  const [menuItem, setMenuItem] = useState('hostname');
  const handleMenuClick = useCallback((event) => {
    // [optional] persist `Synthetic Event` for React v16 and earlier versions
    event.persist();

    const { value } = event.target.attributes.value;
    setMenuItem(value);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, []);
  const buttonText = {
    'hostname': 'Search by: Endpoint name',
    'filename': 'Search by: File name',
  }[menuItem];

  return (
    <InputGroup>
      <InputGroupPrepend>
        <Menu>
          <MenuButton mr="4x">
            <Text
              color={colorMode === 'dark' ? 'white:secondary' : 'black:secondary'}
            >
              {buttonText}
            </Text>
          </MenuButton>
          <MenuList
            onClick={handleMenuClick}
          >
            <MenuItem value="hostname">Endpoint name</MenuItem>
            <MenuItem value="filename">File name</MenuItem>
          </MenuList>
        </Menu>
      </InputGroupPrepend>
      <Tooltip
        label="Use commas to separate multiple keywords"
        backgroundColor={colorStyle.background.secondary}
        color={colorStyle.color.primary}
        px="2x"
        py="3x"
      >
        <Input
          ref={inputRef}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          placeholder={{
            'hostname': 'John Doe, Jane',
            'filename': 'README.md, *.cmd',
          }[menuItem]}
        />
      </Tooltip>
    </InputGroup>
  );
};

export default App;
