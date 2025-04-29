import { Tag } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const TagToggle = forwardRef((props, ref) => {
  const { children, sx, ...rest } = props;

  return (
    <Tag
      ref={ref}
      {...rest}
      isClosable={true}
      onClose={(event) => {
        event.preventDefault();
      }}
      sx={[
        {
          cursor: 'pointer',
          maxWidth: '100%',
          width: '100%',
          '> :first-of-type': {
            minWidth: 0, // Override the default `minWidth: auto` for flex items to enable text truncation
          },
        },
        sx, // Allows style overrides
      ]}
    >
      {children}
    </Tag>
  );
});

TagToggle.displayName = 'TagToggle';

export default TagToggle;
