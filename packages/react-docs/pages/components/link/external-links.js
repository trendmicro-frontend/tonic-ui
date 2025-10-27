import { Flex, Link } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

function ExternalLinkIcon(props) {
  return (
    <SVGIcon
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M13 9H12V13H4V5H8V4H4C3.5 4 3 4.5 3 5V13C3 13.5 3.5 14 4 14H12C12.5 14 13 13.5 13 13V9Z" />
      <path d="M13 4V8L11.3536 6.35356L7.35353 10.3536L6.64642 9.64648L10.6465 5.64645L9 4H13Z" />
    </SVGIcon>
  );
}

function ExternalLink({ children, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      <ExternalLinkIcon viewBox="0 0 16 20" width="5x" height="5x" />
    </Link>
  );
}

const App = () => (
  <ExternalLink href="https://github.com/trendmicro-frontend/tonic-ui">
    External link
  </ExternalLink>
);

export default App;
