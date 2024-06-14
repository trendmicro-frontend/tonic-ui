import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Box,
  Text,
} from '@tonic-ui/react/src';
import React from 'react';

describe('Accordion', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Accordion rowGap={1}>
        <AccordionItem defaultIsExpanded>
          <AccordionHeader>
            <Text>
              Accordion 1
            </Text>
          </AccordionHeader>
          <AccordionBody>
            <Box px="4x" py="3x" />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <Text>
              Accordion 2
            </Text>
          </AccordionHeader>
          <AccordionBody>
            <Box px="4x" py="3x" />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  it('should toggle visibility of accordion items when clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem>
          <AccordionHeader data-testid="header-1">Section 1</AccordionHeader>
          <AccordionBody data-testid="body-1">Content 1</AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader data-testid="header-2">Section 2</AccordionHeader>
          <AccordionBody data-testid="body-2">Content 2</AccordionBody>
        </AccordionItem>
      </Accordion>
    );

    const header1 = screen.getByTestId('header-1');
    const body1 = screen.getByTestId('body-1');
    const header2 = screen.getByTestId('header-2');
    const body2 = screen.getByTestId('body-2');

    expect(header1).not.toHaveAttribute('aria-expanded');
    expect(header2).not.toHaveAttribute('aria-expanded');
    expect(body1).toHaveAttribute('aria-hidden', 'true');
    expect(body2).toHaveAttribute('aria-hidden', 'true');
    expect(body1).not.toBeVisible();
    expect(body2).not.toBeVisible();

    // Toggle the first accordion item
    await user.click(header1);
    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(body1).not.toHaveAttribute('aria-hidden');
    expect(body1).toBeVisible();
    expect(body2).not.toBeVisible();

    // Toggle the second accordion item
    await user.click(header2);
    expect(header2).toHaveAttribute('aria-expanded', 'true');
    expect(body2).not.toHaveAttribute('aria-hidden');
    expect(body1).toBeVisible();
    expect(body2).toBeVisible();
  });

  it('should handle multiple accordion items independently', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
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
            <AccordionHeader data-testid="header-1">
              <Text>
                Accordion 1
              </Text>
            </AccordionHeader>
            <AccordionBody data-testid="body-1">
              <Box px="4x" py="3x" />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem
            isExpanded={expandedItem === 'item2'}
            onToggle={handleToggle('item2')}
          >
            <AccordionHeader data-testid="header-2">
              <Text>
                Accordion 2
              </Text>
            </AccordionHeader>
            <AccordionBody data-testid="body-2">
              <Box px="4x" py="3x" />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      );
    };

    render(<TestComponent />);

    const header1 = screen.getByTestId('header-1');
    const body1 = screen.getByTestId('body-1');
    const header2 = screen.getByTestId('header-2');
    const body2 = screen.getByTestId('body-2');

    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).not.toHaveAttribute('aria-expanded');
    expect(body1).not.toHaveAttribute('aria-hidden');
    expect(body2).toHaveAttribute('aria-hidden', 'true');
    expect(body1).toBeVisible();
    expect(body2).not.toBeVisible();

    // Toggle the second accordion item
    await user.click(header2);
    expect(header1).not.toHaveAttribute('aria-expanded');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
    expect(body1).toHaveAttribute('aria-hidden', 'true');
    expect(body2).not.toHaveAttribute('aria-hidden');
    expect(body1).not.toBeVisible();
    expect(body2).toBeVisible();
    expect(body2).toBeVisible();

    // Toggle the first accordion item
    await user.click(header1);
    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).not.toHaveAttribute('aria-expanded');
    expect(body1).not.toHaveAttribute('aria-hidden');
    expect(body2).toHaveAttribute('aria-hidden', 'true');
    expect(body1).toBeVisible();
    expect(body2).not.toBeVisible();
  });

  it('should render correctly with disabled attribute', () => {
    render(
      <AccordionItem disabled>
        <AccordionHeader data-testid="accordion-header">
          <Text>
            Disabled Accordion
          </Text>
        </AccordionHeader>
        <AccordionBody>
          <Box px="4x" py="3x" />
        </AccordionBody>
      </AccordionItem>
    );

    const accordionHeader = screen.getByTestId('accordion-header');
    expect(accordionHeader).toBeDisabled();
  });
});
