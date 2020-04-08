import React, { createContext, useContext, forwardRef } from 'react';
import Box from '../Box';
import PseudoBox from '../PseudoBox';
import Icon from '../Icon';
import useAlertStyle from './styles';
import useTheme from '../useTheme';
import FlatButton from '../FlatButton';
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
      width="4x"
      height="4x"
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
  return (
    <FlatButton
      disabled={disabled}
      aria-disabled={disabled}
      ref={ref}
      as={as}
      type={type}
      variant="outline"
      variantColor="black:emphasis"
      size="sm"
      minWidth={76}
    >
      {children}
    </FlatButton>
  );
});

export { Alert, AlertIcon, AlertButton };
