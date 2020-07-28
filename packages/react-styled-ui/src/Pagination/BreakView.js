import React, { forwardRef } from 'react';
import Button from '../Button';
import Box from '../Box';

const BreakView = forwardRef(
  (
    {
      breakLabel,
      onClick
    },
    ref
  ) => {
    return (
      <Box as="li">
        <Button
          variant="ghost"
          onClick={onClick}
          tabIndex="0"
          onKeyPress={onClick}
        >
          {breakLabel}
        </Button>
      </Box>
    );
  }
);

export default BreakView;
