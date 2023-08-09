import {
  Collapse,
  Flex,
  Space,
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
      <Collapse
        in={isOpen}
        collapsedHeight={0}
        unmountOnExit={false}
      >
        <SkeletonContent>
          <SkeletonBlock />
        </SkeletonContent>
      </Collapse>
    </Flex>
  );
};

export default App;
