import { useContext } from 'react';
import { TooltipContext } from './context';

const useTooltip = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TooltipContext);
  return context;
};

export default useTooltip;
