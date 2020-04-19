import { useContext } from 'react';
import { CloseableContext } from '../Closeable/context';

const useCloseable = () => {
  if (!useContext) {
    throw new Error('The `useContext` hook is not available with your React version.');
  }

  const context = useContext(CloseableContext);
  return context;
};

export default useCloseable;
