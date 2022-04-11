import { createContext } from 'react';

const TooltipContext = createContext();

const TooltipProvider = TooltipContext.Provider;

export {
  TooltipContext,
  TooltipProvider,
};
