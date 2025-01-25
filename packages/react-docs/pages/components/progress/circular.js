import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Flex,
  Text,
  TextLabel,
} from '@tonic-ui/react';
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
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const resetProgress = useCallback(() => setProgress(0), []);

  useEffect(() => {
    let waitForAnimationEnd = false;
    const timer = setInterval(() => {
      if (waitForAnimationEnd) {
        return;
      }
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          waitForAnimationEnd = true;
          setTimeout(() => {
            waitForAnimationEnd = false;
          }, 250);
          return 0;
        }
        const diff = 1 + Math.round(Math.random() * 1);
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

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
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Advanced adjustments
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            Scale control
          </TextLabel>
        </Box>
        <Flex columnGap="4x" mb="2x">
          <input
            type="range"
            name="scale"
            min={0.5}
            max={4}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
          <Text>{scale}x</Text>
        </Flex>
      </FormGroup>
      <Divider mb="4x" />
      <Box mb="4x">
        <Text>width: {Math.floor(scale * size)}px</Text>
        <Text>height: {Math.floor(scale * size)}px</Text>
      </Box>
      <Box mb="2x">
        <CircularProgress
          variant={variant}
          size={size}
          thickness={thickness}
          value={variant === 'determinate' ? progress : undefined}
          width={Math.floor(size * scale)}
          height={Math.floor(size * scale)}
        />
      </Box>
      {variant === 'determinate' && (
        <Box
          textAlign="center"
          width={Math.floor(size * scale)}
        >
          <TextLabel>
            {progress}%
          </TextLabel>
        </Box>
      )}
    </>
  );
};

export default App;
