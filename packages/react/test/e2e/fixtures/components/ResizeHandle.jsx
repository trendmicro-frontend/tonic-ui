import React, { useCallback, useRef, useState } from 'react';
import { Box, ResizeHandle } from '../../../../src';

const INITIAL_WIDTH = 240;
const MIN_WIDTH = 120;

// A real resizable panel: the public callbacks drive the measured box, so the
// browser geometry proves the drag delta reached the component. The panel is
// border-box sized with padding and a border, and the handle is a flex sibling
// anchored to its right edge, so a horizontal drag maps 1:1 onto the visible
// width and moves the handle with the edge.
const ResizeHandleFixture = ({ record }) => {
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const widthRef = useRef(INITIAL_WIDTH);
  const startRef = useRef({ clientX: 0, width: INITIAL_WIDTH });

  const setPanelWidth = useCallback((nextWidth) => {
    widthRef.current = nextWidth;
    setWidth(nextWidth);
  }, []);

  const handleResizeStart = useCallback(({ clientX, clientY }) => {
    record({ type: 'resizeStart', clientX, clientY });
    startRef.current = { clientX, width: widthRef.current };
  }, [record]);

  const handleResize = useCallback(({ clientX, clientY }) => {
    record({ type: 'resize', clientX, clientY });
    if (!Number.isFinite(clientX)) {
      return;
    }
    const delta = clientX - startRef.current.clientX;
    setPanelWidth(Math.max(MIN_WIDTH, startRef.current.width + delta));
  }, [record, setPanelWidth]);

  const handleResizeEnd = useCallback(({ clientX, clientY }) => {
    record({ type: 'resizeEnd', clientX, clientY });
  }, [record]);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'stretch', mt: '6x', height: 160 }}>
      <Box
        data-testid="resize-panel"
        sx={{ boxSizing: 'border-box', width, height: '100%', p: '4x', border: 1, overflow: 'hidden' }}
      >
        Resizable panel
      </Box>
      <ResizeHandle
        data-testid="resize-handle"
        sx={{ height: '100%' }}
        onResizeStart={handleResizeStart}
        onResize={handleResize}
        onResizeEnd={handleResizeEnd}
      />
    </Box>
  );
};

export default ResizeHandleFixture;
