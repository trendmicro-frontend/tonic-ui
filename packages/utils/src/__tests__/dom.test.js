import {
  getEventWindow,
  getOwnerDocument,
  getOwnerWindow,
  normalizeKeyboardEventKey,
} from '@tonic-ui/utils/src';

describe('getEventWindow', () => {
  it('should get window object from event', () => {
    const event = new UIEvent('change', { view: window });
    expect(getEventWindow(event)).toBe(window);
  });
});

describe('getOwnerWindow', () => {
  it('should get window object', () => {
    expect(getOwnerWindow()).toBe(window);
  });
});

describe('getOwnerDocument', () => {
  it('should get document object', () => {
    expect(getOwnerDocument()).toBe(document);
  });
});

describe('normalizeKeyboardEventKey', () => {
  it('should normalize keyboard events', () => {
    const keyboardEvent = {
      key: 'Left',
      keyCode: 38,
    };
    expect(normalizeKeyboardEventKey(keyboardEvent)).toBe('ArrowLeft');
  });
});
