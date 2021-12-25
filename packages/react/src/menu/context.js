import { createContext } from 'react';

const MenuContext = createContext();

const MenuProvider = MenuContext.Provider;

export {
  MenuContext,
  MenuProvider,
};
