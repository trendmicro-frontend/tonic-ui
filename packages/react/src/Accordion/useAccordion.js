import { useContext } from 'react';
import { AccordionContext } from './context';

const useAccordion = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AccordionContext);
  return context;
};

export default useAccordion;
