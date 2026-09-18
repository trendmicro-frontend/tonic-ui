import {
  Box,
  Checkbox,
  Divider,
  Dropdown,
  DropdownButton,
  Flex,
  Space,
  Text,
  TextLabel,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';

const items = [
  { id: 'new', label: 'New File' },
  { id: 'open', label: 'Open File' },
  { id: 'settings', label: 'Settings' },
];

// `MenuItem` sets no height of its own; it derives one from the theme:
// `lineHeight.sm` (1.25rem = 20px) plus `py: '2x'` (0.5rem = 8px) on both sides.
const menuItemHeight = 36;
const menuListPaddingY = 8; // `MenuList` uses `py: '2x'`

// The clipping container has to satisfy two opposing constraints, so derive the
// geometry from the item list rather than hardcoding it:
//   - `flip` needs the whole menu to fit above the toggle
//   - without `flip`, the menu has to overflow below the container
const menuHeight = (items.length * menuItemHeight) + (menuListPaddingY * 2);
const toggleHeight = 32;
const spaceBelow = (menuItemHeight * 2) - menuListPaddingY; // one full item and most of the next
const clipHeight = menuHeight + toggleHeight + spaceBelow + menuListPaddingY;

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const App = () => {
  const [isFlipModifierEnabled, toggleIsFlipModifierEnabled] = useToggle(true);

  return (
    <>
      <FormGroup>
        <TextLabel display="inline-flex" alignItems="center">
          <Checkbox
            checked={isFlipModifierEnabled}
            onChange={() => toggleIsFlipModifierEnabled()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">Enable flip modifier</Text>
        </TextLabel>
      </FormGroup>
      <Divider my="4x" />
      <Flex
        alignItems="flex-end"
        height={clipHeight}
        overflow="hidden"
        pb={`${spaceBelow}px`}
      >
        {/* The toggle sits near the bottom edge of a clipping container, so a
            `bottom` placement overflows and `flip` sends the content upward.
            Without `flip`, the content opens downward and is cut off. */}
        <Dropdown
          isOpen
          items={items}
          placement="bottom"
          renderToggle={({ renderItem, value }) => (
            <DropdownButton>
              {value ? renderItem(value) : 'Click Me'}
            </DropdownButton>
          )}
          slotProps={{
            content: {
              slotProps: {
                popper: {
                  modifiers: [
                    { // https://popper.js.org/docs/v2/modifiers/flip/
                      name: 'flip',
                      enabled: isFlipModifierEnabled,
                    },
                  ],
                },
              },
            },
          }}
        />
      </Flex>
    </>
  );
};

export default App;
