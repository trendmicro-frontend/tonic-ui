import { ThemeContext } from '@emotion/core';
import React from 'react';

const withTheme = (WrappedComponent) => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const WithTheme = React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {theme => (
        <WrappedComponent ref={ref} theme={theme} {...props} />
      )}
    </ThemeContext.Consumer>
  ));

  WithTheme.displayName = `WithTheme(${componentName})`;

  return WithTheme;
};

export default withTheme;
