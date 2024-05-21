import { Box, Flex, Input, Text } from '@tonic-ui/react';
import { WarningCircleIcon } from '@tonic-ui/react-icons';
import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef, useEffect, useRef } from 'react';

const InlineError = (props) => (
  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />
);

const TextField = forwardRef((
  {
    value,
    onChange,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const error = (value === '') ? 'Please fill out this field' : null;

  // Optional
  useEffect(() => {
    const el = nodeRef.current;
    const errorMessage = error || '';
    el.setCustomValidity(errorMessage);
  }, [error]);

  return (<>
    <Flex position="relative" alignItems="center" mb="1x">
      <Input
        ref={combinedRef}
        placeholder="Placeholder text"
        value={value}
        onChange={onChange}
        error={error}
        pr={error ? '10x' : undefined}
      />
      {error && (
        <Box position="absolute" right={0}>
          <WarningCircleIcon mx="3x" color="red:50" />
        </Box>
      )}
    </Flex>
    <Box>
      {error && (
        <InlineError>{error}</InlineError>
      )}
    </Box>
  </>);
});
TextField.displayName = 'TextField';

const App = () => {
  const [value, setValue] = React.useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <TextField value={value} onChange={onChange} />
  );
};

export default App;
