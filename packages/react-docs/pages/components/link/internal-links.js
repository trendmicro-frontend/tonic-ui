import { Link } from '@tonic-ui/react';
import { SVGIcon } from '@tonic-ui/react-icons';

function InternalLinkIcon(props) {
  // arrow-right-small.svg
  return (
    <SVGIcon
      viewBox="0 0 20 20"
      width="5x"
      height="5x"
      {...props}
    >
      <path d="M10 13.3L12.19 11L6 11L6 10L12.19 10L10 7.7L10.667 7L14 10.5L10.667 14L10 13.3Z" />
    </SVGIcon>
  );
}

function InternalLink({ children, ...rest }) {
  return (
    <Link {...rest}>
      {children}
      <InternalLinkIcon />
    </Link>
  );
}

const App = () => (
  <InternalLink href={window.location.href}>
    Internal link
  </InternalLink>
);

export default App;
