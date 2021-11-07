import { createContext, useContext } from 'react';

const AccordionItemContext = createContext();

const AccordionItemProvider = AccordionItemContext.Provider;

const useAccordionItem = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(AccordionItemContext);
  return context;
};

export {
  AccordionItemContext,
  AccordionItemProvider,
  useAccordionItem,
};
