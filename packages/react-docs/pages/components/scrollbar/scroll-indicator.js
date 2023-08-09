import {
  Box,
  Scrollbar,
  useColorMode,
} from '@tonic-ui/react';
import React, { useRef } from 'react';
import Lorem from '@/components/Lorem';

const ShadowScrollbar = (props) => {
  const [colorMode] = useColorMode();
  const topIndicatorRef = useRef(null);
  const bottomIndicatorRef = useRef(null);
  const handleUpdate = ({ values }) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const topIndicatorOpacity = 1 / 20 * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const bottomIndicatorOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    topIndicatorRef.current.style.opacity = topIndicatorOpacity;
    bottomIndicatorRef.current.style.opacity = bottomIndicatorOpacity;
  };
  const topScrollIndicatorBackground = {
    dark: 'linear-gradient(to bottom, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)', 
    light: 'linear-gradient(to bottom, rgba(224, 224, 224, 1) 0%, rgba(255, 255, 255, 0) 100%)', 
  }[colorMode];
  const bottomScrollIndicatorBackground = {
    dark: 'linear-gradient(to top, rgba(33, 33, 33, 1) 0%, rgba(255, 255, 255, 0) 100%)', 
    light: 'linear-gradient(to top, rgba(224, 224, 224, 1) 0%, rgba(255, 255, 255, 0) 100%)', 
  }[colorMode];

  return (
    <Box position="relative">
      <Scrollbar
        onUpdate={handleUpdate}
        {...props}
      />
      <Box
        ref={topIndicatorRef}
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="24px"
        background={topScrollIndicatorBackground}
      />
      <Box
        ref={bottomIndicatorRef}
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        height="24px"
        background={bottomScrollIndicatorBackground}
      />
    </Box>
  );
};

const App = () => {
  return (
    <ShadowScrollbar
      height={300}
    >
      <Lorem count={10} />
    </ShadowScrollbar>
  );
};

export default App;
