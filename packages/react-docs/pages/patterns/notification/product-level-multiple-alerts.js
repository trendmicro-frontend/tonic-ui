import {
  Alert,
  AlertCloseButton,
  Button,
  ButtonBase,
  Collapse,
  Flex,
  Icon,
  Text,
  useTheme,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import { createTransitionStyle, runIfFn } from '@tonic-ui/utils';
import React, { forwardRef, useState } from 'react';

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

const AlertPagination = forwardRef((
  {
    page,
    count,
    onPrevious,
    onNext,
    ...rest
  },
  ref,
) => (
  <Flex alignItems="center" columnGap="2x" {...rest}>
    <IconButton
      disabled={page <= 1}
      onClick={onPrevious}
    >
      <Icon icon="angle-up" />
    </IconButton>
    <Text color="black:primary">
      {page}/{count}
    </Text>
    <IconButton
      disabled={page >= count}
      onClick={onNext}
    >
      <Icon icon="angle-down" />
    </IconButton>
  </Flex>
));
AlertPagination.displayName = 'AlertPagination';

const AlertSolidActionButton = forwardRef((props, ref) => (
  <Button
    ref={ref}
    size="sm"
    variant="secondary"
    sx={{
      borderColor: 'black:primary',
      color: 'black:primary',
      ':active': {
        color: 'black:primary',
      },
      ':focus': {
        color: 'black:primary',
      },
      ':hover': {
        background: 'rgba(0, 0, 0, 0.12)',
        color: 'black:primary',
      },
      ':hover:not(:focus)': {
        boxShadow: 'none',
      },
    }}
    {...props}
  />
));
AlertSolidActionButton.displayName = 'AlertSolidActionButton';

const alerts = [
  {
    variant: 'solid',
    severity: 'none',
    icon: (
      <Icon icon="light2-o" />
    ),
    sx: {
      background: 'linear-gradient(90deg, var(--tonic-colors-purple-60) 0%, var(--tonic-colors-blue-50) 100%)',
      color: 'white:emphasis',
    },
    message: 'This is a promotion message.',
  },
  {
    variant: 'solid',
    severity: 'error',
    message: 'This is an error message.',
  },
  {
    variant: 'solid',
    severity: 'warning',
    message: 'This is a warning message.',
  },
  {
    variant: 'solid',
    severity: 'info',
    message: 'This is an info message.',
  },
];

const App = () => {
  const [page, setPage] = useState(1);
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
              <AlertSolidActionButton my="-1x">
                Action
              </AlertSolidActionButton>
              <AlertPagination
                page={page}
                count={alerts.length}
                onPrevious={() => setPage(Math.max(1, page - 1))}
                onNext={() => setPage(Math.min(alerts.length, page + 1))}
                my="-2x"
              />
            </Flex>
          </Flex>
          <AlertCloseButton top={3} right={7} position="absolute" data-test="alert-close-button" />
        </Alert>
      )}
    </CollapseToggle>
  );
};

export default App;
