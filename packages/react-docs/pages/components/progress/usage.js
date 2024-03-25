import { Box, Button, ButtonGroup, Divider, Flex, LinearProgress, Text, TextLabel } from '@tonic-ui/react';
import { callAll } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useState } from 'react';

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const useSelection = (defaultValue) => {
  const [value, setValue] = React.useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [variant, changeVariantBy] = useSelection('indeterminate');
  const [size, changeSizeBy] = useSelection('sm');
  const [progress, setProgress] = useState(0);
  const resetProgress = useCallback(() => setProgress(0), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 5 + Math.round(Math.random() * 5);
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
              onClick={callAll(
                changeVariantBy(value),
                resetProgress,
              )}
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
            size
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
          {['xs', 'sm', 'md', 'lg'].map(value => (
            <Button
              key={value}
              selected={value === size}
              onClick={changeSizeBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider mb="4x" />
      <Flex alignItems="center" columnGap="3x" minHeight="5x">
        <Box width={320}>
          <LinearProgress
            variant={variant}
            size={size}
            value={variant === 'determinate' ? progress : undefined}
          />
        </Box>
        {variant === 'determinate' && (
          <TextLabel>
            {progress}%
          </TextLabel>
        )}
      </Flex>
    </>
  );
};

export default App;
