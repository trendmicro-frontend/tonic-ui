/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Space,
  Stack,
  Text,
  TextLabel,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React, { useState } from 'react';

const Item = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const boxShadow = colorStyle.shadow.thin;
  const borderColor = colorMode === 'dark' ? 'gray:70' : 'gray:20';
  return (
    <Flex
      boxShadow={boxShadow}
      border={1}
      borderColor={borderColor}
      alignItems="center"
      justifyContent="center"
      p="2x"
      {...props}
    />
  );
};

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const Note = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return (
    <Text color={colorStyle.color.tertiary} {...props} />
  );
};

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const App = () => {
  const [direction, changeDirectionBy] = useSelection('column');
  const [flexWrap, changeFlexWrapBy] = useSelection('nowrap');
  const [gap, toggleGap] = useToggle(false);
  const [shouldWrapChildren, toggleShouldWrapChildren] = useToggle(false);

  return (
    <>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            direction
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
          {['column', 'column-reverse', 'row', 'row-reverse'].map(value => (
            <Button
              key={value}
              selected={value === direction}
              onClick={changeDirectionBy(value)}
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
            flexWrap
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
          {['nowrap', 'wrap', 'wrap-reverse'].map(value => (
            <Button
              key={value}
              selected={value === flexWrap}
              onClick={changeFlexWrapBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <TextLabel>
          <Flex alignItems="center">
            <Checkbox
              checked={gap}
              onChange={() => toggleGap()}
            />
            <Space width="2x" />
            <Text fontFamily="mono" whiteSpace="nowrap">
              gap="4x"
            </Text>
          </Flex>
        </TextLabel>
        <Note pl="6x" pt="1x">
          Set 'direction="row"' and 'flexWrap="wrap"' to see the gap between rows.
        </Note>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={shouldWrapChildren}
            onChange={() => toggleShouldWrapChildren()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">
            shouldWrapChildren
          </Text>
        </TextLabel>
      </FormGroup>
      <Divider mb="4x" />
      <Stack
        direction={direction}
        flexWrap={flexWrap}
        shouldWrapChildren={shouldWrapChildren}
        gap={gap ? '4x' : undefined}
        spacing="4x"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Item key={index} width={150}>
            Stack Item {index + 1}
          </Item>
        ))}
      </Stack>
    </>
  );
};

export default App;
