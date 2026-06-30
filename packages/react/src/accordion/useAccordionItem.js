import { useContext } from 'react';
import { AccordionItemContext } from './context';

/**
 * @typedef {Object} AccordionItemContextValue
 * @property {string} accordionToggleId - The id of the accordion toggle.
 * @property {string} accordionContentId - The id of the accordion content.
 * @property {boolean} [disabled] - Whether the accordion item is disabled.
 * @property {boolean} [isExpanded] - Whether the accordion item is expanded.
 * @property {() => void} onToggle - A callback that is called when the accordion item is toggled.
 * @property {string} [variant] - The variant of the accordion.
 */

/**
 * A hook to access the accordion item context.
 * @returns {AccordionItemContextValue | undefined} The accordion item context, or `undefined` if not within an `AccordionItem`.
 */
const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  return context;
};

export default useAccordionItem;
