import {
  Box,
  Button,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import {
  merge,
} from '@tonic-ui/utils';
import useClipboard from '../hooks/useClipboard';
import { ensureString } from 'ensure-type';
import { themes } from 'prism-react-renderer';
import { LiveProvider, LiveEditor } from 'react-live';

const CodeBlock = ({ code: codeProp, language, ...rest }) => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const liveProviderTheme = {
    dark: merge(themes.vsDark, {
      plain: {
        backgroundColor: theme.colors.background._fixed.dark.high,
      },
    }),
    light: merge(themes.vsLight, {
      plain: {
        backgroundColor: theme.colors.background._fixed.light.high,
      },
    }),
  }[colorMode];
  const code = ensureString(codeProp).trim();
  const { onCopy, hasCopied } = useClipboard(code);

  return (
    <LiveProvider
      code={code}
      disabled={true}
      language={language}
      theme={liveProviderTheme}
    >
      <Box
        sx={{
          position: 'relative',
        }}
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
        <Button
          variant="secondary"
          size="sm"
          onClick={onCopy}
          sx={{
            position: 'absolute',
            right: '4x',
            top: '4x',
          }}
        >
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Box>
    </LiveProvider>
  );
};

export default CodeBlock;
