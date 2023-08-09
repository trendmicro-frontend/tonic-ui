import {
  Collapse,
  Flex,
  Scrollbar,
  Space,
  Stack,
  Switch,
  Text,
  TextLabel,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import React from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';
import SkeletonContent from '@/components/SkeletonContent';

const App = () => {
  const [isOpen, onToggle] = useToggle(false);

  return (
    <Flex direction="column" rowGap="4x">
      <TextLabel display="inline-flex" alignItems="center">
        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />
        <Space width="2x" />
        <Text>Show</Text>
      </TextLabel>
      <Scrollbar maxHeight={180} overflowY="scroll">
        <SkeletonContent>
          <Stack spacing="4x">
            <SkeletonBlock />
            <Collapse
              in={isOpen}
              unmountOnExit={true}
            >
              <Stack spacing="4x">
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
                <SkeletonBlock />
              </Stack>
            </Collapse>
          </Stack>
        </SkeletonContent>
      </Scrollbar>
    </Flex>
  );
};

export default App;
