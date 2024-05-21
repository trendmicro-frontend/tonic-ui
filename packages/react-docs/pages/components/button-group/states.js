import { Box, Button, ButtonGroup, Divider, Flex, Icon, TextLabel, useColorMode } from '@tonic-ui/react';
import { ChartBarIcon, ChartLineIcon, ChartPieIcon, ChartTableIcon } from '@tonic-ui/react-icons';
import React, { Fragment, useState } from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const emphasisDividerColor = {
    dark: 'red:80',
    light: 'red:80',
  }[colorMode];
  const primaryDividerColor = {
    dark: 'blue:80',
    light: 'blue:80',
  }[colorMode];
  const defaultDividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];
  const ghostDividerColor = {
    dark: 'gray:60',
    light: 'gray:20',
  }[colorMode];

  const icons = [
    ['chart-pie', ChartPieIcon],
    ['chart-line', ChartLineIcon],
    ['chart-table', ChartTableIcon],
    ['chart-bar', ChartBarIcon],
  ];
  const lastIconIndex = icons.length - 1;
  const [activeButton1, setActiveButton1] = useState('chart-pie');
  const [activeButton2, setActiveButton2] = useState('chart-pie');
  const [activeButton3, setActiveButton3] = useState('chart-pie');
  const [activeButton4, setActiveButton4] = useState('chart-pie');
  const [activeButton5, setActiveButton5] = useState('chart-pie');
  const [activeButton6, setActiveButton6] = useState('chart-pie');

  const handleClick1 = (button) => (e) => {
    setActiveButton1(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };
  const handleClick2 = (button) => (e) => {
    setActiveButton2(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };
  const handleClick3 = (button) => (e) => {
    setActiveButton3(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };
  const handleClick4 = (button) => (e) => {
    setActiveButton4(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };
  const handleClick5 = (button) => (e) => {
    setActiveButton5(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };
  const handleClick6 = (button) => (e) => {
    setActiveButton6(button);
    // Remove focus when the button is clicked
    e.currentTarget.blur();
  };

  return (
    <Flex direction="column" rowGap="4x">
      <Box>
        <Box mb="2x">
          <TextLabel>
            Emphasis
          </TextLabel>
        </Box>
        <ButtonGroup variant="emphasis">
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton1 === key}
                onClick={handleClick1(key)}
                width="8x"
              >
                <Icon as={icon} />
              </Button>
              {(index !== lastIconIndex) && (
                <Divider orientation="vertical" color={emphasisDividerColor} />
              )}
            </Fragment>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Box mb="2x">
          <TextLabel>
            Primary
          </TextLabel>
        </Box>
        <ButtonGroup variant="primary">
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton2 === key}
                onClick={handleClick2(key)}
                width="8x"
              >
                <Icon as={icon} />
              </Button>
              {(index !== lastIconIndex) && (
                <Divider orientation="vertical" color={primaryDividerColor} />
              )}
            </Fragment>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Box mb="2x">
          <TextLabel>
            Default
          </TextLabel>
        </Box>
        <ButtonGroup variant="default">
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton3 === key}
                onClick={handleClick3(key)}
                width="8x"
              >
                <Icon as={icon} />
              </Button>
              {(index !== lastIconIndex) && (
                <Divider orientation="vertical" color={defaultDividerColor} />
              )}
            </Fragment>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Box mb="2x">
          <TextLabel>
            Secondary
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
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton4 === key}
                onClick={handleClick4(key)}
                width="8x"
              >
                <Icon as={icon} />
              </Button>
            </Fragment>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Box mb="2x">
          <TextLabel>
            Ghost
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="ghost"
        >
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton5 === key}
                onClick={handleClick5(key)}
                width="8x"
              >
                <Icon as={icon} />
              </Button>
              {(index !== lastIconIndex) && (
                <Divider orientation="vertical" color={ghostDividerColor} />
              )}
            </Fragment>
          ))}
        </ButtonGroup>
      </Box>
      <Box>
        <Box mb="2x">
          <TextLabel>
            Ghost (w/o ButtonGroup)
          </TextLabel>
        </Box>
        <Flex>
          {icons.map(([key, icon], index) => (
            <Fragment key={key}>
              <Button
                disabled={index === lastIconIndex}
                selected={activeButton6 === key}
                onClick={handleClick6(key)}
                variant="ghost"
                width="8x"
              >
                <Icon as={icon} />
              </Button>
            </Fragment>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default App;
