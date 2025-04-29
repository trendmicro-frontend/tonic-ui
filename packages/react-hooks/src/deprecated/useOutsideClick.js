import useClickOutside from '../useClickOutside';
import useOnce from '../useOnce';

const defaultEvents = ['mousedown', 'touchstart'];

const useOutsideClick = (
  ref,
  handler,
  events = defaultEvents,
) => {
  useOnce(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        'Warning: The `useOutsideClick` hook has been renamed to `useClickOutside`.\n\n' +
        'This alias is planned to be removed in the next major release.\n' +
        'See https://trendmicro-frontend.github.io/tonic-ui/react/latest/hooks for more information.'
      );
    }
  });

  useClickOutside(ref, handler, { events });
};

export default useOutsideClick;
