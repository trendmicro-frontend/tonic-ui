import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { pseudoClassSelector, pseudoElementSelector, sx, system } from '@tonic-ui/styled-system';
import { ensureArray } from 'ensure-type';

const shouldForwardProp = (() => {
  const stylePropMap = ensureArray(system.propNames)
    .reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {});
  const omittedStylePropMap = {
    ...stylePropMap,

    // The `as` prop is supported by Emotion
    'as': true,
  };

  return prop => isPropValid(prop) && !omittedStylePropMap[prop];
})();

const transformCSSSuperset = (props) => {
  // The `sx` prop is a shortcut for defining custom styles that has access to the theme
  return sx(props?.sx);
};

const transformCSSPseudoSelectors = (props) => {
  /**
   * Pseudo-classes must be declared in a specific order, as shown below:
   *
   * ```
   * :link
   * :visited
   * :hover
   * :active
   * ```
   *
   * Each pseudo-class corresponds to an event which can only happen later in the timeline than the one before.
   * 1. A link is unvisited before it is visited.
   * 2. A link is visited before it is hovered over.
   * 3. A link is hovered over before it is in active use.
   */
  const orderList = [
    '_focus',
    '_visited',
    '_hover',
    '_focusHover',
    '_active',
    '_focusActive',
    '_focusSelected',
    '_focusWithin',
    '_disabled', // `_disabled` must be placed after above pseudo-classes
    '_enabled',
  ];
  const orderedEntries = Object.entries(props).sort((a, b) => {
    const aIndex = orderList.indexOf(a[0]);
    const bIndex = orderList.indexOf(b[0]);
    return aIndex - bIndex;
  });

  let entries = [];
  for (const [name, value] of orderedEntries) {
    const selectorFunction = pseudoClassSelector[name] ?? pseudoElementSelector[name];
    if (typeof selectorFunction === 'function') {
      entries = entries.concat(selectorFunction(value));
    }
  }
  return sx(Object.fromEntries(entries));
};

const Box = styled('div', { shouldForwardProp })(
  system,
  transformCSSPseudoSelectors,
  transformCSSSuperset, // Place `transformCSSSuperset` at the end to gain the highest specificity
);

Box.displayName = 'Box';

export default Box;
