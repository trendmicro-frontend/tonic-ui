import {
  Box,
  useColorMode,
} from '@tonic-ui/react';
import { loremIpsum } from 'lorem-ipsum';
import { forwardRef } from 'react';

const Lorem = forwardRef((
  {
    variant = 'default',
    count = 1,
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

  return (
    <Box
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        '> *:first-child': {
          marginTop: 0,
        },
        '> *:last-child': {
          marginBottom: 0,
        }
      }}
      {...styleProps}
      {...rest}
    />
  );
});

Lorem.displayName = 'Lorem';

export default Lorem;
