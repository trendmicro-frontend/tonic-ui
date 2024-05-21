import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { pseudoClassSelector, pseudoElementSelector, sx, system } from '@tonic-ui/styled-system';
import { ensureArray, ensurePlainObject } from 'ensure-type';

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

const transformCSSPseudoSelectors = (props) => {
  const entries = Object.entries(ensurePlainObject(props))
    .filter(([name, value]) => {
      return Object.prototype.hasOwnProperty.call(pseudoClassSelector, name) || Object.prototype.hasOwnProperty.call(pseudoElementSelector, name);
    });

  return sx(Object.fromEntries(entries));
};

const transformCSSSuperset = (props) => {
  // The `sx` prop is a shortcut for defining custom styles that has access to the theme
  return sx(props?.sx);
};

const Box = styled('div', { shouldForwardProp })(
  system,
  transformCSSPseudoSelectors,
  transformCSSSuperset,
  // Prioritize highest specificity by placing it at the end
);

Box.displayName = 'Box';

export default Box;
