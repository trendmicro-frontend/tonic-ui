import { isPlainObject } from '@tonic-ui/utils';

// Compares Popper modifier values recursively through arrays and plain objects.
// Functions, DOM nodes, class instances, and other non-plain objects retain
// reference semantics because structurally similar values can behave differently.
const isEqualModifierValue = (a, b, seen) => {
  if (a === b) {
    return true;
  }
  const isArrayPair = Array.isArray(a) && Array.isArray(b);
  const isObjectPair = isPlainObject(a) && isPlainObject(b);
  if (!isArrayPair && !isObjectPair) {
    return false;
  }
  if (seen.has(a) && seen.get(a) === b) {
    return true;
  }
  seen.set(a, b);

  if (isArrayPair) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqualModifierValue(a[i], b[i], seen)) {
        return false;
      }
    }
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!isEqualModifierValue(a[key], b[key], seen)) {
      return false;
    }
  }
  return true;
};

export const isModifierArrayEqual = (a, b) => isEqualModifierValue(a, b, new WeakMap());
