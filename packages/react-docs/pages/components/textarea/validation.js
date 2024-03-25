import { Box, Flex, Text, Textarea } from '@tonic-ui/react';
import { WarningCircleIcon } from '@tonic-ui/react-icons';
import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

const InlineError = (props) => (
  <Text fontSize="sm" lineHeight="sm" color="red:50" {...props} />
);

const MultilineTextField = forwardRef((
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
      <Textarea
        ref={combinedRef}
        resize="none"
        rows="3"
        placeholder="Placeholder text"
        value={value}
        onChange={onChange}
        error={error}
        pr={error ? '10x' : undefined}
      />
      {error && (
        <Box position="absolute" right="3x" top="2x">
          <WarningCircleIcon color="red:50" />
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
MultilineTextField.displayName = 'MultilineTextField';

const App = () => {
  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <MultilineTextField value={value} onChange={onChange} />
  );
};

export default App;
