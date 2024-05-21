import { Flex, useColorStyle } from '@tonic-ui/react';
import { createSVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

const CircleIcon = createSVGIcon(
  <path d="M15 8c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-3.866 3.134-7 7-7v0c3.866 0 7 3.134 7 7v0z" />,
  'CircleIcon',
);

// or with custom SVG
const PlusIcon = createSVGIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M15 9h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z" />,
  </svg>,
  'PlusIcon',
);

const App = () => {
  const [colorStyle] = useColorStyle();
  return (
    <Flex alignItems="center" columnGap="4x">
      <CircleIcon color={colorStyle.color.secondary} />
      <PlusIcon color={colorStyle.color.secondary} />
    </Flex>
  );
};

export default App;
