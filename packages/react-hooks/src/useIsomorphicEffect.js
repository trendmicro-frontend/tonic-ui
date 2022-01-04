import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicEffect = (typeof window === 'undefined') ? useEffect : useLayoutEffect;

export default useIsomorphicEffect;
