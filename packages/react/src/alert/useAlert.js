import { useContext } from 'react';
import { AlertContext } from './context';

const useAlert = () => {
  const context = useContext(AlertContext);
  return context;
};

export default useAlert;
