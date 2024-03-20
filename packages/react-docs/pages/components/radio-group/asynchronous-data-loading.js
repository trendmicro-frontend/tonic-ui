import { Box, Flex, LinkButton, Radio, RadioGroup, Space, Stack } from '@tonic-ui/react';
import { RedoIcon } from '@tonic-ui/react-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [state, setState] = useState({
    state: 'idle',
    value: null,
  });
  const timerRef = useRef(null);
  const fetchData = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      state: 'loading',
      value: null,
    }));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      setState({
        state: 'success',
        value: '1',
      });

      timerRef.current = null;
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (<>
    <Box mb="4x">
      <LinkButton onClick={() => fetchData()}>
        <Flex alignItems="center">
          <RedoIcon
            spin={true}
            animationPlayState={state.state === 'loading' ? 'running' : 'paused'} />
          <Space width="2x" />
          Reload
        </Flex>
      </LinkButton>
    </Box>
    <RadioGroup
      value={state.value}
      disabled={state.state === 'loading'}
      onChange={nextValue => {
        setState(prevState => ({ ...prevState, value: nextValue }));
      }}
    >
      <Stack spacing="1x" shouldWrapChildren>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </Stack>
    </RadioGroup>
  </>);
};

export default App;
