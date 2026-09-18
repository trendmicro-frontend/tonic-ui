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
        border={1}
        borderColor="border.primary"
        height={200}
        justifyContent="center"
        overflow="hidden"
        pb="8x"
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
