import { createContext } from 'react';

const MenuContext = createContext();
const MenuProvider = MenuContext.Provider;

const SubMenuContext = createContext();
const SubMenuProvider = SubMenuContext.Provider;

export {
  MenuContext,
  MenuProvider,
  SubMenuContext,
  SubMenuProvider,
};
