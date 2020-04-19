import useColorMode from '../useColorMode';

const baseProps = {
  px: '4x',
  py: '2x',
};

const getSuccessStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'green:50',
    light: 'green:50',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getInfoStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'blue:40',
    light: 'blue:40',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getWarningStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getErrorStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'red:40',
    light: 'red:40',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getSeverityProps = ({ severity, ...props }) => {
  if (severity === 'success') {
    return getSuccessStyle(props);
  }

  if (severity === 'info') {
    return getInfoStyle(props);
  }

  if (severity === 'warning') {
    return getWarningStyle(props);
  }

  if (severity === 'error') {
    return getErrorStyle(props);
  }

  return {};
};

const useAlertRootStyle = ({
  severity,
}) => {
  const { colorMode } = useColorMode();
  const _props = {
    colorMode,
    severity,
  };
  const severityProps = getSeverityProps(_props);

  return {
    ...baseProps,
    ...severityProps,
  };
};

const useAlertIconStyle = ({
  severity,
}) => {
  return {
    py: '1x',
    lineHeight: 1, // exactly the same height as the icon's height
  };
};

const useAlertMessageStyle = () => {
  return {
    py: 2,
    mt: -1,
    width: '100%',
  };
};

const useAlertCloseButtonStyle = () => {
  return {
    border: 2,
    borderColor: 'transparent',
    color: 'black',
    lineHeight: 1,
    width: '8x',
    height: '8x',
    mt: -4,
    mb: -4,
    mr: -8,
    px: 0,
    py: 0,
    opacity: 0.54,
    _hover: {
      opacity: 1,
    },
    _active: {
      opacity: 0.54,
    },
    _focus: {
      border: 2,
      borderColor: 'blue:60',
      opacity: 1,
    },
  };
};

export {
  useAlertRootStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
};
