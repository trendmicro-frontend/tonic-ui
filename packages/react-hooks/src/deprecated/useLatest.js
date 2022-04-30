import useLatestRef from '../useLatestRef';
import useOnce from '../useOnce';

const useLatest = (value) => {
  useOnce(() => {
    console.error('Warning: The `useLatest` Hook has been renamed to `useLatestRef`.\n\nSee https://trendmicro-frontend.github.io/tonic-ui/react/latest/hooks for more information.');
  });

  return useLatestRef(value);
};

export default useLatest;
