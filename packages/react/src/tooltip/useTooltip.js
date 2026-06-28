import { useContext } from 'react';
import { TooltipContext } from './context';

const useTooltip = () => {
  const context = useContext(TooltipContext);
  return context;
};

export default useTooltip;
