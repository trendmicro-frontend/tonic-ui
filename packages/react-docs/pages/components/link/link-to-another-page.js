import { Link, Space } from '@tonic-ui/react';
import { ExternalLinkIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';

const ExternalLink = forwardRef((props, ref) => (
  <Link
    ref={ref}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
));
ExternalLink.displayName = 'ExternalLink';

const App = () => (
  <ExternalLink href="https://github.com/trendmicro-frontend/tonic-ui">
    Open link in new window
    <Space width="2x" />
    <ExternalLinkIcon />
  </ExternalLink>
);

export default App;
