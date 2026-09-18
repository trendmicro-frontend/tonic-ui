import {
  Box,
  Checkbox,
  Divider,
  Dropdown,
  DropdownButton,
  Scrollbar,
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
      <Scrollbar
        height={180}
        width={240}
        overflowY="visible"
        border={1}
        borderColor="border.primary"
      >
        {/* The toggle sits at the top of the scroll viewport, so a `top`
            placement has nowhere to go and `flip` sends it below. */}
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          height={300}
        >
          <Dropdown
            isOpen
            items={items}
            placement="top"
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
        </Box>
      </Scrollbar>
    </>
  );
};

export default App;
