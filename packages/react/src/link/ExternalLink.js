import { SVGIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import Link from './Link';

function ExternalLinkIcon(props) {
  // open-link-small.svg
  return (
    <SVGIcon
      viewBox="0 0 20 20"
      width="5x"
      height="5x"
      {...props}
    >
      <g transform="translate(5 5)">
        <path d="M10 5H9V9H1V1H5V0H1C0.5 0 0 0.5 0 1V9C0 9.5 0.5 10 1 10H9C9.5 10 10 9.5 10 9V5Z" />
        <path d="M10 0V4L8.35356 2.35356L4.35353 6.35359L3.64642 5.64648L7.64645 1.64645L6 0H10Z" />
      </g>
    </SVGIcon>
  );
}

/**
 * @typedef {import('./Link').LinkProps} ExternalLinkProps
 */

/**
 * @type {ForwardRefComponent<'a', ExternalLinkProps>}
 */
const ExternalLink = forwardRef((inProps, ref) => {
  const {
    children,
    rel = 'noopener noreferrer',
    target = '_blank',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ExternalLink' });

  return (
    <Link
      ref={ref}
      rel={rel}
      target={target}
      {...rest}
    >
      {children}
      <ExternalLinkIcon />
    </Link>
  );
});

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
