import { useLayoutEffect, useEffect } from 'react';
import canUseDOM from './dom/canUseDOM';

const useIsomorphicLayoutEffect = (() => {
  return canUseDOM ? useLayoutEffect : useEffect;
})();

export default useIsomorphicLayoutEffect;
