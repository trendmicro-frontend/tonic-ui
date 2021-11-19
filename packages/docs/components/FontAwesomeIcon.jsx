import { keyframes, ClassNames } from '@emotion/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useColorMode } from '@trendmicro/react-styled-ui';
import React, { forwardRef } from 'react';

library.add(fab);
library.add(far);
library.add(fas);

const spinKeyframes = keyframes`
  0% {
    transform: rotate(0eg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const spinReverseKeyframes = keyframes`
  0% {
    transform: rotate(359deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const FontAwesome = forwardRef((
  {
    spin,
    spinReverse,
    ...rest
  },
  ref
) => {
  const [colorMode] = useColorMode();
  const color = {
    light: '#666666',
    dark: '#bbbbbb',
  }[colorMode];

  return (
    <ClassNames>
      {({ css, cx }) => (
        <FontAwesomeIcon
          ref={ref}
          className={cx(
            css`
              color: ${color};
            `,
            spin && css`
              animation: ${spinKeyframes} 2s infinite linear;
            `,
            spinReverse && css`
              animation: ${spinReverseKeyframes} 2s infinite linear;
            `,
          )}
          {...rest}
        />
      )}
    </ClassNames>
  );
});

FontAwesome.displayName = 'FontAwesome';

export default FontAwesome;
