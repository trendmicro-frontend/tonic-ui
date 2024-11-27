import { Box, Divider, Flex, Radio, RadioGroup, Text, TextLabel, useColorMode, useColorStyle } from '@tonic-ui/react';
import { useOutsideClick } from '@tonic-ui/react-hooks';
import React, { useCallback, useRef, useState } from 'react';
import PreformattedText from '@/components/PreformattedText';

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
        <PreformattedText>
          {`useOutsideClick(ref, handler, [${pointerDownEvents.map(x => `'${x}'`).join(', ')}]); // or "useOutsideClick(ref, handler)"`}
        </PreformattedText>
      )}
      {eventOption === 'pointerUp' && (
        <PreformattedText>
          {`useOutsideClick(ref, handler, [${pointerUpEvents.map(x => `'${x}'`).join(', ')}]);`}
        </PreformattedText>
      )}
      {eventOption === 'none' && (
        <PreformattedText>
          {'useOutsideClick(ref, handler, false);'}
        </PreformattedText>
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
