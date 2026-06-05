import { runIfFn } from '@tonic-ui/utils';
import { forwardRef, isValidElement } from 'react';

const Render = forwardRef((
  {
    /**
     * If `true`, it will render the `children` prop
     */
    when,

    /**
     * The fallback content to render if `when` is `false`
     */
    fallback,

    /**
     * The children to render if `when` is `true`
     */
    children,
  },
  ref,
) => {
  const result = !when ? fallback : runIfFn(children, when);
  return isValidElement(result) ? result : <>{result}</>;
});

Render.displayName = 'Render';

export default Render;
