import React, { createContext, useContext } from 'react';
import Box from '../Box';
import Icon from '../Icon';
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

const AlertButton = props => {
  return <Box as="button" {...props}>{props.children}</Box>;
};

export { Alert, AlertIcon, AlertButton };
