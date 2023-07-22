/**
 * Credit: https://github.com/reach/reach-ui/tree/dev/packages/descendants
 */
import memoize from 'micro-memoize';
import React, { useCallback, useState } from 'react';
import { DescendantContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const binaryFindElement = (array, element) => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (array[middle].element === element) {
      return middle;
    }

    // eslint-disable-next-line no-bitwise
    if (array[middle].element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return start;
};

const Descendant = ({
  children,
  depth,
  id,
}) => {
  const [descendants, setDescendants] = useState([]);

  const registerDescendant = useCallback((element) => {
    setDescendants((prevDescendants) => {
      let nextDescendants;
      if (prevDescendants.length === 0) {
        // If there are no descendants, register at index 0 and bail.
        return [
          {
            element,
            index: 0,
          },
        ];
      }

      const index = binaryFindElement(prevDescendants, element);

      if (prevDescendants[index] && prevDescendants[index].element === element) {
        // If the element is already registered, just use the same array
        nextDescendants = prevDescendants;
      } else {
        // When registering a descendant, we need to make sure we insert in
        // into the array in the same order that it appears in the DOM. So as
        // new descendants are added or maybe some are removed, we always know
        // that the array is up-to-date and correct.
        //
        // So here we look at our registered descendants and see if the new
        // element we are adding appears earlier than an existing descendant's
        // DOM node via `node.compareDocumentPosition`. If it does, we insert
        // the new element at this index. Because `registerDescendant` will be
        // called in an effect every time the descendants state value changes,
        // we should be sure that this index is accurate when descendent
        // elements come or go from our component.

        const nextDescendant = {
          element,
          index,
        };

        // If an index is not found we will push the element to the end.
        nextDescendants = prevDescendants.slice();
        nextDescendants.splice(index, 0, nextDescendant);
      }

      nextDescendants.forEach((descendant, position) => {
        descendant.index = position;
      });

      return nextDescendants;
    });

    return element;
  }, []);

  const unregisterDescendant = useCallback((element) => {
    setDescendants((prevDescendants) => {
      return prevDescendants.filter((descendant) => element !== descendant.element);
    });
  }, []);

  const context = getMemoizedState({
    descendants,
    depth,
    id,
    registerDescendant,
    unregisterDescendant,
  });

  return (
    <DescendantContext.Provider value={context}>
      {children}
    </DescendantContext.Provider>
  );
};

Descendant.displayName = 'Descendant';

export default Descendant;
