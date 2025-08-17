import React from 'react';
import useSSRSafeId from './internal/useSSRSafeId';

/**
 * A custom hook that generates unique IDs for accessibility and server-side rendering.
 *
 * React 18+:
 * Uses React's built-in `useId()`, which generates deterministic IDs that match between server and client.
 * @returns {string} A unique ID string
 *
 * React < 18:
 * Falls back to an internal implementation (`useSSRSafeId`). During SSR, it may return `undefined` to avoid hydration mismatches. The ID stabilizes after the component mounts.
 * @returns {string | undefined} A unique ID string
 */
const useId = React.useId ?? useSSRSafeId;

export default useId;
