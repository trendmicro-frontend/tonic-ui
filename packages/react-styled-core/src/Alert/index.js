import React, { createContext, useContext, forwardRef } from 'react';
import Box from '../Box';
import PseudoBox from '../PseudoBox';
import Icon from '../Icon';
import useAlertStyle from './styles';
import useTheme from '../useTheme';
import { addOpacity } from '../theme/colors-utils';

const statuses = {
  info: {
    icon: 'info',
    color: 'blue'
  },
  warning: {
    icon: 'warning-triangle',
    color: 'yellow'
  },
  error: {
    icon: 'circle-close',
    color: 'red'
  },
};

const AlertContext = createContext();
const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      'useAlertContext must be used within a AlertContextProvider',
    );
  }
  return context;
};

const Alert = ({ status = 'info', ...rest }) => {
  const alertStyleProps = useAlertStyle({
    status,
    color: statuses[status] && statuses[status].color,
  });

  const context = { status };
  return (
    <AlertContext.Provider value={context}>
      <Box role="alert" {...alertStyleProps} {...rest} />
    </AlertContext.Provider>
  );
};

const AlertIcon = props => {
  const { status } = useAlertContext();
  const iconName = statuses[status] && statuses[status].icon;
  return (
    <Icon
      mr="2x"
      size="4x"
      name={`_core.${iconName}`}
      {...props}
    />
  );
};

const AlertButton = forwardRef((
  {
    disabled,
    children,
    as = 'button',
    type = 'button',
    ...rest
  },
  ref,
) => {
  const theme = useTheme();
  const activeBorderColor = theme.colors['blue:60'];
  const baseStyleProps = {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 250ms',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    border: 1,
    outline: 0,
    bg: 'transparent',
    borderColor: 'black:emphasis',
    borderRadius: 'sm',
    color: 'black:emphasis',
    cursor: 'pointer',
    height: 24,
    pl: '3x',
    pr: '3x',
    _hover: {
      zIndex: 1,
      bg: addOpacity('black', 0.12),
    },
    _active: {
      bg: addOpacity('black', 0.12),
    },
    _focus: {
      zIndex: 1,
      borderColor: 'blue:60',
      color: 'black:emphasis',
      boxShadow: `inset 0 0 0 1px ${activeBorderColor}`,
    },
  };

  return (
    <PseudoBox
      disabled={disabled}
      aria-disabled={disabled}
      ref={ref}
      as={as}
      type={type}
      {...baseStyleProps}
      {...rest}
    >
      {children}
    </PseudoBox>
  );
});

export { Alert, AlertIcon, AlertButton };
