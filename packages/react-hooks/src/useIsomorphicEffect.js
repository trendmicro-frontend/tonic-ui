import { useEffect, useLayoutEffect } from 'react';

/**
 * A custom Hook that resolves to useEffect when "window" is not in scope and useLayoutEffect in the browser.
 */
const useIsomorphicEffect = (typeof window === 'undefined') ? useEffect : useLayoutEffect;

export default useIsomorphicEffect;
