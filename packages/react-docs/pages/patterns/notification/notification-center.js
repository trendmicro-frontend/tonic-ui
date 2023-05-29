import {
  ButtonBase,
  Divider,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React, { useEffect } from 'react';

const App = () => {
  return (
    <NavigationBar />
  );
};

const NavigationBar = () => {
  const [colorStyle] = useColorStyle();
  const styleProps = {
    backgroundColor: colorStyle.background.secondary,
    height: '12x',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <Flex
      {...styleProps}
    >
      <NavItem columnGap="2x">
        <Icon icon="clock" />
        <Text>{date.toLocaleDateString()}</Text>
        <Text>{date.toLocaleTimeString()}</Text>
      </NavItem>
      <NavItemDivider />
      <NavItem>
        <Icon icon="alert" />
      </NavItem>
    </Flex>
  );
};

const NavItem = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const hoverBackgroundColor = {
    dark: 'gray:70',
    light: 'gray:10',
  }[colorMode];
  const styleProps = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: colorStyle.background.secondary,
    height: '100%',
    px: '4x',
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
  };

  return (
    <ButtonBase
      {...styleProps}
      {...props}
    />
  );
};

const NavItemDivider = (props) => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'gray:100',
    light: 'gray:20',
  }[colorMode];
  const styleProps = {
    borderColor,
    height: '100%',
  };

  return (
    <Divider
      orientation="vertical"
      {...styleProps}
      {...props}
    />
  );
};

export default App;
