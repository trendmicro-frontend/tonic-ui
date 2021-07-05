import React from 'react';
import Box from '../Box';
import PseudoBox from '../PseudoBox';

const renderViewDefault = (props) => {
  return <Box {...props} />;
};

const renderTrackHorizontalDefault = (props) => {
  return <Box {...props} />;
};

const renderTrackVerticalDefault = (props) => {
  return <Box {...props} />;
};

const renderThumbHorizontalDefault = (props) => {
  return <PseudoBox {...props} />;
};

const renderThumbVerticalDefault = (props) => {
  return <PseudoBox {...props} />;
};

export {
  renderViewDefault,
  renderTrackHorizontalDefault,
  renderTrackVerticalDefault,
  renderThumbHorizontalDefault,
  renderThumbVerticalDefault,
};
