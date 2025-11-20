import { Highlight } from '@tonic-ui/react/src';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';

describe('Highlight', () => {
  it('should render correctly with basic text and query', () => {
    const { container } = render(
      <Highlight query="hello">hello world</Highlight>
    );

    expect(container).toBeInTheDocument();
    expect(container.querySelector('mark')).toHaveTextContent('hello');
    expect(container).toHaveTextContent('hello world');
  });

  it('should render without highlighting when query is empty', () => {
    const { container } = render(
      <Highlight query="">hello world</Highlight>
    );

    expect(container).toHaveTextContent('hello world');
    expect(container.querySelector('mark')).not.toBeInTheDocument();
  });

  it('should render without highlighting when query is null', () => {
    const { container } = render(
      <Highlight query={null}>hello world</Highlight>
    );

    expect(container).toHaveTextContent('hello world');
    expect(container.querySelector('mark')).not.toBeInTheDocument();
  });

  it('should render without highlighting when query is undefined', () => {
    const { container } = render(
      <Highlight>hello world</Highlight>
    );

    expect(container).toHaveTextContent('hello world');
    expect(container.querySelector('mark')).not.toBeInTheDocument();
  });

  it('should handle single word highlighting', () => {
    const { container } = render(
      <Highlight query="world">hello world</Highlight>
    );

    const markElement = container.querySelector('mark');
    expect(markElement).toBeInTheDocument();
    expect(markElement).toHaveTextContent('world');
    expect(container).toHaveTextContent('hello world');
  });

  it('should handle multiple word highlighting with array query', () => {
    const { container } = render(
      <Highlight query={['hello', 'world']}>hello beautiful world</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(2);
    expect(markElements[0]).toHaveTextContent('hello');
    expect(markElements[1]).toHaveTextContent('world');
    expect(container).toHaveTextContent('hello beautiful world');
  });

  it('should handle overlapping queries in array', () => {
    const { container } = render(
      <Highlight query={['test', 'testing']}>testing is fun</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements.length).toBeGreaterThan(0);
    expect(container).toHaveTextContent('testing is fun');
  });

  it('should handle case-sensitive highlighting', () => {
    const { container } = render(
      <Highlight query="Hello" ignoreCase={false}>Hello world hello</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(1);
    expect(markElements[0]).toHaveTextContent('Hello');
    expect(container).toHaveTextContent('Hello world hello');
  });

  it('should handle case-insensitive highlighting (default)', () => {
    const { container } = render(
      <Highlight query="hello">Hello world hello</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(2);
    expect(markElements[0]).toHaveTextContent('Hello');
    expect(markElements[1]).toHaveTextContent('hello');
  });

  it('should handle accent-sensitive highlighting (default)', () => {
    const { container } = render(
      <Highlight query="cafe" ignoreAccents={false}>café and cafe</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(1);
    expect(markElements[0]).toHaveTextContent('cafe');
    expect(container).toHaveTextContent('café and cafe');
  });

  it('should handle accent-insensitive highlighting', () => {
    const { container } = render(
      <Highlight query="cafe" ignoreAccents={true}>café and cafe</Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(2);
    expect(markElements[0]).toHaveTextContent('café');
    expect(markElements[1]).toHaveTextContent('cafe');
  });

  it('should handle both case and accent insensitive highlighting', () => {
    const { container } = render(
      <Highlight
        query="cafe"
        ignoreCase={true}
        ignoreAccents={true}
      >
        Café and CAFE and cafe
      </Highlight>
    );

    const markElements = container.querySelectorAll('mark');
    expect(markElements).toHaveLength(3);
    expect(container).toHaveTextContent('Café and CAFE and cafe');
  });

  describe('variants', () => {
    it('should render with highlight variant (default)', () => {
      const { container } = render(
        <Highlight query="hello">hello world</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveStyle({
        backgroundColor: '#fce79e',
      });
    });

    it('should render with selection variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="selection">hello world</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toBeInTheDocument();
      // Note: Selection variant styles are theme-dependent
    });

    it('should render with bold variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="bold">hello world</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toBeInTheDocument();
      expect(markElement).toHaveTextContent('hello');
      // Note: backgroundColor and fontWeight are applied through theme system
      // and may not be directly testable with toHaveStyle
    });
  });

  describe('slotProps', () => {
    it('should apply slotProps.mark to highlighted elements', () => {
      const slotProps = {
        mark: {
          'data-testid': 'custom-mark',
          className: 'custom-highlight',
          style: { border: '1px solid red' },
        }
      };

      const { container } = render(
        <Highlight query="hello" slotProps={slotProps}>
          hello world
        </Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveAttribute('data-testid', 'custom-mark');
      expect(markElement).toHaveClass('custom-highlight');
      expect(markElement).toHaveStyle({ border: '1px solid red' });
    });

    it('should apply slotProps.mark to all highlighted elements', () => {
      const slotProps = {
        mark: {
          className: 'highlight-class',
        }
      };

      const { container } = render(
        <Highlight query="test" slotProps={slotProps}>
          test and test again
        </Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(2);
      markElements.forEach(mark => {
        expect(mark).toHaveClass('highlight-class');
      });
    });
  });

  describe('children handling', () => {
    it('should handle string children', () => {
      const { container } = render(
        <Highlight query="hello">hello world</Highlight>
      );

      expect(container).toHaveTextContent('hello world');
    });

    it('should handle number children', () => {
      const { container } = render(
        <Highlight query="123">{123}</Highlight>
      );

      expect(container).toHaveTextContent('123');
      expect(container.querySelector('mark')).toHaveTextContent('123');
    });

    it('should handle null children', () => {
      const { container } = render(
        <Highlight query="hello">{null}</Highlight>
      );

      expect(container).toHaveTextContent('');
    });

    it('should handle undefined children', () => {
      const { container } = render(
        <Highlight query="hello">{undefined}</Highlight>
      );

      expect(container).toHaveTextContent('');
    });

    it('should convert non-string children to string', () => {
      const { container } = render(
        <Highlight query="object">{{}}</Highlight>
      );

      expect(container).toHaveTextContent('[object Object]');
    });

    it('should handle React element children', () => {
      const { container } = render(
        <Highlight query="important">
          <div>
            This is <strong>important</strong> text with <span>important</span> words.
          </div>
        </Highlight>
      );

      // Check that the structure is preserved
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();

      // Check that highlighting is applied to text content
      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(2);
      expect(markElements[0]).toHaveTextContent('important');
      expect(markElements[1]).toHaveTextContent('important');

      // Check that the full text content is preserved
      expect(container).toHaveTextContent('This is important text with important words.');
    });

    it('should handle nested React elements', () => {
      const { container } = render(
        <Highlight query="test">
          <div>
            <p>This is a <em>test</em> paragraph.</p>
            <ul>
              <li>First <strong>test</strong> item</li>
              <li>Second item with <span>test</span> word</li>
            </ul>
          </div>
        </Highlight>
      );

      // Check structure preservation
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
      expect(container.querySelector('em')).toBeInTheDocument();
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(2);
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();

      // Check highlighting
      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(3);
      markElements.forEach(mark => {
        expect(mark).toHaveTextContent('test');
      });
    });

    it('should handle mixed string and React element children', () => {
      const { container } = render(
        <Highlight query="hello">
          hello <strong>world</strong> and hello again
        </Highlight>
      );

      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('strong')).toHaveTextContent('world');

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(2);
      markElements.forEach(mark => {
        expect(mark).toHaveTextContent('hello');
      });
    });

    it('should handle React elements with no matching text', () => {
      const { container } = render(
        <Highlight query="xyz">
          <div>
            This is <strong>important</strong> text with <span>no matches</span>.
          </div>
        </Highlight>
      );

      // Structure should be preserved
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();

      // No highlighting should occur
      expect(container.querySelector('mark')).not.toBeInTheDocument();
      expect(container).toHaveTextContent('This is important text with no matches.');
    });

    it('should handle React elements with array children', () => {
      const items = ['first', 'second', 'third'];
      const { container } = render(
        <Highlight query="second">
          <ul>
            {items.map((item, index) => (
              <li key={index}>Item {item}</li>
            ))}
          </ul>
        </Highlight>
      );

      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(3);

      const markElement = container.querySelector('mark');
      expect(markElement).toBeInTheDocument();
      expect(markElement).toHaveTextContent('second');
    });

    it('should handle React elements with null/undefined children', () => {
      const { container } = render(
        <Highlight query="test">
          <div>
            {null}
            <span>test content</span>
            {undefined}
          </div>
        </Highlight>
      );

      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('mark')).toHaveTextContent('test');
    });
  });

  describe('special characters in query', () => {
    it('should handle queries with regex special characters', () => {
      const { container } = render(
        <Highlight query="hello.world">hello.world and hello world</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('hello.world');
    });

    it('should handle queries with parentheses', () => {
      const { container } = render(
        <Highlight query="(test)">This is a (test) case</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveTextContent('(test)');
    });

    it('should handle queries with brackets', () => {
      const { container } = render(
        <Highlight query="[test]">This is a [test] case</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveTextContent('[test]');
    });

    it('should handle queries with asterisks', () => {
      const { container } = render(
        <Highlight query="test*">test* and test</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveTextContent('test*');
    });
  });

  describe('edge cases', () => {
    it('should handle empty text', () => {
      const { container } = render(
        <Highlight query="hello" />
      );

      expect(container).toHaveTextContent('');
      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });

    it('should handle whitespace-only query', () => {
      const { container } = render(
        <Highlight query="   ">hello world</Highlight>
      );

      expect(container).toHaveTextContent('hello world');
      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });

    it('should handle array with empty strings', () => {
      const { container } = render(
        <Highlight query={['', 'hello', '']}>hello world</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('hello');
    });

    it('should handle array with null values', () => {
      const { container } = render(
        <Highlight query={[null, 'hello', null]}>hello world</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('hello');
    });

    it('should handle very long text', () => {
      const longText = 'hello '.repeat(1000) + 'world';
      const { container } = render(
        <Highlight query="hello">{longText}</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements.length).toBe(1000);
    });

    it('should handle text with only matches', () => {
      const { container } = render(
        <Highlight query="test">test</Highlight>
      );

      const markElement = container.querySelector('mark');
      expect(markElement).toHaveTextContent('test');
      expect(container).toHaveTextContent('test');
    });
  });

  describe('props forwarding', () => {
    it('should forward additional props to the container', () => {
      const { container } = render(
        <Highlight
          query="hello"
          data-testid="highlight-container"
          className="custom-class"
          id="highlight-id"
        >
          hello world
        </Highlight>
      );

      const highlightContainer = container.firstChild;
      expect(highlightContainer).toHaveAttribute('data-testid', 'highlight-container');
      expect(highlightContainer).toHaveClass('custom-class');
      expect(highlightContainer).toHaveAttribute('id', 'highlight-id');
    });

    it('should handle style prop', () => {
      const { container } = render(
        <Highlight
          query="hello"
          style={{ border: '1px solid blue', padding: '10px' }}
        >
          hello world
        </Highlight>
      );

      const highlightContainer = container.firstChild;
      expect(highlightContainer).toHaveStyle({
        border: '1px solid blue',
        padding: '10px',
      });
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef();

      render(
        <Highlight ref={ref} query="hello">hello world</Highlight>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('display name', () => {
    it('should have correct display name', () => {
      expect(Highlight.displayName).toBe('Highlight');
    });
  });

  describe('accessibility', () => {
    it('should pass accessibility tests', async () => {
      const { container } = render(
        <Highlight query="hello">hello world</Highlight>
      );

      await testA11y(container);
    });

    it('should pass accessibility tests with multiple highlights', async () => {
      const { container } = render(
        <Highlight query={['hello', 'world']}>hello beautiful world</Highlight>
      );

      await testA11y(container);
    });

    it('should pass accessibility tests with all variants', async () => {
      const variants = ['highlight', 'selection', 'bold'];

      for (const variant of variants) {
        const { container } = render(
          <Highlight query="hello" variant={variant}>hello world</Highlight>
        );

        // eslint-disable-next-line no-await-in-loop
        await testA11y(container);
      }
    });
  });

  describe('snapshots', () => {
    it('should match snapshot with basic highlighting', () => {
      const { container } = render(
        <Highlight query="hello">hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with multiple queries', () => {
      const { container } = render(
        <Highlight query={['hello', 'world']}>hello beautiful world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with highlight variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="highlight">hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with selection variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="selection">hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with bold variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="bold">hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with case sensitivity', () => {
      const { container } = render(
        <Highlight query="Hello" ignoreCase={true}>Hello world hello</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with accent insensitive', () => {
      const { container } = render(
        <Highlight query="cafe" ignoreAccents={true}>café and cafe</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with slotProps', () => {
      const slotProps = {
        mark: {
          className: 'custom-highlight',
          'data-testid': 'highlight-mark',
        }
      };

      const { container } = render(
        <Highlight query="hello" slotProps={slotProps}>hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with no matches', () => {
      const { container } = render(
        <Highlight query="xyz">hello world</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('matchAll prop', () => {
    it('should highlight all occurrences by default (matchAll=true)', () => {
      const { container } = render(
        <Highlight query="test">This is a test. Another test here. Final test.</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(3);
      markElements.forEach(mark => {
        expect(mark).toHaveTextContent('test');
      });
      expect(container).toHaveTextContent('This is a test. Another test here. Final test.');
    });

    it('should highlight all occurrences when matchAll=true explicitly', () => {
      const { container } = render(
        <Highlight query="test" matchAll={true}>This is a test. Another test here. Final test.</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(3);
      markElements.forEach(mark => {
        expect(mark).toHaveTextContent('test');
      });
    });

    it('should highlight only first occurrence when matchAll=false', () => {
      const { container } = render(
        <Highlight query="test" matchAll={false}>This is a test. Another test here. Final test.</Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('test');
      expect(container).toHaveTextContent('This is a test. Another test here. Final test.');
    });

    it('should work with multiple queries when matchAll=false', () => {
      const { container } = render(
        <Highlight query={['test', 'another']} matchAll={false}>
          This is a test. Another test here. Final test.
        </Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      // Should highlight first occurrence of 'test' and first occurrence of 'another'
      expect(markElements).toHaveLength(2);
      expect(markElements[0]).toHaveTextContent('test');
      expect(markElements[1]).toHaveTextContent('Another');
    });

    it('should work with multiple queries when matchAll=true', () => {
      const { container } = render(
        <Highlight query={['test', 'another']} matchAll={true}>
          This is a test. Another test here. Final test.
        </Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      // Should highlight all occurrences of both 'test' and 'another'
      expect(markElements.length).toBeGreaterThan(2);
    });

    it('should work with React element children when matchAll=false', () => {
      const { container } = render(
        <Highlight query="test" matchAll={false}>
          <div>
            This is a <strong>test</strong> paragraph with another test.
          </div>
        </Highlight>
      );

      // Check that structure is preserved
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();

      // Should only highlight first occurrence
      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('test');
    });

    it('should work with React element children when matchAll=true', () => {
      const { container } = render(
        <Highlight query="test" matchAll={true}>
          <div>
            This is a <strong>test</strong> paragraph with another test.
          </div>
        </Highlight>
      );

      // Check that structure is preserved
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(container.querySelector('strong')).toBeInTheDocument();

      // Should highlight all occurrences
      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(2);
      markElements.forEach(mark => {
        expect(mark).toHaveTextContent('test');
      });
    });

    it('should work with case sensitivity and matchAll=false', () => {
      const { container } = render(
        <Highlight query="Test" caseSensitive={true} matchAll={false}>
          Test and test and Test again
        </Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('Test');
    });

    it('should work with accent insensitive and matchAll=false', () => {
      const { container } = render(
        <Highlight query="cafe" ignoreAccents={true} matchAll={false}>
          café and cafe and café again
        </Highlight>
      );

      const markElements = container.querySelectorAll('mark');
      expect(markElements).toHaveLength(1);
      expect(markElements[0]).toHaveTextContent('café');
    });

    it('should handle empty query with matchAll=false', () => {
      const { container } = render(
        <Highlight query="" matchAll={false}>test text</Highlight>
      );

      expect(container).toHaveTextContent('test text');
      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });

    it('should handle null query with matchAll=false', () => {
      const { container } = render(
        <Highlight query={null} matchAll={false}>test text</Highlight>
      );

      expect(container).toHaveTextContent('test text');
      expect(container.querySelector('mark')).not.toBeInTheDocument();
    });
  });

  describe('matchAll snapshots', () => {
    it('should match snapshot with matchAll=true', () => {
      const { container } = render(
        <Highlight query="test" matchAll={true}>This is a test. Another test here.</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with matchAll=false', () => {
      const { container } = render(
        <Highlight query="test" matchAll={false}>This is a test. Another test here.</Highlight>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
