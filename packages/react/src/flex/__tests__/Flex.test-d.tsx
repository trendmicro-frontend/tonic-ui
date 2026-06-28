import React, { createRef, useRef } from 'react';
import { Flex } from '@tonic-ui/react';

// === Flex ===
<Flex>Content</Flex>;

// With direction shorthand
<Flex direction="row">Row</Flex>;
<Flex direction="column">Column</Flex>;
<Flex direction="row-reverse">Row Reverse</Flex>;
<Flex direction="column-reverse">Column Reverse</Flex>;

// With align shorthand
<Flex align="center">Centered</Flex>;
<Flex align="flex-start">Start</Flex>;
<Flex align="flex-end">End</Flex>;
<Flex align="stretch">Stretch</Flex>;

// With justify shorthand
<Flex justify="center">Centered</Flex>;
<Flex justify="space-between">Space Between</Flex>;
<Flex justify="space-around">Space Around</Flex>;

// With wrap shorthand
<Flex wrap="wrap">Wrapped</Flex>;
<Flex wrap="nowrap">No Wrap</Flex>;

// Style shorthands — responsive objects
<Flex
  direction={{ _: 'column', md: 'row' }}
  align={{ _: 'stretch', lg: 'center' }}
  justify={{ _: 'flex-start', md: 'space-between' }}
  wrap={{ _: 'nowrap', lg: 'wrap' }}
  gap={{ _: '4x', md: '8x', lg: '16x' }}
>
  Responsive Flex
</Flex>;

// StyleProps
<Flex padding="4x" margin="2x">Styled</Flex>;

// Ref
const flexRef = createRef<HTMLDivElement>();
<Flex ref={flexRef}>Flex</Flex>;

// Ref with HTMLElement (broader type)
function FlexWithHTMLElementRef() {
  const boxRef = useRef<HTMLElement>(null);
  return <Flex ref={boxRef} />;
}

// Callback ref
function FlexWithCallbackRef() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  return (
    <Flex
      ref={(el) => {
        sectionRefs.current[0] = el;
      }}
    />
  );
}

const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement ref should not be assignable to Flex
<Flex ref={wrongRef}>Flex</Flex>;
