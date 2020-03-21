import React, { createContext, useContext } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import useAlertStyle from './styles';

const statuses = {
  info: { icon: 'info', color: 'blue:40' },
  warning: { icon: 'warning-triangle', color: 'yellow:50' },
  error: { icon: 'circle-close', color: 'red:40' },
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
    color: statuses[status] && statuses[status].color,
  });

  const context = { status };
  return (
    <AlertContext.Provider value={context}>
      <Box role="alert" {...alertStyleProps} {...rest} />
    </AlertContext.Provider>
  );
};

const AlertTitle = props => (
  <Box fontWeight="bold" lineHeight="normal" {...props} />
);
const AlertDescription = props => <Box {...props} />;

const AlertIcon = props => {
  const { status } = useAlertContext();
  const iconName = statuses[status] && statuses[status].icon;
  return (
    <Icon
      mr={8}
      size={16}
      name={`_core.${iconName}`}
      {...props}
    />
  );
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
