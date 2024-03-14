import { Flex, useColorStyle } from '@tonic-ui/react';
import { createSVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

const HomeIcon = createSVGIcon(
  <path d="M15.753 8.341l-1.753-2.003v-5.339h-2v3.053l-3.247-3.711c-0.184-0.21-0.453-0.341-0.753-0.341s-0.568 0.132-0.752 0.34l-0.001 0.001-7 8c-0.154 0.175-0.247 0.406-0.247 0.659 0 0.552 0.448 1 1 1h0.924v6h4.076v-5h4v5h4v-6h1c0.552 0 1-0.448 1-1 0-0.253-0.094-0.484-0.248-0.66l0.001 0.001z" />,
  'HomeIcon',
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
      <HomeIcon color={colorStyle.color.secondary} />
      <PlusIcon color={colorStyle.color.secondary} />
    </Flex>
  );
};

export default App;
