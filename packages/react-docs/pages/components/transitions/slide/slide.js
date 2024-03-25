import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Slide,
  Space,
  Switch,
  Text,
  TextLabel,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';
import SkeletonContent from '@/components/SkeletonContent';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [isOpen, onToggle] = useToggle(false);
  const [direction, changeDirectionBy] = useSelection('up');

  return (
    <Flex direction="column" rowGap="4x">
      <TextLabel display="inline-flex" alignItems="center">
        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />
        <Space width="2x" />
        <Text>Show</Text>
      </TextLabel>
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        {['up', 'down', 'left', 'right'].map(value => {
          const changeDirection = changeDirectionBy(value);
          const onClick = () => {
            changeDirection();
            onToggle(false);
          };

          return (
            <Button
              key={value}
              selected={value === direction}
              onClick={onClick}
              minWidth="15x"
            >
              {value}
            </Button>
          );
        })}
      </ButtonGroup>
      <Box overflow="hidden">
        <Slide
          in={isOpen}
          direction={direction}
          unmountOnExit={false}
        >
          <SkeletonContent>
            <SkeletonBlock />
          </SkeletonContent>
        </Slide>
      </Box>
    </Flex>
  );
};

export default App;
