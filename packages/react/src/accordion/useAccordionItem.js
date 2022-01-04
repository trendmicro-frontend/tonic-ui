import { useContext } from 'react';
import { AccordionItemContext } from './context';

const useAccordionItem = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AccordionItemContext);
  return context;
};

export default useAccordionItem;
