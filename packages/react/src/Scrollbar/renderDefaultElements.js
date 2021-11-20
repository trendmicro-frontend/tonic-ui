import React from 'react';
import Box from '../Box';

const renderViewDefault = (props) => {
  return (
    <Box
      css={{
        // Hide the browser scrollbar
        '::-webkit-scrollbar': { // Chrome, Safari and Opera
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      }}
      {...props}
    />
  );
};

const renderTrackHorizontalDefault = (props) => {
  return <Box {...props} />;
};

const renderTrackVerticalDefault = (props) => {
  return <Box {...props} />;
};

const renderThumbHorizontalDefault = (props) => {
  return <Box {...props} />;
};

const renderThumbVerticalDefault = (props) => {
  return <Box {...props} />;
};

export {
  renderViewDefault,
  renderTrackHorizontalDefault,
  renderTrackVerticalDefault,
  renderThumbHorizontalDefault,
  renderThumbVerticalDefault,
};
