import React from 'react';
import { Flex } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';

function CircleIcon(props) {
  return (
    <SVGIcon viewBox="0 0 16 16" {...props}>
      <path d="M15 8c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3.866 3.134-7 7-7v0c3.866 0 7 3.134 7 7v0z" />,
    </SVGIcon>
  );
}

const App = () => {
  return (
    <Flex alignItems="center" columnGap="6x">
      <CircleIcon size="1x" color="blue:10" />
      <CircleIcon size="2x" color="blue:20" />
      <CircleIcon size="3x" color="blue:30" />
      <CircleIcon size="4x" color="blue:40" />
      <CircleIcon size="5x" color="blue:50" />
      <CircleIcon size="6x" color="blue:60" />
      <CircleIcon size="7x" color="blue:70" />
      <CircleIcon size="8x" color="blue:80" />
      <CircleIcon size="9x" color="blue:90" />
      <CircleIcon size="10x" color="blue:100" />
    </Flex>
  );
};

export default App;
