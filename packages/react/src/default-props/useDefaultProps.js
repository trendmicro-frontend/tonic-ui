import { useContext } from 'react';
import { DefaultPropsContext } from './context';
import resolveProps from './resolveProps';

const getThemeProps = ({ props, name, theme }) => {
  const config = theme?.components?.[name];

  if (config === undefined) {
    return props;
  }

  if (config?.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }

  if (!(config?.styleOverrides) && !(config?.variants)) {
    // no property 'defaultProps'
    return resolveProps(config, props);
  }

  return props;
};

const useDefaultProps = ({ props, name }) => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  if (!name || typeof name !== 'string') {
    throw new Error('Invalid or missing component name provided to `useDefaultProps`');
  }
  const context = useContext(DefaultPropsContext);
  if (!context) {
    return props;
  }

  const theme = {
    components: context,
  };

  return getThemeProps({ props, name, theme });
};

export default useDefaultProps;
