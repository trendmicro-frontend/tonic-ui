import React, { forwardRef } from 'react';
import { ensureArray } from 'ensure-type';

const For = forwardRef((
  {
    /**
     * The array of items to iterate over
     */
    items: itemsProp,

    /**
     * The fallback content to render when the array is empty
     */
    fallback,

    /**
     * The render function to render items item in the array
     */
    children,
  },
  ref,
) => {
  const items = ensureArray(itemsProp);
  return (items.length > 0) ? items.map(children) : fallback;
});

For.displayName = 'For';

export default For;
