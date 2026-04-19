import { Box, Divider, Flex, Radio, RadioGroup, Text, TextLabel, useColorMode, useColorStyle } from '@tonic-ui/react';
import { useClickOutside } from '@tonic-ui/react-hooks';
import { useCallback, useRef, useState } from 'react';
import PreformattedText from '@/components/PreformattedText';
import x from '@/utils/json-stringify';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const [eventOption, setEventOption] = useState('pointerDown');
  const ref = useRef();
  const handler = useCallback(() => {
    console.log('Clicked outside');
  }, []);
  const events = {
    'pointerDown': ['mousedown', 'touchstart'],
    'pointerUp': ['mouseup', 'touchend'],
    'none': [],
  }[eventOption];

  useClickOutside(ref, handler, { events });

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
      <PreformattedText>
        {`useClickOutside(ref, handler, { events: ${x(events) });`}
      </PreformattedText>
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
        Click outside me and a message will be logged to the console.
      </Box>
    </>
  );
};

export default App;
