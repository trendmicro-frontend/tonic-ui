import { Flex, Link } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

function InternalLinkIcon(props) {
  return (
    <SVGIcon
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 11.3L10.19 9L4 9L4 8L10.19 8L8 5.7L8.667 5L12 8.5L8.667 12L8 11.3Z" />
    </SVGIcon>
  );
}

function InternalLink({ children, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      <InternalLinkIcon viewBox="-2 -2 20 20" width="5x" height="5x" />
    </Link>
  );
}

const App = () => (
  <InternalLink href="https://github.com/trendmicro-frontend/tonic-ui">
    Internal link
  </InternalLink>
);

export default App;
