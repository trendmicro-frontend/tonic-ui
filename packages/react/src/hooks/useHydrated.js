import { useEffect, useState } from 'react';

/**
 * The `useHydrated` Hook returns a boolean indicating if the component is hydrated.
 *
 * When doing Server-Side Rendering (SSR), the result will always be `false`.
 * When doing Client-Side Rendering (CSR), the result will always be `false` on the first render, and `true` on subsequent renders.
 *
 * Example: Disable a button that requires DOM access to work.
 * ```jsx
 * function MyComponent() {
 *  const isHydrated = useHydrated();
 *  const handleClick = () => {
 *    // Do something only if the component is hydrated.
 *  };
 *  return (
 *    <Button disabled={!isHydrated} onClick={handleClick}>
 *      Click me!
 *    </Button>
 *  );
 * }
 * ```
 */
const useHydrated = () => {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated;
};

export default useHydrated;
