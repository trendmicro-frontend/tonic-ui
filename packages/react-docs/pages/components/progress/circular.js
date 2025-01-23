import { Box, Button, ButtonGroup, Divider, Flex, CircularProgress, Text, TextLabel } from '@tonic-ui/react';
import { callAll } from '@tonic-ui/utils';
import React, { useCallback, useEffect, useState } from 'react';

const sizeOptions = [16, 32, 48, 64, 80];
const thicknessOptions = [2, 4, 8, 12];
const defaultSize = 48;
const defaultThickness = 4;

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
  const [size, changeSizeBy] = useSelection(defaultSize);
  const [thickness, changeThicknessBy] = useSelection(defaultThickness);
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
          CircularProgress props
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
          {sizeOptions.map(value => (
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
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            thickness
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
          {thicknessOptions.map(value => (
            <Button
              key={value}
              selected={value === thickness}
              onClick={changeThicknessBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider mb="4x" />
      <Flex
        display="inline-flex"
        flexDirection="column"
        alignItems="center"
        rowGap="3x"
        minHeight="5x"
      >
        <Box>
          <CircularProgress
            variant={variant}
            size={size}
            thickness={thickness}
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
