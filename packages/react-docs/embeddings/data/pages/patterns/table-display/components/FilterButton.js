import {
  Button,
  useColorStyle,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const FilterButton = forwardRef((props, ref) => {
  const [colorStyle] = useColorStyle();

  return (
    <Button
      variant="ghost"
      sx={{
        color: colorStyle.color.info,
        _focus: {
          color: colorStyle.color.info,
        },
      }}
      {...props}
    />
  );
});

FilterButton.displayName = 'FilterButton';

export default FilterButton;
