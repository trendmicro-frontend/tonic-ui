import React, { forwardRef } from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import {
  usePaginationItemStyle,
} from './styles';

const defaultSlot = {
  'start-ellipsis': <Icon icon="more-horiz" />,
  'end-ellipsis': <Icon icon="more-horiz" />,
  first: <Icon icon="collapse-left" />,
  previous: <Icon icon="angle-left" />,
  next: <Icon icon="angle-right" />,
  last: <Icon icon="collapse-right" />,
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

const PaginationItem = forwardRef((
  {
    'aria-label': ariaLabel,
    disabled = false,
    type = 'page',
    page,
    selected = false,
    slot: slotProp,
    variant = 'ghost',
    ...rest
  },
  ref,
) => {
  const slot = {
    ...defaultSlot,
    ...slotProp,
  };
  const styleProps = usePaginationItemStyle();

  return (
    <Button
      ref={ref}
      aria-current={selected ? 'true' : undefined}
      aria-disabled={disabled}
      aria-label={ariaLabel ?? getAriaLabel({ type, page, selected })}
      disabled={disabled}
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
