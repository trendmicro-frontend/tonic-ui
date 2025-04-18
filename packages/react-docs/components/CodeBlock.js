import {
  Box,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React from 'react';
import { LiveProvider, LiveEditor } from 'react-live';
import { codeBlockLight, codeBlockDark } from '../prism-themes/tonic-ui';

const CodeBlock = ({ code: codeProp, language, ...rest }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const liveProviderTheme = {
    dark: codeBlockDark,
    light: codeBlockLight,
  }[colorMode];
  const code = ensureString(codeProp).trim();

  return (
    <LiveProvider
      code={code}
      disabled={true}
      language={language}
      theme={liveProviderTheme}
    >
      <Box
        as={LiveEditor}
        sx={{
          fontFamily: 'mono',
          fontSize: 'md',
          lineHeight: 'md',
          mb: '4x',
          '& > .prism-code': {
            // Use `!important` to override the inline style
            padding: `${theme?.space?.['4x']} !important`,
            overflowX: 'auto',
          },
        }}
      />
    </LiveProvider>
  );
};

export default CodeBlock;
