import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTabListStyle } from './styles';
import useTabs from './useTabs';

/**
 * @typedef {Object} TabListProps
 * @property {string} [aria-label] - A label for the tab list.
 * @property {React.ReactNode} [children] - The children of the tab list.
 */

/**
 * @type {ForwardRefComponent<'div', TabListProps>}
 */
const TabList = forwardRef((inProps, ref) => {
  const {
    'aria-label': ariaLabel,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TabList' });
  const context = useTabs();
  const orientation = context?.orientation;
  const styleProps = useTabListStyle({ orientation });

  return (
    <Box
      ref={ref}
      aria-label={ariaLabel}
      aria-orientation={orientation}
      role="tablist"
      {...styleProps}
      {...rest}
    />
  );
});

TabList.displayName = 'TabList';

export default TabList;
