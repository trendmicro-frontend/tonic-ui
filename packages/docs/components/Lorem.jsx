import { loremIpsum } from 'lorem-ipsum';
import React, { forwardRef } from 'react';
import {
  Box,
  useColorMode,
} from '@trendmicro/react-styled-ui';

const Lorem = forwardRef((
  {
    variant = 'default',
    count = 1,
    css,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const html = loremIpsum({
    count,
    units: 'paragraphs',
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    format: 'html',
  });
  const styleProps = {
    default: {
    },
    outline: {
      border: 1,
      borderColor: {
        light: 'gray:20',
        dark: 'gray:70',
      }[colorMode],
    },
  }[variant];

  css = [
    css,
    {
      '> *:first-child': {
        marginTop: 0,
      },
      '> *:last-child': {
        marginBottom: 0,
      },
    },
  ];

  return (
    <Box
      ref={ref}
      css={css}
      dangerouslySetInnerHTML={{ __html: html }}
      {...styleProps}
      {...rest}
    />
  );
});

Lorem.displayName = 'Lorem';

export default Lorem;
