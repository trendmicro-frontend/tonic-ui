import { SVGIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import Link from './Link';

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

/**
 * @typedef {import('./Link').LinkProps} InternalLinkProps
 */

/**
 * @type {ForwardRefComponent<'a', InternalLinkProps>}
 */
const InternalLink = forwardRef((inProps, ref) => {
  const {
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InternalLink' });

  return (
    <Link
      ref={ref}
      {...rest}
    >
      {children}
      <InternalLinkIcon />
    </Link>
  );
});

InternalLink.displayName = 'InternalLink';

export default InternalLink;
