import { ensureArray } from 'ensure-type';

/**
 * Composes any number of sx-values into a single ordered array for the `sx`/`__sx` transform.
 *
 * IMPORTANT: This function returns an **array**, not a props object.
 * Do NOT spread the result as component props — it is meant to be passed
 * directly to the `sx` or `__sx` prop on a `Box` component so that Emotion
 * resolves each entry in declaration order, letting later values override
 * earlier ones at equal specificity without object-merging.
 *
 * Each argument may be an sx-object, an array of sx-values, or `undefined`
 * (skipped). Earlier arguments are applied first (lowest precedence); later
 * arguments override at equal specificity.
 *
 * @param {...(object|Array|undefined)} values - The sx-values to compose, in precedence order (first = lowest).
 * @returns {Array} An array suitable for `sx={composeSx(a, b, ...)}`.
 *
 * @example
 * // Two objects
 * composeSx({ color: 'red' }, { color: 'blue' })
 * // => [{ color: 'red' }, { color: 'blue' }]
 *
 * @example
 * // Any number of values; arrays are flattened, `undefined` is skipped
 * composeSx(baseSx, componentSx, slotSx)
 *
 * @example
 * // Safe with missing overrides
 * composeSx({ color: 'red' }, undefined)
 * // => [{ color: 'red' }]
 *
 * @example
 * // Pass the result directly to sx — do NOT spread it as props
 * <Box sx={composeSx(baseSx, overrideSx)} />
 */
const composeSx = (...values) => values.flatMap((value) => ensureArray(value));

export { composeSx };
