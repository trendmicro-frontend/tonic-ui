import React from 'react';
import useSSRSafeId from './deprecated/useSSRSafeId';

/**
 * A hook that returns a unique ID string.
 *
 * Uses React's built-in useId when available (React 18+),
 * otherwise falls back to a custom implementation that is SSR-safe.
 *
 * @returns {string | undefined} A unique ID string
 */
const useId = React.useId ?? useSSRSafeId;

export default useId;
