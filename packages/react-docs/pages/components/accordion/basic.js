import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Text,
} from '@tonic-ui/react';
import React from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';

const App = () => {
  return (
    <Accordion rowGap={1}>
      <AccordionItem defaultIsExpanded>
        <AccordionHeader>
          <Text>
            Accordion 1
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <SkeletonBlock px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <Text>
            Accordion 2
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <SkeletonBlock px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
      <AccordionItem disabled>
        <AccordionHeader>
          <Text>
            Disabled Accordion
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <SkeletonBlock px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default App;
