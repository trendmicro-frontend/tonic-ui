import { createContext, useContext } from 'react';

const PopoverContext = createContext();

const PopoverContextProvider = PopoverContext.Provider;

const usePopover = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(PopoverContext);
  return context;
};

export {
  PopoverContext,
  PopoverContextProvider,
  usePopover,
};
