import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Space,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  TextLabel,
  useTabs,
} from '@tonic-ui/react';
import { ChevronRightIcon, HomeIcon, SettingsIcon, WorkspaceIcon } from '@tonic-ui/react-icons';
import { useState } from 'react';

const CustomTabList = (props) => {
  const context = useTabs();
  const orientation = context.orientation;

  let styleProps = {
    position: 'relative',
  };

  if (orientation === 'horizontal') {
    styleProps = {
      ...styleProps,
      __after: {
        content: '""',
        borderBottom: 1,
        borderBottomColor: 'border.tertiary',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      },
    };
  }

  if (orientation === 'vertical') {
    styleProps = {
      ...styleProps,
      alignItems: 'flex-start',
    };
  }

  return (
    <TabList
      {...styleProps}
      {...props}
    />
  );
};

const CustomTab = ({ children, ...rest }) => {
  const context = useTabs();
  const orientation = context.orientation;
  const baseStyle = {
    color: 'text.secondary',
    px: '4x',
    py: '3x',
    position: 'relative',
    zIndex: 1,
    _disabled: {
      color: 'text.disabled',
      cursor: 'not-allowed',
    },
    _hover: {
      color: 'text.accent',
    },
  };

  if (orientation === 'horizontal') {
    const styleProps = {
      ...baseStyle,
      border: 1,
      borderColor: 'border.tertiary',
      _notLastOfType: {
        borderRight: 'none',
      },
      _selected: {
        borderBottomColor: 'transparent',
        color: 'text.accent',
        '::before': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: 0,
          height: 3,
          backgroundColor: 'success.icon',
        },
      },
    };

    return (
      <Tab
        {...styleProps}
        {...rest}
      >
        {children}
      </Tab>
    );
  }

  if (orientation === 'vertical') {
    const styleProps = {
      ...baseStyle,
      borderBottom: 1,
      borderBottomColor: 'border.tertiary',
      textAlign: 'left',
      width: '100%',
      _selected: {
        color: 'text.accent',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 3,
          backgroundColor: 'success.icon',
        },
      },
    };

    return (
      <Tab
        {...styleProps}
        {...rest}
      >
        {({ getTabProps, index, isSelected }) => (
          <Box
            {...getTabProps()}
            pr="1x"
          >
            <Flex justifyContent="space-between">
              <Box>{children}</Box>
              <ChevronRightIcon ml="4x" visibility={isSelected ? 'visible' : 'hidden'} />
            </Flex>
          </Box>
        )}
      </Tab>
    );
  }

  return null;
};

const App = () => {
  const [orientation, setOrientation] = useState('horizontal');

  return (
    <>
      <Box mb="2x">
        <TextLabel>
          orientation
        </TextLabel>
      </Box>
      <ButtonGroup>
        <Button
          onClick={() => setOrientation('horizontal')}
          variant={orientation === 'horizontal' ? 'primary' : 'secondary'}
        >
          Horizontal
        </Button>
        <Button
          onClick={() => setOrientation('vertical')}
          variant={orientation === 'vertical' ? 'primary' : 'secondary'}
        >
          Vertical
        </Button>
      </ButtonGroup>
      <Divider my="4x" />
      <Tabs
        orientation={orientation}
        variant="unstyled"
      >
        <CustomTabList>
          <CustomTab>
            <HomeIcon />
            <Space width="2x" />
            HOME
          </CustomTab>
          <CustomTab>
            <WorkspaceIcon />
            <Space width="2x" />
            WORKSPACE
          </CustomTab>
          <CustomTab>
            <SettingsIcon />
            <Space width="2x" />
            SETTINGS
          </CustomTab>
        </CustomTabList>
        <TabPanels px="4x" py="3x">
          <TabPanel>
            <Text color="text.secondary" fontSize="4rem" lineHeight="1">
              1
            </Text>
          </TabPanel>
          <TabPanel>
            <Text color="text.secondary" fontSize="4rem" lineHeight="1">
              2
            </Text>
          </TabPanel>
          <TabPanel>
            <Text color="text.secondary" fontSize="4rem" lineHeight="1">
              3
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default App;
