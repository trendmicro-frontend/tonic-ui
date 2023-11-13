import { useEventListener } from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { Truncate } from '../truncate';
import { useTruncateStyle } from '../truncate/styles';
import Tooltip from './Tooltip';

const hasEllipsis = (el) => {
  const isNoWrap = el.style.whiteSpace === 'nowrap' || window.getComputedStyle(el).whiteSpace === 'nowrap';
  if (isNoWrap) {
    let scrollWidth = el.scrollWidth;
    const oldWidth = el.style.width;
    el.style.width = "max-content"; // set width to max-content to get the actual width of the element
    const [clientRect] = el.getClientRects();
    if (clientRect?.width > scrollWidth) {
      scrollWidth = clientRect?.width;
    }
    el.style.width = oldWidth;
    return scrollWidth > el.clientWidth;
  }

  return el.scrollHeight > el.clientHeight;
};

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
    setIsOverflown(hasEllipsis(el));
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
