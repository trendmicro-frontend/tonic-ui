/**
 * Credit: https://github.com/reach/reach-ui/tree/dev/packages/descendants
 */
import { useIsomorphicEffect, usePrevious } from '@tonic-ui/react-hooks';
import { noop } from '@tonic-ui/utils';
import { useContext, useState } from 'react';
import { DescendantContext } from './context';

/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation.
 */
const useDescendant = (element) => {
  const [, forceUpdate] = useState();
  const {
    descendants = [],
    depth: parentDepth = 0,
    id: parentId = null,
    registerDescendant = noop,
    unregisterDescendant = noop,
  } = useContext(DescendantContext);

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.
  const index = descendants.findIndex((item) => item.element === element);

  const previousDescendants = usePrevious(descendants);

  // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.
  const someDescendantsHaveChanged = descendants.some((newDescendant, position) => {
    return (
      previousDescendants &&
      previousDescendants[position] &&
      previousDescendants[position].element !== newDescendant.element
    );
  });

  // Prevent flashing
  useIsomorphicEffect(() => {
    if (element) {
      registerDescendant(element);

      return () => {
        unregisterDescendant(element);
      };
    }

    forceUpdate({});

    return undefined;
  }, [element, registerDescendant, unregisterDescendant, index, someDescendantsHaveChanged]);

  return {
    index,
    parentDepth,
    parentId,
  };
};

export default useDescendant;
