import { createContext } from 'react';

const MenuContext = createContext();
const MenuProvider = MenuContext.Provider;

const SubmenuContext = createContext();
const SubmenuProvider = SubmenuContext.Provider;

export {
  MenuContext,
  MenuProvider,
  SubmenuContext,
  SubmenuProvider,
};
