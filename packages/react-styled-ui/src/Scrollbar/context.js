import { createContext, useContext } from 'react';

const ScrollbarContext = createContext();

const ScrollbarContextProvider = ScrollbarContext.Provider;

const useScrollbar = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(ScrollbarContext);
  return context;
};

export {
  ScrollbarContext,
  ScrollbarContextProvider,
  useScrollbar,
};
