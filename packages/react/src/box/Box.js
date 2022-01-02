import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { cx, pseudo, system } from '@tonic-ui/styled-system';
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

const Box = styled(
  styled('div', {
    shouldForwardProp,
  })(system)
)(pseudo);

Box.displayName = 'Box';

export default Box;
