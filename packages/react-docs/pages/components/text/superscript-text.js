import {
  Divider,
  Flex,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorStyle,
} from '@tonic-ui/react';
import React from 'react';

const SuperscriptText = ({ sx, ...rest }) => {
  const [colorStyle] = useColorStyle();
  return (
    <Text
      as="sup"
      sx={[
        {
          color: colorStyle.color.secondary,
          display: 'inline-block',
          fontSize: '.625rem',
          fontStyle: 'italic',
          fontWeight: 'normal',
          lineHeight: 0,
          position: 'relative',
          top: '-0.6em',
          verticalAlign: 'baseline',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
};

const Example1 = () => (
  <Flex
    alignItems="flex-start"
    height={125}
  >
    <Menu isOpen>
      <MenuList width="max-content">
        <Text fontWeight="semibold" px="3x">
          MENU GROUP
        </Text>
        <MenuDivider />
        <MenuItem>
          Menu Item
        </MenuItem>
        <MenuItem>
          <Text mr="1x">Menu Item</Text>
          <SuperscriptText>Preview</SuperscriptText>
        </MenuItem>
      </MenuList>
    </Menu>
  </Flex>
);

const Example2 = () => {
  const [colorStyle] = useColorStyle();
  return (
    <Flex
      backgroundColor={colorStyle.background.secondary}
      height="12x"
      alignItems="center"
      px="4x"
    >
      <Flex alignItems="center">
        <Text fontSize="xl" lineHeight="xl">
          Product Name
        </Text>
        <sup>TM</sup>
      </Flex>
      <Divider
        orientation="vertical"
        height="5x"
        mx="3x"
      />
      <Flex alignItems="center">
        <Text mr="1x">
          App Name
        </Text>
        <SuperscriptText>Preview</SuperscriptText>
      </Flex>
    </Flex>
  );
};

const Example3 = () => (
  <Flex>
    <Tabs>
      <TabList>
        <Tab>
          <Text mr="1x">Tab Label</Text>
          <SuperscriptText>Preview</SuperscriptText>
        </Tab>
        <Tab>
          <Text mr="1x">Tab Label</Text>
          <SuperscriptText>Preview</SuperscriptText>
        </Tab>
        <Tab>
          <Text>Tab Label</Text>
        </Tab>
      </TabList>
    </Tabs>
  </Flex>
);

const App = () => (
  <>
    <Example1 />
    <Divider my="4x" />
    <Example2 />
    <Divider my="4x" />
    <Example3 />
  </>
);

export default App;
