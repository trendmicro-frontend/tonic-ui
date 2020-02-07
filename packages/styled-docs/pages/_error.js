import { Box, Flex, Text } from '@trendmicro/react-styled-core';

const Error = ({ statusCode }) => {
  const errorDescription = {
    [404]: 'This page could not be found.',
  }[statusCode] || 'An error occurred on this page.';

  return (
    <Flex
      align="center"
      justify="center"
      height="100%"
    >
      <Text
        borderRight={1}
        borderColor="rgba(0, 0, 0, .3)"
        fontSize="1.5em"
        lineHeight="1.5em"
        fontWeight="semibold"
        pr=".75em"
        verticalAlign="top"
      >
        {statusCode}
      </Text>
      <Text
        pl=".75em"
        verticalAlign="middle"
      >
        {errorDescription}
      </Text>
    </Flex>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode };
};

export default Error;
