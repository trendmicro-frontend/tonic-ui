import { Stack, SVGIcon } from '@tonic-ui/react';
import React from 'react';

const CustomIcon = ({ size, ...rest }) => {
  const viewBox = '0 0 16 16';
  return (
    <SVGIcon size={size} viewBox={viewBox} {...rest}>
      <path d="M15 8c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3.866 3.134-7 7-7v0c3.866 0 7 3.134 7 7v0z" />
    </SVGIcon>
  );
};

const App = () => (
  <Stack direction="row" spacing="3x" alignItems="center">
    <CustomIcon size="1x" color="blue:10" />
    <CustomIcon size="2x" color="blue:20" />
    <CustomIcon size="3x" color="blue:30" />
    <CustomIcon size="4x" color="blue:40" />
    <CustomIcon size="5x" color="blue:50" />
    <CustomIcon size="6x" color="blue:60" />
    <CustomIcon size="7x" color="blue:70" />
    <CustomIcon size="8x" color="blue:80" />
    <CustomIcon size="9x" color="blue:90" />
    <CustomIcon size="10x" color="blue:100" />
  </Stack>
);

export default App;
