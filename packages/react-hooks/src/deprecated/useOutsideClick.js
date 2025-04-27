import useClickOutside from '../useClickOutside';
import useOnce from '../useOnce';

const defaultEvents = ['mousedown', 'touchstart'];

const useOutsideClick = (
  ref,
  handler,
  events = defaultEvents,
) => {
  useOnce(() => {
    console.error('Warning: The `useOutsideClick` Hook has been renamed to `useClickOutside``.\n\nSee https://trendmicro-frontend.github.io/tonic-ui/react/latest/hooks for more information.');
  });

  useClickOutside(ref, handler, { events });
};

export default useOutsideClick;
