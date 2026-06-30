import { Box, Button, ButtonGroup, Divider, Flex, Icon, TextLabel, useColorMode } from '@tonic-ui/react';
import { ChartBarIcon, ChartLineIcon, ChartPieIcon, ChartTableIcon } from '@tonic-ui/react-icons';
import { Fragment, useState } from 'react';

const App = () => {
  const [colorMode] = useColorMode();
  const defaultDividerColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  const icons = [
    ['chart-pie', ChartPieIcon],
    ['chart-line', ChartLineIcon],
    ['chart-table', ChartTableIcon],
    ['chart-bar', ChartBarIcon],
  ];
  const lastIconIndex = icons.length - 1;
  const [activeButton3, setActiveButton3] = useState('chart-pie');
  const [activeButton4, setActiveButton4] = useState('chart-pie');

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

  return (
    <Flex direction="column" rowGap="4x">
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
    </Flex>
  );
};

export default App;
