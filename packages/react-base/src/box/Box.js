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
    // Internal prop for color mode injection, should not be forwarded to DOM
    '__colorMode': true,
    // Internal prop for base styles at the lowest priority, should not be forwarded to DOM
    '__sx': true,
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

const transformBaseSxProp = (props) => {
  // The internal `__sx` prop carries component base styles at the lowest priority,
  // so consumer style props and `sx` can override them. Reuses the `sx` transform.
  return sx(props?.__sx);
};

const transformSxProp = (props) => {
  // The `sx` prop is a shortcut for defining custom styles that has access to the theme
  return sx(props?.sx);
};

const Box = styled('div', { shouldForwardProp })(
  transformBaseSxProp, // `__sx` — base styles, LOWEST priority
  system, // style props
  transformCSSPseudoSelectors, // pseudo props (unchanged)
  transformSxProp, // `sx` — HIGHEST priority
);

Box.displayName = 'Box';

export default Box;
