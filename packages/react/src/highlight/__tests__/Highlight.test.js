import { createRef } from 'react';
import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Highlight } from '@tonic-ui/react/src';

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

describe('Highlight', () => {
  it('should render correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <Highlight query="hello" data-testid="highlight">
        hello world
      </Highlight>
    ), renderOptions);

    expect(screen.getByTestId('highlight')).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  describe('basic functionality', () => {
    it('should highlight matching text', () => {
      const { container } = render(
        <Highlight query="hello">
          hello world
        </Highlight>
      );

      const mark = container.querySelector('mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveTextContent('hello');
    });

    it('should not highlight when no matches found', () => {
      const { container } = render(
        <Highlight query="xyz">
          hello world
        </Highlight>
      );

      const mark = container.querySelector('mark');
      expect(mark).not.toBeInTheDocument();
    });

    it('should highlight multiple occurrences', () => {
      const { container } = render(
        <Highlight query="test">
          test and test again
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
      expect(marks[0]).toHaveTextContent('test');
      expect(marks[1]).toHaveTextContent('test');
    });

    it('should handle multiple search queries', () => {
      const { container } = render(
        <Highlight query={['hello', 'world']}>
          hello beautiful world
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
      expect(marks[0]).toHaveTextContent('hello');
      expect(marks[1]).toHaveTextContent('world');
    });

    it('should handle empty query', () => {
      const { container } = render(
        <Highlight query="">
          hello world
        </Highlight>
      );

      const mark = container.querySelector('mark');
      expect(mark).not.toBeInTheDocument();
    });

    it('should handle null query', () => {
      const { container } = render(
        <Highlight query={null}>
          hello world
        </Highlight>
      );

      const mark = container.querySelector('mark');
      expect(mark).not.toBeInTheDocument();
    });

    it('should handle undefined query', () => {
      const { container } = render(
        <Highlight query={undefined}>
          hello world
        </Highlight>
      );

      const mark = container.querySelector('mark');
      expect(mark).not.toBeInTheDocument();
    });

    it('should handle empty children', () => {
      const { container } = render(
        <Highlight query="hello" />
      );

      const mark = container.querySelector('mark');
      expect(mark).not.toBeInTheDocument();
    });
  });

  describe('case sensitivity', () => {
    it('should be case-insensitive by default', () => {
      const { container } = render(
        <Highlight query="hello">
          Hello HELLO hello
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(3);
    });

    it('should be case-sensitive when caseSensitive is true', () => {
      const { container } = render(
        <Highlight query="hello" caseSensitive>
          Hello hello HELLO
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('hello');
    });

    it('should handle mixed case with multiple queries', () => {
      const { container } = render(
        <Highlight query={['Hello', 'World']} caseSensitive={false}>
          hello world HELLO WORLD
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(4);
    });
  });

  describe('variants', () => {
    it('should apply "highlight" variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="highlight">
          hello world
        </Highlight>
      );

      expect(container).toMatchSnapshot();
    });

    it('should apply "emphasis" variant', () => {
      const { container } = render(
        <Highlight query="hello" variant="emphasis">
          hello world
        </Highlight>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('transform function', () => {
    it('should apply transform to normalize text', () => {
      const { container } = render(
        <Highlight query="cafe" transform={removeAccents}>
          café and cafe
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
    });
  });

  describe('nested elements', () => {
    it('should highlight text within nested elements', () => {
      const { container } = render(
        <Highlight query="hello">
          <div>
            hello <span>world</span>
          </div>
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('hello');
    });

    it('should preserve element structure', () => {
      const { container } = render(
        <Highlight query="hello">
          <div className="container">
            <p id="paragraph">hello world</p>
          </div>
        </Highlight>
      );

      const div = container.querySelector('.container');
      expect(div).toBeInTheDocument();

      const p = container.querySelector('#paragraph');
      expect(p).toBeInTheDocument();

      const mark = container.querySelector('mark');
      expect(mark).toBeInTheDocument();
    });

    it('should handle deeply nested elements', () => {
      const { container } = render(
        <Highlight query="test">
          <div>
            <p>
              <span>test content</span>
            </p>
          </div>
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('test');
    });

    it('should handle multiple text nodes in nested elements', () => {
      const { container } = render(
        <Highlight query="hello">
          <div>
            hello <span>beautiful</span> hello
          </div>
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
    });
  });

  describe('slots and slotProps', () => {
    it('should use custom mark component via slots', () => {
      const CustomMark = ({ children, ...props }) => (
        <mark className="custom-mark" {...props}>
          {children}
        </mark>
      );

      const { container } = render(
        <Highlight query="hello" slots={{ mark: CustomMark }}>
          hello world
        </Highlight>
      );

      const mark = container.querySelector('.custom-mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveTextContent('hello');
    });

    it('should pass slotProps to mark component', () => {
      const { container } = render(
        <Highlight
          query="hello"
          slotProps={{
            mark: {
              className: 'custom-highlight',
              'data-testid': 'highlight-mark',
            },
          }}
        >
          hello world
        </Highlight>
      );

      const mark = container.querySelector('[data-testid="highlight-mark"]');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveClass('custom-highlight');
      expect(container).toMatchSnapshot();
    });

    it('should combine slots and slotProps', () => {
      const CustomMark = ({ children, ...props }) => (
        <mark className="custom-mark" {...props}>
          {children}
        </mark>
      );

      const { container } = render(
        <Highlight
          query="hello"
          slots={{ mark: CustomMark }}
          slotProps={{
            mark: {
              'data-custom': 'value',
            },
          }}
        >
          hello world
        </Highlight>
      );

      const mark = container.querySelector('.custom-mark');
      expect(mark).toBeInTheDocument();
      expect(mark).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('special characters', () => {
    it('should handle regex special characters', () => {
      const { container } = render(
        <Highlight query="hello.world">
          hello.world and helloXworld
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('hello.world');
    });

    it('should handle parentheses', () => {
      const { container } = render(
        <Highlight query="(test)">
          This is a (test) case
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('(test)');
    });

    it('should handle brackets', () => {
      const { container } = render(
        <Highlight query="[test]">
          This is a [test] case
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('[test]');
    });

    it('should handle asterisks', () => {
      const { container } = render(
        <Highlight query="test*">
          test* and test
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('test*');
    });

    it('should handle plus signs', () => {
      const { container } = render(
        <Highlight query="C++">
          I love C++ programming
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('C++');
    });

    it('should handle question marks', () => {
      const { container } = render(
        <Highlight query="what?">
          what? is this
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('what?');
    });
  });

  describe('unicode and special content', () => {
    it('should handle unicode characters', () => {
      const { container } = render(
        <Highlight query="你好">
          你好世界 你好
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks.length).toBeGreaterThan(0);
    });

    it('should handle emoji', () => {
      const { container } = render(
        <Highlight query="😀">
          <span>
            Hello <span role="img" aria-label="grinning face">😀</span> World <span role="img" aria-label="grinning face">😀</span>
          </span>
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks.length).toBeGreaterThan(0);
    });

    it('should handle newlines in text', () => {
      const { container } = render(
        <Highlight query="hello">
          hello{'\n'}world{'\n'}hello
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
    });

    it('should handle tabs in text', () => {
      const { container } = render(
        <Highlight query="hello">
          hello{'\t'}world{'\t'}hello
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(2);
    });
  });

  describe('props forwarding', () => {
    it('should forward additional props to Box', () => {
      const { container } = render(
        <Highlight
          query="hello"
          data-test="value"
          id="highlight-id"
        >
          hello world
        </Highlight>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-test', 'value');
      expect(wrapper).toHaveAttribute('id', 'highlight-id');
    });

    it('should forward ref', () => {
      const ref = createRef();
      render(
        <Highlight query="hello" ref={ref}>
          hello world
        </Highlight>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('should apply style props', () => {
      const { container } = render(
        <Highlight
          query="hello"
          color="red"
          fontSize="lg"
          padding="4"
        >
          hello world
        </Highlight>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle overlapping matches', () => {
      const { container } = render(
        <Highlight query={['test', 'testing']}>
          testing is fun
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      // Overlapping matches should be combined
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('testing');
    });

    it('should handle adjacent matches', () => {
      const { container } = render(
        <Highlight query={['hello', 'world']}>
          helloworld
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      // Adjacent matches should be combined
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('helloworld');
    });

    it('should handle match at the beginning', () => {
      const { container } = render(
        <Highlight query="hello">
          hello world
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('hello');
    });

    it('should handle match at the end', () => {
      const { container } = render(
        <Highlight query="world">
          hello world
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks).toHaveLength(1);
      expect(marks[0]).toHaveTextContent('world');
    });

    it('should handle very long text', () => {
      const longText = 'hello '.repeat(100) + 'world';
      const { container } = render(
        <Highlight query="hello">
          {longText}
        </Highlight>
      );

      const marks = container.querySelectorAll('mark');
      expect(marks.length).toBeGreaterThan(0);
    });

    it('should handle number children', () => {
      const { container } = render(
        <Highlight query="123">
          {123}
        </Highlight>
      );

      // Numbers are converted to strings by React
      expect(container.textContent).toContain('123');
    });
  });
});
