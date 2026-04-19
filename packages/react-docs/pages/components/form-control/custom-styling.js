import {
  Stack,
  Flex,
  Text,
  Tooltip,
  FormControl,
  FormLabel,
  FormInput,
  FormErrorMessage,
} from '@tonic-ui/react';
import { InfoOIcon } from '@tonic-ui/react-icons';

// InfoTip component using Tooltip
const InfoTip = ({ label }) => {
  return (
    <Tooltip label={label} maxWidth={320}>
      <InfoOIcon
        color="gray:50"
        _hover={{
          color: 'gray:60',
        }}
      />
    </Tooltip>
  );
};

const App = () => {
  return (
    <Stack direction="column" spacing="4x">
      {/* Custom required indicator with text */}
      <FormControl gap="1x">
        <Flex>
          <FormLabel>Email</FormLabel>
          <Text color="red:50" fontSize="xs" ml="2x">
            (optional)
          </Text>
        </Flex>
        <FormInput placeholder="Custom text indicator" />
      </FormControl>

      {/* Label with InfoTip */}
      <FormControl gap="1x">
        <Flex alignItems="center" gap="2x">
          <FormLabel required>API Key</FormLabel>
          <InfoTip label="Your API key is used to authenticate requests. Keep it secure and don't share it publicly." />
        </Flex>
        <FormInput placeholder="Enter your API key" />
      </FormControl>

      {/* Error message with InfoTip */}
      <FormControl error gap="1x">
        <FormLabel required>Password</FormLabel>
        <FormInput type="password" placeholder="Enter password" />
        <FormErrorMessage
          errors={[
            <Flex key="password-length" alignItems="center" gap="2x">
              <Text>Password must contain at least 8 characters</Text>
              <InfoTip label="Use a mix of uppercase, lowercase, numbers, and special characters for better security." />
            </Flex>,
            'Must include at least one uppercase letter',
            <Flex key="password-number" alignItems="center" gap="2x">
              <Text>Must include at least one number</Text>
              <InfoTip label="Numbers help make your password more secure against common attacks." />
            </Flex>,
          ]}
        />
      </FormControl>
    </Stack>
  );
};

export default App;
