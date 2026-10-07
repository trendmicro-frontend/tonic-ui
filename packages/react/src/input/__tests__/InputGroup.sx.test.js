import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';
import { Input, InputGroup, InputGroupAppend, InputGroupPrepend } from '@tonic-ui/react/src';

/**
 * These assertions cover the in-group radius rules that are authored as nested selectors
 * (`&:not(:first-child)`, `& > *:first-of-type`, `&+&`) inside the `__sx` channel:
 *   - `useInputGroupSx` on `Input` (corner + adjacent-sibling margin), and
 *   - the child-radius rules inside `useInputGroupAppendStyle` / `useInputGroupPrependStyle`.
 *
 * They are easy to lose silently: no other test renders these components, and a value-level
 * snapshot diff won't flag a missing nested rule. Re-routing these rules between channels must
 * not drop them.
 *
 * The selectors are asserted against the *generated CSS text* rather than a single-declaration
 * `toHaveStyleRule(target)`, because the emitted selector is the class-qualified descendant form
 * (`.css-x-Box>*:first-of-type`) that `toHaveStyleRule`'s `target` option does not match verbatim.
 */
const collectCssRules = () =>
  [...document.querySelectorAll('style[data-emotion]')]
    .flatMap((el) => (el.sheet ? [...el.sheet.cssRules].map((r) => r.cssText) : []));

const rulesFor = (className) => collectCssRules().filter((r) => r.includes(`.${className}`));

describe('InputGroup in-group rules', () => {
  it('Input inside an InputGroup keeps its corner and adjacent-sibling rules', () => {
    const { container } = render(
      <InputGroup>
        <Input placeholder="first" />
        <Input placeholder="second" />
      </InputGroup>
    );

    const firstInput = container.querySelector('input[placeholder="first"]');
    const className = [...firstInput.classList].find((cls) => cls.startsWith('css-'));
    const rules = rulesFor(className).join('\n');

    // Corner adjustments for the first/last item, and the adjacent-sibling negative margin.
    expect(rules).toContain(':not(:first-child)');
    expect(rules).toContain('border-top-left-radius: 0');
    expect(rules).toContain('border-bottom-left-radius: 0');
    expect(rules).toContain(':not(:last-child)');
    expect(rules).toContain('border-top-right-radius: 0');
    expect(rules).toContain('border-bottom-right-radius: 0');
    expect(rules).toContain('margin-left: -1px');
  });

  it('InputGroupAppend keeps the child first-of-type radius rules', () => {
    const { container } = render(
      <InputGroup>
        <Input placeholder="value" />
        <InputGroupAppend>
          <span>append</span>
        </InputGroupAppend>
      </InputGroup>
    );

    const append = container.querySelector('span').parentElement;
    const className = [...append.classList].find((cls) => cls.startsWith('css-'));
    const rules = rulesFor(className).join('\n');

    expect(rules).toContain('>*:first-of-type');
    expect(rules).toContain('border-top-left-radius: 0');
    expect(rules).toContain(':not(:last-child)>*:first-of-type');
    expect(rules).toContain('border-top-right-radius: 0');
    expect(rules).toContain('margin-left: -1px'); // layoutStyle
  });

  it('InputGroupPrepend keeps the child first-of-type radius rules', () => {
    const { container } = render(
      <InputGroup>
        <InputGroupPrepend>
          <span>prepend</span>
        </InputGroupPrepend>
        <Input placeholder="value" />
      </InputGroup>
    );

    const prepend = container.querySelector('span').parentElement;
    const className = [...prepend.classList].find((cls) => cls.startsWith('css-'));
    const rules = rulesFor(className).join('\n');

    expect(rules).toContain('>*:first-of-type');
    expect(rules).toContain('border-top-right-radius: 0');
    expect(rules).toContain(':not(:first-of-type)>*:first-of-type');
    expect(rules).toContain('border-top-left-radius: 0');
    expect(rules).toContain('margin-right: -1px'); // layoutStyle
  });
});
