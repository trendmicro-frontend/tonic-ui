import useOnceWhen from './useOnceWhen';

/**
 * A custom Hook that runs a callback at most once.
 *
 * @param {function} callback - The callback to run.
 */
const useOnce = (callback) => {
  useOnceWhen(callback, true);
};

export default useOnce;
