import React, { useCallback, useRef } from 'react';
import { Box, ColorModeProvider, useColorMode } from '../../../../src';

const CurrentMode = () => {
  const [mode] = useColorMode();
  return <Box as="output" data-testid="color-mode">{mode}</Box>;
};

const ColorModeFixture = ({ params, record }) => {
  const recordRef = useRef(record);
  recordRef.current = record;
  const onChange = useCallback(mode => recordRef.current({ type: 'color-mode', mode }), []);
  return (
    <ColorModeProvider defaultValue="light" useSystemColorMode onChange={onChange} value={params.has('controlled') ? 'light' : undefined}>
      <CurrentMode />
    </ColorModeProvider>
  );
};

export default ColorModeFixture;
