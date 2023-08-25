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
  const [expandedItem, setExpandedItem] = React.useState('item1');
  const handleToggle = item => ({ isExpanded }) => {
    setExpandedItem(isExpanded ? item : null);
  };

  return (
    <Accordion rowGap={1}>
      <AccordionItem
        isExpanded={expandedItem === 'item1'}
        onToggle={handleToggle('item1')}
      >
        <AccordionHeader>
          <Text>
            Accordion 1
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <SkeletonBlock px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
      <AccordionItem
        isExpanded={expandedItem === 'item2'}
        onToggle={handleToggle('item2')}
      >
        <AccordionHeader>
          <Text>
            Accordion 2
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <SkeletonBlock px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
      <AccordionItem
        disabled
        isExpanded={expandedItem === 'item3'}
        onToggle={handleToggle('item3')}
      >
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
