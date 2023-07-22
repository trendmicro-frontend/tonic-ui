import { useContext } from 'react';
import { TreeViewContext } from './context';

const useTreeView = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TreeViewContext);
  return context;
};

export default useTreeView;
