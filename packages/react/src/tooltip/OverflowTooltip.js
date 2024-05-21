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
  const [isOverflow, setIsOverflow] = useState();
  const truncateStyle = useTruncateStyle();

  const detectOverflow = useCallback((el, sizeProperty) => {
    if (sizeProperty !== 'width' && sizeProperty !== 'height') {
      console.error(`Invalid size property: ${sizeProperty}. Use 'width' or 'height'.`);
      return false;
    }

    const originalSize = el.style[sizeProperty];
    const s1 = el.getClientRects()?.[0]?.[sizeProperty];
    el.style[sizeProperty] = 'max-content';
    const s2 = el.getClientRects()?.[0]?.[sizeProperty];
    el.style[sizeProperty] = originalSize; // Revert to original size

    if (sizeProperty === 'width') {
      return s1 < s2 || el.scrollWidth > el.clientWidth;
    }

    if (sizeProperty === 'height') {
      return s1 < s2 || el.scrollHeight > el.clientHeight;
    }

    return false;
  }, []);

  const eventTargetFn = useCallback(() => {
    return contentRef.current;
  }, []);

  const onMouseEnter = useCallback((event) => {
    const el = event.currentTarget;
    const isWidthOverflow = detectOverflow(el, 'width');
    const isHeightOverflow = detectOverflow(el, 'height');
    const isOverflowDetected = isWidthOverflow || isHeightOverflow;
    setIsOverflow(isOverflowDetected);
  }, [detectOverflow]);

  const onMouseLeave = useCallback((event) => {
    setIsOverflow(false);
  }, []);

  useEventListener(eventTargetFn, 'mouseenter', onMouseEnter);
  useEventListener(eventTargetFn, 'mouseleave', onMouseLeave);

  return (
    <Tooltip
      ref={ref}
      arrow={false}
      disabled={!isOverflow}
      nextToCursor={true}
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
