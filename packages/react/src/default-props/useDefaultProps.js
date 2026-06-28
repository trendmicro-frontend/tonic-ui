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
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid or missing component name provided to `useDefaultProps`');
  }
  const context = useContext(DefaultPropsContext);

  const defaultProps = {
    'data-tonic': name,
  };

  if (!context) {
    return resolveProps(defaultProps, props);
  }

  const theme = {
    components: context,
  };

  return resolveProps(defaultProps, getThemeProps({ props, name, theme }));
};

export default useDefaultProps;
