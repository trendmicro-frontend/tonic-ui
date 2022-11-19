import {
  getEventWindow,
  getOwnerDocument,
  getOwnerWindow,
  normalizeKeyboardEventKey,
} from '@tonic-ui/utils/src';

test('should get window object', () => {
  expect(getOwnerWindow()).toBe(window);
});

test('should get document object', () => {
  expect(getOwnerDocument()).toBe(document);
});

test('should get window object from event', () => {
  const event = new UIEvent('change', { view: window });
  expect(getEventWindow(event)).toBe(window);
});

test('should normalize keyboard events', () => {
  const keyboardEvent = {
    key: 'Left',
    keyCode: 38,
  };
  expect(normalizeKeyboardEventKey(keyboardEvent)).toBe('ArrowLeft');
});
