import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  Box,
} from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

const CustomTransition = React.forwardRef(({ in: _in, children, ...rest }, ref) => (
  <Box ref={ref} data-testid="custom-transition" {...rest}>{children}</Box>
));
CustomTransition.displayName = 'CustomTransition';

describe('AccordionContent slots / slotProps', () => {
  beforeEach(() => {
    warnDeprecatedProps.mockClear();
  });

  it('A — slots.transition renders the custom transition component', () => {
    render(
      <Accordion>
        <AccordionItem defaultIsExpanded>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionContent slots={{ transition: CustomTransition }}>
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
  });

  it('B — slotProps.transition passes additional props to the transition element', () => {
    render(
      <Accordion>
        <AccordionItem defaultIsExpanded>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionContent
            slots={{ transition: CustomTransition }}
            slotProps={{ transition: { 'data-foo': 'bar' } }}
          >
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('custom-transition')).toHaveAttribute('data-foo', 'bar');
  });

  it('C — deprecated TransitionComponent still renders and warns; deprecated TransitionProps warns', () => {
    render(
      <Accordion>
        <AccordionItem defaultIsExpanded>
          <AccordionHeader>Section 1</AccordionHeader>
          <AccordionContent
            TransitionComponent={CustomTransition}
            TransitionProps={{}}
          >
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('custom-transition')).toBeInTheDocument();
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionComponent', {
      prefix: 'AccordionContent:',
      alternative: 'slots.transition',
      willRemove: true,
    });
    expect(warnDeprecatedProps).toHaveBeenCalledWith('TransitionProps', {
      prefix: 'AccordionContent:',
      alternative: 'slotProps.transition',
      willRemove: true,
    });
  });

  it('Regression — rendering AccordionContent without accordion context renders a Box without crashing', () => {
    const { container } = render(
      <AccordionContent data-testid="standalone-content">
        standalone
      </AccordionContent>
    );

    expect(container.querySelector('[data-testid="standalone-content"]')).toBeInTheDocument();
  });
});
