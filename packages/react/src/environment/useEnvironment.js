import { useContext } from 'react';
import { EnvironmentContext } from './context';

const defaultContext = {
  getRootNode: () => document,
  getDocument: () => document,
  getWindow: () => window,
};

const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  // Return default context if not within EnvironmentProvider
  // This makes the hook non-strict, allowing usage outside the provider
  return context ?? defaultContext;
};

export default useEnvironment;
