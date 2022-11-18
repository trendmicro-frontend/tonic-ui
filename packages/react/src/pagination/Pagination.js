import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import React, { Fragment, forwardRef } from 'react';
import { Box } from '../box';
import { usePaginationStyle } from './styles';
import PaginationItem from './PaginationItem';
import usePagination from './usePagination';

const Pagination = forwardRef((
  {
    firstButton: firstButtonProp, // removed
    lastButton: lastButtonProp, // removed
    prevButton: prevButtonProp, // removed
    nextButton: nextButtonProp, // removed
    ellipsisLabel: ellipsisLabelProp, // removed
    boundaryCount = 1,
    count = 1,
    defaultPage = 1,
    disabled,
    onChange,
    page,
    renderItem = (item) => <PaginationItem {...item} />,
    siblingCount = 1,
    slot,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Pagination.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('firstButton', {
        prefix,
        alternative: [`slot={{ first: ${!!firstButtonProp} }}`, 'renderItem'],
      });
    }, (firstButtonProp !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('lastButton', {
        prefix,
        alternative: [`slot={{ last: ${!!lastButtonProp} }}`, 'renderItem'],
      });
    }, (lastButtonProp !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('prevButton', {
        prefix,
        alternative: [`slot={{ previous: ${!!prevButtonProp} }}`, 'renderItem'],
      });
    }, (prevButtonProp !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('nextButton', {
        prefix,
        alternative: [`slot={{ next: ${!!nextButtonProp} }}`, 'renderItem'],
      });
    }, (nextButtonProp !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('ellipsisLabel', {
        prefix,
        alternative: ['renderItem'],
      });
    }, (ellipsisLabelProp !== undefined));

    if (firstButtonProp !== undefined) {
      slot = {
        ...slot,
        first: !!firstButtonProp,
      };
    }
    if (lastButtonProp !== undefined) {
      slot = {
        ...slot,
        last: !!lastButtonProp,
      };
    }
    if (prevButtonProp !== undefined) {
      slot = {
        ...slot,
        previous: !!prevButtonProp,
      };
    }
    if (nextButtonProp !== undefined) {
      slot = {
        ...slot,
        next: !!nextButtonProp,
      };
    }
  }

  const { items } = usePagination({
    boundaryCount,
    componentName: Pagination.displayName,
    count,
    defaultPage,
    disabled,
    onChange,
    page,
    siblingCount,
    slot,
  });
  const styleProps = usePaginationStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {items.map((item, index) => (
        <Fragment key={`${item.type}-${item.page}`}>
          {renderItem({ ...item })}
        </Fragment>
      ))}
    </Box>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
