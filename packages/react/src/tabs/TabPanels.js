import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

/**
 * @typedef {Object} TabPanelsProps
 * @property {React.ReactNode} [children] - The children of the tab panels.
 */

/**
 * @type {ForwardRefComponent<'div', TabPanelsProps>}
 */
const TabPanels = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'TabPanels' });

  return (
    <Box
      ref={ref}
      {...props}
    />
  );
});

TabPanels.displayName = 'TabPanels';

export default TabPanels;
