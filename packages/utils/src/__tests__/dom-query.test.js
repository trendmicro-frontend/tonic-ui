import {
  getAllFocusable,
} from '@tonic-ui/utils/src';
import {
  createMockElement,
} from '@tonic-ui/utils/test-utils/jsdom-mock';

describe('getAllFocusable', () => {
  test('should return all focusable elements', () => {
    const el = createMockElement('div');
    el.innerHTML = `
      <a href="#"></a>
      <button></button>
      <input type="text" />
      <button disabled></button></div>
    `;

    const focusableElements = getAllFocusable(el);
    expect(focusableElements).toHaveLength(3);
  });

  test('should filter out elements with tabindex="-1" if keyboardOnly is true', () => {
    const el = createMockElement('div');
    el.innerHTML = `
      <a href="#"></a>
      <button tabindex="-1"></button>
      <input type="text" />
    `;

    const focusableElements = getAllFocusable(el, true);
    expect(focusableElements).toHaveLength(2);
    expect(focusableElements.map(el => el.tagName)).toEqual(['A', 'INPUT']);
  });

  test('should return no elements if there are no focusable elements', () => {
    const el = createMockElement('div');
    el.innerHTML = `
      <div></div>
    `;

    const focusableElements = getAllFocusable(el);
    expect(focusableElements).toHaveLength(0);
  });
});
