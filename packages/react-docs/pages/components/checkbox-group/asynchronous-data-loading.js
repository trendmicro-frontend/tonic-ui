import { Box, Checkbox, CheckboxGroup, Flex, LinkButton, Space, Stack } from '@tonic-ui/react';
import { RedoIcon } from '@tonic-ui/react-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [state, setState] = useState({
    state: 'idle',
    fruits: [],
  });
  const timerRef = useRef(null);
  const fetchData = useCallback(() => {
    setState(prevState => ({ ...prevState, state: 'loading' }));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setTimeout(() => {
      setState({
        state: 'success',
        fruits: ['apple'],
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
    <CheckboxGroup
      value={state.fruits}
      disabled={state.state === 'loading'}
      onChange={value => {
        setState(prevState => ({ ...prevState, fruits: value }));
      }}
    >
      <Stack direction="row" spacing="3x">
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="orange">Orange</Checkbox>
        <Checkbox value="papaya">Papaya</Checkbox>
      </Stack>
    </CheckboxGroup>
  </>);
};

export default App;
