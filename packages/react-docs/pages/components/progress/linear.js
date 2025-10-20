import { Box, Button, ButtonGroup, Divider, Flex, LinearProgress, Text, TextLabel } from '@tonic-ui/react';
import React, { useState } from 'react';

const heightOptions = [2, 4, 8, 12];
const defaultHeight = 4; 

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const min = 0, max = 100;
  const [variant, changeVariantBy] = useSelection('indeterminate');
  const [height, changeHeightBy] = useSelection(defaultHeight);
  const [progressValue, setProgressValue] = useState(min);

  return (
    <>
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          LinearProgress props
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            variant
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['indeterminate', 'determinate'].map(value => (
            <Button
              key={value}
              selected={value === variant}
              onClick={changeVariantBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            height
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {heightOptions.map(value => (
            <Button
              key={value}
              selected={value === height}
              onClick={changeHeightBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      {variant === 'determinate' && (
        <FormGroup>
          <Box mb="2x">
            <Flex alignItems="center" columnGap="2x">
              <TextLabel>
                value={progressValue}
              </TextLabel>
            </Flex>
          </Box>
          <Flex columnGap="4x" mb="2x">
            <Box
              as="input"
              type="range"
              name="progress"
              min={min}
              max={max}
              value={progressValue}
              onChange={(e) => setProgressValue(Number(e.target.value))}
              style={{ width: '320px' }}
            />
          </Flex>
        </FormGroup>
      )}
      <Divider mb="4x" />
      <Flex alignItems="center" columnGap="3x" minHeight="5x">
        <Box width={320}>
          <LinearProgress
            variant={variant}
            height={height}
            min={min}
            max={max}
            value={variant === 'determinate' ? progressValue : undefined}
          />
        </Box>
        {variant === 'determinate' && (
          <TextLabel>
            {progressValue}%
          </TextLabel>
        )}
      </Flex>
    </>
  );
};

export default App;
