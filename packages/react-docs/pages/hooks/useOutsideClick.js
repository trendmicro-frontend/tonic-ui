import { Box, Divider, Flex, Radio, RadioGroup, Text, TextLabel, useColorMode, useColorStyle } from '@tonic-ui/react';
import { useOutsideClick } from '@tonic-ui/react-hooks';
import React, { useCallback, useRef, useState } from 'react';

const CodeBlock = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  return (
    <Box
      backgroundColor={colorStyle.background.secondary}
      border={1}
      borderColor={colorStyle.divider}
      fontFamily="mono"
      py="3x"
      px="3x"
      whiteSpace="pre"
      {...props}
    />
  );
};

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const pointerDownEvents = ['mousedown', 'touchstart'];
const pointerUpEvents = ['mouseup', 'touchend'];

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [eventOption, setEventOption] = useState('pointerDown');
  const ref = useRef();
  const handler = useCallback(() => {
    console.log('Clicked outside');
  }, []);
  const events = {
    'pointerDown': pointerDownEvents,
    'pointerUp': pointerUpEvents,
  }[eventOption];

  useOutsideClick(ref, handler, events || false);

  return (
    <>
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Setup
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            Choose an option:
          </TextLabel>
        </Box>
        <RadioGroup
          value={eventOption}
          onChange={setEventOption}
        >
          <Flex direction="column" rowGap="2x">
            <Radio value="pointerDown">
              Listen to pointer down events (default)
            </Radio>
            <Radio value="pointerUp">
              Listen to pointer up events
            </Radio>
            <Radio value="none">
              No event listeners
            </Radio>
          </Flex>
        </RadioGroup>
      </FormGroup>
      {eventOption === 'pointerDown' && (
        <CodeBlock>
          {`useOutsideClick(ref, handler, [${pointerDownEvents.map(x => `'${x}'`).join(', ')}]); // or "useOutsideClick(ref, handler)"`}
        </CodeBlock>
      )}
      {eventOption === 'pointerUp' && (
        <CodeBlock>
          {`useOutsideClick(ref, handler, [${pointerUpEvents.map(x => `'${x}'`).join(', ')}]);`}
        </CodeBlock>
      )}
      {eventOption === 'none' && (
        <CodeBlock>
          {'useOutsideClick(ref, handler, false);'}
        </CodeBlock>
      )}
      <Divider my="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Demo
        </Text>
      </Box>
      <Box
        ref={ref}
        backgroundColor={colorStyle.background.secondary}
        cursor="default"
        userSelect="none"
        p="6x"
      >
        Click outside me a message will be logged to the console
      </Box>
    </>
  );
};

export default App;
