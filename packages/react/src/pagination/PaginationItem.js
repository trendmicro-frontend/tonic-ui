import {
  AngleLeftIcon,
  AngleRightIcon,
  CollapseLeftIcon,
  CollapseRightIcon,
  MoreHorizIcon,
} from '@tonic-ui/react-icons';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Button } from '../button';
import { useDefaultProps } from '../default-props';
import {
  usePaginationItemStyle,
} from './styles';

const defaultSlot = {
  'start-ellipsis': <MoreHorizIcon size="4x" />,
  'end-ellipsis': <MoreHorizIcon size="4x" />,
  first: <CollapseLeftIcon size="4x" />,
  previous: <AngleLeftIcon size="4x" />,
  next: <AngleRightIcon size="4x" />,
  last: <CollapseRightIcon size="4x" />,
};

const getAriaLabel = ({ type, page, selected }) => {
  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
    return `Go to page ${page}`;
  }
  if (type === 'page' && !selected) {
    return `Go to page ${page}`;
  }
  if (type === 'page' && selected) {
    return `Page ${page}`;
  }
  return `Go to ${type} page`;
};

/**
 * @typedef {Object} PaginationItemProps
 * @property {boolean} [disabled=false] - If `true`, the component is disabled.
 * @property {number} [page] - The current page number.
 * @property {boolean} [selected=false] - If `true`, the pagination item is selected.
 * @property {{ 'start-ellipsis'?: React.ReactNode, 'end-ellipsis'?: React.ReactNode, first?: React.ReactNode, previous?: React.ReactNode, next?: React.ReactNode, last?: React.ReactNode }} [slot] - Custom content for different pagination item types.
 * @property {'page' | 'first' | 'last' | 'previous' | 'next' | 'start-ellipsis' | 'end-ellipsis'} [type='page'] - The type of the pagination item.
 * @property {string} [variant='ghost'] - The variant to use.
 */

/**
 * @type {ForwardRefComponent<'button', PaginationItemProps>}
 */
const PaginationItem = forwardRef((inProps, ref) => {
  const {
    'aria-label': ariaLabel,
    disabled = false,
    type = 'page',
    page,
    selected = false,
    slot: slotProp,
    variant = 'ghost',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'PaginationItem' });
  const slot = {
    ...defaultSlot,
    ...slotProp,
  };
  const styleProps = usePaginationItemStyle({ type });

  return (
    <Button
      ref={ref}
      aria-current={ariaAttr(selected)}
      aria-label={ariaLabel ?? getAriaLabel({ type, page, selected })}
      disabled={disabled}
      selected={selected}
      variant={variant}
      {...styleProps}
      {...rest}
    >
      {type === 'page' ? page : slot?.[type]}
    </Button>
  );
});

PaginationItem.displayName = 'PaginationItem';

export default PaginationItem;
