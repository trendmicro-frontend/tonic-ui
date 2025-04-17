import { isNullish } from '@tonic-ui/utils';
import getter from './getter';

const hasOwnSafe = (obj, key) => {
  if (isNullish(obj)) {
    return false;
  }

  return Object.hasOwn
    ? Object.hasOwn(obj, key)
    : Object.prototype.hasOwnProperty.call(obj, key);
};
/**
   * Border radius values follow this order:
   * 1 value:  all corners
   * 2 values: [top-left/bottom-right] [top-right/bottom-left]
   * 3 values: [top-left] [top-right/bottom-left] [bottom-right]
   * 4 values: [top-left] [top-right] [bottom-right] [bottom-left]
   */
const normalizeRadiusValues =(parts) => {
  switch (parts.length) {
    case 1:
      // all corners get the same value
      return [parts[0], parts[0], parts[0], parts[0]];
    case 2:
      // top-left/bottom-right | top-right/bottom-left
      return [parts[0], parts[1], parts[0], parts[1]];
    case 3:
      // top-left | top-right | bottom-left | bottom-right
      return [parts[0], parts[1], parts[1], parts[2]];
    case 4:
      // top-left | top-right | bottom-right | bottom-left
      return parts; // return as is  
    default:
      // invalid number of values, return as is
      return parts;
  }
}; 

const compoundBorderValue = (scale, value, options) => {
  /**
   * Scale object
   *
   * ```js
   * {
   *   'sm': '0.125rem',
   *   'md': '0.25rem',
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box borderRadius="sm" />
   * // => borderRadius: var(--radii-sm)
   * <Box borderRadius="sm md sm md" />
   * // => borderRadius: var(--radii-sm) var(--radii-md) var(--radii-sm) var(--radii-md)
   * <Box borderRadius="sm 0 md 4px" />
   * // => borderRadius: var(--radii-sm) 0 var(--radii-md) 4px
   * ```
   */
  if (typeof value === 'string') {
    // Handle single values
    if (!value.includes(' ')) {
      const singleValue = getter(scale, value, options);
      return `${singleValue} ${singleValue} ${singleValue} ${singleValue}`;
    }

    // Handle compound values
    const parts = value.split(/\s+/).filter(Boolean);
    const normalizedParts = normalizeRadiusValues(parts);

    return normalizedParts
      .map(part => {
        // Handle raw numeric values with units
        if (/^[0-9]+(\.[0-9]+)?(px|em|rem|%|vh|vw)$/.test(part)) {
          return part;
        }
        // Handle zero value
        if (part === '0') {
          return part;
        }
        // Handle theme values sm, md, lg, etc. 
        if (hasOwnSafe(scale, part)) {
          return getter(scale, part, options);
        }
        // Pass through unknown values
        return part;
      })
      .join(' ');
  }

  return getter(scale, value, options);
};

export default compoundBorderValue;