import {
  Box,
  Flex,
  ResizeHandle,
} from '@tonic-ui/react';
import { useRef, useState } from 'react';

const App = () => {
  const [isResizing, setIsResizing] = useState(false);
  const dividerColor = 'gray.500';
  const highlightedDividerColor = 'gray.500';
  const containerRef = useRef();
  const resizableRef = useRef();

  return (
    <Flex
      ref={containerRef}
      sx={{
        boxShadow: 'down.low',
        cursor: isResizing ? 'col-resize' : 'default',
      }}
    >
      <Flex
        ref={resizableRef}
        flex="none"
        alignItems="center"
        justifyContent="center"
        width="40%"
        height={240}
      >
        Left
      </Flex>
      <Flex
        flex="auto"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <ResizeHandle
          onResizeStart={() => {
            setIsResizing(true);
          }}
          onResizeEnd={() => {
            setIsResizing(false);
          }}
          onResize={({ clientX }) => {
            const el = resizableRef.current;
            if (!el) {
              return;
            }

            const { left: parentLeft, width: parentWidth } = containerRef.current.getBoundingClientRect();
            const minWidth = Math.min(160, parentWidth * 0.2);
            const maxWidth = Math.max(parentWidth - 160, parentWidth * (1 - 0.2));
            const canDrag = (clientX - parentLeft >= minWidth) && (clientX - parentLeft <= maxWidth);
            if (canDrag) {
              const nextWidth = clientX - parentLeft;
              el.style.width = `${nextWidth}px`;
            }
          }}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            borderLeft: 1,
            borderLeftColor: isResizing ? highlightedDividerColor : dividerColor,
            opacity: 0.6,
            _hover: {
              opacity: 1,
              borderLeftColor: highlightedDividerColor,
            },
          }}
        />
        <Box>
          Right
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;
