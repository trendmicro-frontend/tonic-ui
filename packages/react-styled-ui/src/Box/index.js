import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { combinedStyleProps, stylePropMap } from '../shared/styled-system';

const shouldForwardProp = (() => {
  const omittedStylePropMap = {
    ...stylePropMap,

    // The `as` prop is supported by Emotion
    'as': true,
  };

  return prop => isPropValid(prop) && !omittedStylePropMap[prop];
})();

const Box = styled('div', {
  shouldForwardProp,
})(combinedStyleProps);

Box.displayName = 'Box';

export default Box;
