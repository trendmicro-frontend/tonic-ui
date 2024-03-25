import {
  Alert,
  AlertCloseButton,
  Badge,
  Box,
  Button,
  ButtonBase,
  Collapse,
  Divider,
  Flex,
  Text,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { AlertIcon, ClockIcon, Light2OIcon } from '@tonic-ui/react-icons';
import { useToggle } from '@tonic-ui/react-hooks';
import { createTransitionStyle, runIfFn } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useState } from 'react';

const alerts = [
  {
    variant: 'outline',
    severity: 'none',
    icon: (
      <Light2OIcon />
    ),
    sx: {
      borderImageSource: 'linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)',
      borderImageSlice: 1,
    },
    message: 'This is a promotion message.',
  },
  {
    variant: 'outline',
    severity: 'error',
    message: 'This is an error message.',
  },
  {
    variant: 'outline',
    severity: 'warning',
    message: 'This is a warning message.',
  },
  {
    variant: 'outline',
    severity: 'info',
    message: 'This is an info message.',
  },
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const styleProps = {
    backgroundColor: colorStyle.background.primary,
    height: 480,
  };

  return (
    <Box
      {...styleProps}
    >
      <NavigationBar />
      <Box p="4x">
        <Box mb="4x">
          <AlertView />
        </Box>
        <Text fontSize="xl" lineHeight="xl">
          Home
        </Text>
      </Box>
    </Box>
  );
};

const CollapseToggle = ({
  defaultIsOpen: defaultIsOpenProp = true,
  children,
}) => {
  const [isOpen, toggleIsOpen] = useToggle(defaultIsOpenProp);
  const onOpen = () => toggleIsOpen(true);
  const onClose = () => toggleIsOpen(false);

  return (
    <Collapse in={isOpen} unmountOnExit>
      {runIfFn(children, { isOpen, onOpen, onClose })}
    </Collapse>
  );
};

const IconButton = forwardRef((props, ref) => {
  const theme = useTheme();
  const size = '8x';
  const color = 'black:secondary';
  const disabledColor = 'black:disabled';
  const activeColor = 'black:primary';
  const focusBorderColor = 'blue:60';
  const focusColor = 'black:primary';
  const hoverColor = 'black:primary';
  const styleProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 1,
    borderColor: 'transparent',
    color,
    width: size,
    height: size,
    transition: createTransitionStyle(['border-color', 'box-shadow', 'color'], { duration: 200 }),
    _disabled: {
      color: disabledColor,
    },
    _focus: {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 1px ${theme.colors[focusBorderColor]}`,
        color: focusColor,
      },
    },
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
  };

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});
IconButton.displayName = 'IconButton';

const AlertOutlineActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    size="sm"
    variant="secondary"
    {...props}
  />
));
AlertOutlineActionButton.displayName = 'AlertOutlineActionButton';

const AlertView = () => {
  const [page, ] = useState(1);
  const alert = alerts[page - 1] ?? {};

  return (
    <CollapseToggle>
      {({ onClose }) => (
        <Alert
          variant={alert.variant}
          severity={alert.severity}
          icon={alert.icon}
          onClose={onClose}
          sx={alert.sx}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            columnGap="4x"
            mr="10x"
          >
            <Text>{alert.message}</Text>
            <Flex columnGap="4x">
              <AlertOutlineActionButton my="-1x">
                Action
              </AlertOutlineActionButton>
            </Flex>
          </Flex>
          <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
        </Alert>
      )}
    </CollapseToggle>
  );
};

const NavigationBar = (props) => {
  const [colorStyle] = useColorStyle();
  const styleProps = {
    backgroundColor: colorStyle.background.secondary,
    height: '12x',
    alignItems: 'center',
    justifyContent: 'space-between',
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
      {...props}
    >
      <Flex alignItems="center" ml="5x">
        <Text fontSize="2xl" lineHeight="2xl">
          Product Name
        </Text>
        <Divider orientation="vertical" height="5x" mx="2x" />
        <Text fontSize="sm" lineHeight="sm">
          Home
        </Text>
      </Flex>
      <Flex height="100%">
        <NavItem columnGap="2x">
          <ClockIcon />
          <Text>{date.toLocaleDateString()}</Text>
          <Text>{date.toLocaleTimeString()}</Text>
        </NavItem>
        <NavItemDivider />
        <NavItem as={Box}>
          <Badge badgeContent={null}>
            <AlertIcon />
          </Badge>
        </NavItem>
      </Flex>
    </Flex>
  );
};

const NavItem = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const styleProps = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: colorStyle.background.secondary,
    px: '4x',
    height: '100%',
    _hover: {
      backgroundColor: colorStyle.background.highlighted,
    },
    _selected: {
      backgroundColor: colorStyle.background.selected,
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
