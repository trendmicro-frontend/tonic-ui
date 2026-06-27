import { useContext } from 'react';
import { AccordionContext } from './context';

/**
 * @typedef {Object} AccordionContextValue
 */

/**
 * A hook to access the accordion context.
 * @returns {AccordionContextValue | undefined} The accordion context, or `undefined` if not within an `Accordion`.
 */
const useAccordion = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AccordionContext);
  return context;
};

export default useAccordion;
