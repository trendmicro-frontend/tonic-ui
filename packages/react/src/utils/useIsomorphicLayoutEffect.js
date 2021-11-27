import canUseDOM from './dom/canUseDOM';
import { useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = (() => {
  return canUseDOM ? useLayoutEffect : useEffect;
})();

export default useIsomorphicLayoutEffect;
