import { Button, Flex, LinkButton, Text } from '@tonic-ui/react';
import { useCopyToClipboard } from '@tonic-ui/react-hooks';
import { useState } from 'react';

const App = () => {
  const [buttonIsCopied, setButtonIsCopied] = useState(null);
  const [linkIsCopied, setLinkIsCopied] = useState(null);
  const [value, copy] = useCopyToClipboard();

  return (
    <>
      <Flex columnGap="2x" mb="2x">
        <Button
          minWidth={120}
          onClick={async function () {
            const ok = await copy('https://adc.github.trendmicro.com/trend-common-platform/tonic-ui')
            setButtonIsCopied(!!ok);
            setTimeout(() => setButtonIsCopied(null), 1000);
          }}
        >
          {buttonIsCopied === null && 'Click to copy'}
          {buttonIsCopied === true && 'Copied'}
          {buttonIsCopied === false && 'Copy failed'}
        </Button>
        <LinkButton
          onClick={async function () {
            const ok = await copy('https://adc.github.trendmicro.com/trend-common-platform/tonic-ui')
            setLinkIsCopied(!!ok);
            setTimeout(() => setLinkIsCopied(null), 1000);
          }}
        >
          {linkIsCopied === null && 'Click to copy'}
          {linkIsCopied === true && 'Copied'}
          {linkIsCopied === false && 'Copy failed'}
        </LinkButton>
      </Flex>
      <Text>Copied value: {value}</Text>
    </>
  );
};

export default App;
