import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  AccordionToggleIcon,
  Space,
  Text,
  useColorMode,
} from '@tonic-ui/react';
import { ChevronDownIcon } from '@tonic-ui/react-icons';
import React, { useState } from 'react';
import SkeletonBlock from '@/components/SkeletonBlock';

const App = () => {
  const [colorMode] = useColorMode();
  const borderColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const [expandedItem, setExpandedItem] = useState(null);
  const handleToggle = item => ({ isExpanded }) => {
    setExpandedItem(isExpanded ? item : null);
  };
  const renderToggleIcon = item => (
    <AccordionToggleIcon>
      {(state, { ref, style: styleProps }) => {
        styleProps.transform = (expandedItem === item) ? 'rotate(0deg)' : 'rotate(-90deg)';
        return (<ChevronDownIcon ref={ref} size="4x" {...styleProps} />);
      }}
    </AccordionToggleIcon>
  );
  const getAccordionItemProps = item => {
    const isExpanded = expandedItem === item;
    const itemStyleProps = {
      border: 1,
      borderColor,
      borderStyle: 'solid',
      borderBottomWidth: isExpanded ? 1 : 0,
      transition: 'all .2s',
      my: isExpanded ? '3x' : 0,
      _firstOfType: {
        mt: 0,
      },
      _lastOfType: {
        mb: 0,
        borderBottomWidth: 1,
      },
    };

    return {
      ...itemStyleProps,
      isExpanded,
      onToggle: handleToggle(item),
    };
  };
  const getAccordionToggleProps = item => {
    const toggleStyleProps = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: {
        dark: 'gray:90',
        light: 'white',
      }[colorMode],
      color: {
        dark: 'white:primary',
        light: 'black:primary',
      }[colorMode],
      px: '4x',
      minHeight: '12x',
    };

    return {
      ...toggleStyleProps,
    };
  };

  return (
    <Accordion>
      {['item1', 'item2', 'item3'].map((item, index) => (
        <AccordionItem
          key={item}
          {...getAccordionItemProps(item)}
        >
          <AccordionToggle
            {...getAccordionToggleProps(item)}
          >
            {renderToggleIcon(item)}
            <Space width="2x" />
            <Text>
              Collapsible Item #{index + 1}
            </Text>
          </AccordionToggle>
          <AccordionContent>
            <SkeletonBlock px="4x" py="3x" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default App;
