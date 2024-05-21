import { useOnce } from '@tonic-ui/react-hooks';
import { useToastManager } from '../toast';

export default (...args) => {
  useOnce(() => {
    console.error('Warning: The `useToast` Hook is deprecated and will be removed in the next major release. Use the `useToastManager` Hook instead.');
  });

  return useToastManager(...args);
};
