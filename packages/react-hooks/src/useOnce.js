import useOnceWhen from './useOnceWhen';

const useOnce = (callback) => {
  useOnceWhen(callback, true);
};

export default useOnce;
