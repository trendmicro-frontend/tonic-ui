import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Scrollbar,
  Space,
  Text,
  TextLabel,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [isFlipModifierEnabled, toggleIsFlipModifierEnabled] = useToggle(true);

  return (
    <>
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Modifiers
        </Text>
      </Box>
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
        width={180}
        overflowY="visible"
        border={1}
        borderColor={colorStyle.divider}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height={300}
        >
          <Popover isOpen placement="top">
            <PopoverTrigger>
              <Text display="inline-block">
                Reference
              </Text>
            </PopoverTrigger>
            <PopoverContent
              PopperProps={{
                modifiers: [
                  { // https://popper.js.org/docs/v2/modifiers/flip/
                    name: 'flip',
                    enabled: isFlipModifierEnabled,
                  },
                ],
              }}
            >
              Popover
            </PopoverContent>
          </Popover>
        </Flex>
      </Scrollbar>
    </>
  );
};

export default App;
