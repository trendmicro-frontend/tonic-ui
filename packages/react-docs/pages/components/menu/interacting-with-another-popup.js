import {
  ButtonBase,
  Flex,
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
import { InfoOIcon } from '@tonic-ui/react-icons';
import { useRef } from 'react';

const App = () => {
  const popupRef = useRef(null);

  return (
    <Menu
      onInteractOutside={(event) => {
        if (popupRef.current?.contains(event.target)) {
          event.preventDefault();
        }
      }}
    >
      <MenuButton>Actions</MenuButton>
      <MenuList width="max-content" whiteSpace="nowrap">
        <MenuItem>Stop</MenuItem>
        <Flex role="none" alignItems="center">
          <MenuItem disabled flex="auto" width="auto">Delete</MenuItem>
          <Popover placement="right-start" portalled>
            <PopoverTrigger>
              <ButtonBase
                role="menuitem"
                tabIndex={-1}
                aria-label="Why is Delete unavailable?"
                color="text.secondary"
                flex="none"
                p="2x"
                mr="1x"
              >
                <InfoOIcon size="4x" />
              </ButtonBase>
            </PopoverTrigger>
            <PopoverContent
              ref={popupRef}
              width={220}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <PopoverBody>
                <Text>
                  This workflow is still active. Stop the workflow, then try deleting it again.
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default App;
