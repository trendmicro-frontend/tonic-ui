import { createContext } from 'react';

const PopoverContext = createContext();

const PopoverProvider = PopoverContext.Provider;

export {
  PopoverContext,
  PopoverProvider,
};
