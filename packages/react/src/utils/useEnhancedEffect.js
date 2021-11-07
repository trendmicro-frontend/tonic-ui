import { useLayoutEffect, useEffect } from 'react';

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useEnhancedEffect;
