import React from 'react';

const renderComponentOrValue = (componentOrValue, props) => {
  if (typeof componentOrValue === 'function') {
    // If it's a React function component or React class component, render it with the provided props
    const Component = componentOrValue;
    return <Component {...props} />;
  }
  // Otherwise, return the value directly (it could be a primitive or other React element)
  return componentOrValue;
};

export {
  renderComponentOrValue,
};
