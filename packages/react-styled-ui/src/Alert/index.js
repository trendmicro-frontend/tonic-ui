import React, { createContext, useContext } from 'react';
import AlertButton from '../ActionButton';
import Box from '../Box';
import CloseButton from '../CloseButton';
import Icon from '../Icon';
import LightMode from '../LightMode';
import useAlertStyle from './styles';

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

const AlertCloseButton = props => {
  return (
    <LightMode>
      <CloseButton {...props} />
    </LightMode>
  );
};

export { Alert, AlertIcon, AlertButton, AlertCloseButton };
