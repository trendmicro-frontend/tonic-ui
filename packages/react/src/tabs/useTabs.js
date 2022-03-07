import { useContext } from 'react';
import { TabsContext } from './context';

const useTabs = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TabsContext);
  return context;
};

export default useTabs;
