import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useAutocompleteItemStyle } from './styles';

const AutocompleteItem = forwardRef((inProps, ref) => {
  const {
    disabled,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AutocompleteItem' });

  // Items are not focusable — the combobox pattern keeps focus on the input
  // and advertises the active item via `aria-activedescendant`. Both
  // `aria-selected` (ARIA semantic) and `data-highlighted` (visual hook) are
  // expected to come in via spread, typically from the hook's `getItemProps`.
  // The style hook drives the highlight background off `[data-highlighted]`.
  const styleProps = useAutocompleteItemStyle({
    tabIndex: -1,
    disabled,
  });

  return (
    <Box
      ref={ref}
      tabIndex={-1}
      aria-disabled={ariaAttr(disabled)}
      {...styleProps}
      {...rest}
    />
  );
});

AutocompleteItem.displayName = 'AutocompleteItem';

export default AutocompleteItem;
