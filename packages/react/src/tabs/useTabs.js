import { useContext } from 'react';
import { TabsContext } from './context';

/**
 * @typedef {Object} TabsContextValue
 * @property {boolean} [disabled] - Whether the tabs are disabled.
 * @property {number | string} index - The currently selected tab index.
 * @property {(index: number | string) => void} onChange - Callback to change the selected tab.
 * @property {'horizontal' | 'vertical'} orientation - The orientation of the tabs.
 * @property {'default' | 'filled' | 'unstyled'} variant - The variant of the tabs.
 * @property {(index?: number | string) => number | string} registerTab - Register a tab and return its index.
 * @property {(index?: number | string) => number | string} registerTabPanel - Register a tab panel and return its index.
 * @property {(index: number | string) => boolean} unregisterTab - Unregister a tab.
 * @property {(index: number | string) => boolean} unregisterTabPanel - Unregister a tab panel.
 */

/**
 * A hook to access the tabs context.
 * @returns {TabsContextValue | undefined} The tabs context, or `undefined` if not within a `Tabs`.
 */
const useTabs = () => {
  const context = useContext(TabsContext);
  return context;
};

export default useTabs;
