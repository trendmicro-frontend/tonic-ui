import { useEventListener } from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Truncate } from '../truncate';
import { useTruncateStyle } from '../truncate/styles';
import Tooltip from './Tooltip';

const OverflowTooltip = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const contentRef = useRef();
  const [isOverflown, setIsOverflown] = useState();
  const truncateStyle = useTruncateStyle();
  const onMouseEnter = useCallback((event) => {
    const el = event.currentTarget;
    setIsOverflown((el.scrollHeight > el.clientHeight) || (el.scrollWidth > el.clientWidth));
  }, []);
  const onMouseLeave = useCallback((event) => {
    setIsOverflown(false);
  }, []);

  useEventListener(() => contentRef.current, 'mouseenter', onMouseEnter);
  useEventListener(() => contentRef.current, 'mouseleave', onMouseLeave);

  return (
    <Tooltip
      ref={ref}
      disabled={!isOverflown}
      {...rest}
    >
      {(typeof children === 'function') ? (
        children({ ref: contentRef, style: truncateStyle })
      ) : (
        <Truncate ref={contentRef}>{children}</Truncate>
      )}
    </Tooltip>
  );
});

OverflowTooltip.displayName = 'OverflowTooltip';

export default OverflowTooltip;
