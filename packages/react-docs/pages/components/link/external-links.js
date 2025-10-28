import { Link } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import React from 'react';

function ExternalLinkIcon(props) {
  return (
    <SVGIcon
      viewBox="0 0 20 20"
      width="5x"
      height="5x"
      {...props}
    >
      <path d="M15 10H14V14H6V6H10V5H6C5.5 5 5 5.5 5 6V14C5 14.5 5.5 15 6 15H14C14.5 15 15 14.5 15 14V10Z" />
      <path d="M15 5V9L13.3536 7.35356L9.35353 11.3536L8.64642 10.6465L12.6465 6.64645L11 5H15Z" />
    </SVGIcon>
  );
}

function ExternalLink({ children, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      <ExternalLinkIcon />
    </Link>
  );
}

const App = () => (
  <ExternalLink href="https://github.com/trendmicro-frontend/tonic-ui">
    External link
  </ExternalLink>
);

export default App;
