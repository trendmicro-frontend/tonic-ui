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
import { useState } from 'react';

const sizeOptions = [16, 32, 48, 64, 80];
const thicknessOptions = [2, 4, 8, 12];
const defaultSize = 48;
const defaultThickness = 4;

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
  const [size, changeSizeBy] = useSelection(defaultSize);
  const [thickness, changeThicknessBy] = useSelection(defaultThickness);
  const [scale, setScale] = useState(1);
  const [progressValue, setProgressValue] = useState(min);

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
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Advanced adjustments
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            Scaling the circular progress
          </TextLabel>
        </Box>
        <Flex columnGap="4x" mb="2x">
          <input
            type="range"
            name="scale"
            aria-label="scale"
            min={0.5}
            max={4}
            step={0.1}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </Flex>
        <Box as="ul" pl="6x">
          <Text as="li" display="list-item">
            Current scale: {scale}x
          </Text>
          <Text as="li" display="list-item">
            Current dimension: {Math.floor(scale * size)}px (W) x {Math.floor(scale * size)}px (H)
          </Text>
        </Box>
      </FormGroup>
      <Divider mb="4x" />
      <Box mb="2x">
        <CircularProgress
          variant={variant}
          size={size}
          thickness={thickness}
          min={min}
          max={max}
          value={variant === 'determinate' ? progressValue : undefined}
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
            {progressValue}%
          </TextLabel>
        </Box>
      )}
    </>
  );
};

export default App;
