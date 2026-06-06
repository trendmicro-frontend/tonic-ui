import { Box, InputBase, Stack, Text, useSlot } from '@tonic-ui/react';
import { forwardRef } from 'react';

// A custom input component that uses useSlot to allow consumers to swap
// the underlying input element and pass custom props to it.
const CustomInput = forwardRef(function CustomInput({ slots = {}, slotProps = {}, ...rest }, ref) {
  const [InputSlot, inputSlotProps] = useSlot({
    name: 'input',
    ownerDisplayName: 'CustomInput',
    props: { ref },
    slot: slots.input ?? InputBase,
    slotProps: slotProps.input ?? {},
  });

  return (
    <Box border={1} borderColor="gray:60" borderRadius="sm" px="3x" py="2x" {...rest}>
      <InputSlot {...inputSlotProps} />
    </Box>
  );
});

// A read-only display element used as a custom slot element
const DisplayInput = forwardRef(function DisplayInput({ placeholder, style, ...rest }, ref) {
  return (
    <Box
      ref={ref}
      color="gray:40"
      fontStyle="italic"
      style={style}
      {...rest}
    >
      {placeholder}
    </Box>
  );
});

const App = () => {
  return (
    <Stack spacing="6x">
      <Box>
        <Text mb="2x" fontWeight="semibold">Default slot (InputBase)</Text>
        <CustomInput
          slotProps={{
            input: { placeholder: 'Default InputBase slot' },
          }}
        />
      </Box>
      <Box>
        <Text mb="2x" fontWeight="semibold">Custom slot element (DisplayInput)</Text>
        <CustomInput
          slots={{ input: DisplayInput }}
          slotProps={{
            input: { placeholder: 'Replaced with DisplayInput component' },
          }}
        />
      </Box>
      <Box>
        <Text mb="2x" fontWeight="semibold">slotProps forwarded (data-testid + style)</Text>
        <CustomInput
          slotProps={{
            input: {
              'data-testid': 'my-input',
              placeholder: 'Props forwarded via slotProps.input',
              style: { fontWeight: 'bold' },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default App;
