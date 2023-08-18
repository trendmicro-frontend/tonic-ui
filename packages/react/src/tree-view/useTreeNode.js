import { useContext } from 'react';
import { TreeNodeContext } from './context';

const useTreeNode = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(TreeNodeContext);
  return context;
};

export default useTreeNode;
