import {
  canUseDOM,
  contains,
  getActiveElement,
  getComputedStyle,
  getEventWindow,
  getLeftmostOffset,
  getOwnerDocument,
  getOwnerWindow,
  getRelatedTarget,
  getTopmostOffset,
  isElement,
  isHTMLElement,
  normalizeKeyboardEventKey,
} from '@tonic-ui/utils/src';
import {
  createMockElement,
} from '@tonic-ui/utils/test-utils/jsdom-mock';

describe('canUseDOM', () => {
  it('should return true if window and document are defined', () => {
    expect(canUseDOM()).toBe(true);
  });

  it('should return false if window is undefined', () => {
    const originalWindow = global.window;
    delete global.window;
    expect(canUseDOM()).toBe(false);
    global.window = originalWindow;
  });
});

describe('contains', () => {
  it('should return true if context contains node', () => {
    const context = createMockElement('div');
    const node = createMockElement('span');
    context.appendChild(node);
    expect(contains(context, node)).toBe(true);
  });

  it('should return false if context does not contain node', () => {
    const context = createMockElement('div');
    const node = createMockElement('span');
    expect(contains(context, node)).toBe(false);
  });

  it('should return false if node is null', () => {
    const context = createMockElement('div');
    expect(contains(context, null)).toBe(false);
  });
});

describe('getActiveElement', () => {
  it('should return the active element of the document', () => {
    const input = createMockElement('input');
    document.body.appendChild(input);
    input.focus();
    expect(getActiveElement()).toBe(input);
    document.body.removeChild(input);
    expect(getActiveElement()).toBe(document.body);
  });
});

describe('getComputedStyle', () => {
  it('should return the computed style of an element', () => {
    const element = createMockElement('div');
    document.body.appendChild(element);
    const style = window.getComputedStyle(element, null);
    expect(getComputedStyle(element)._values).toEqual(style._values);
    document.body.removeChild(element);
  });

  it('should throw an error if no element is passed', () => {
    expect(() => getComputedStyle()).toThrow(TypeError);
  });
});

describe('getEventWindow', () => {
  it('should get window object from event', () => {
    const event = new UIEvent('change', { view: window });
    expect(getEventWindow(event)).toBe(window);
  });
});

describe('getLeftmostOffset', () => {
  it('should return the leftmost offset of an element', () => {
    const grandParent = createMockElement('div', {
      marginLeft: 30,
      width: 200,
    });
    const parent = createMockElement('div', {
      marginLeft: 40,
      width: 150,
    });
    const child = createMockElement('div', {
      marginLeft: 50,
      width: 100,
    });

    parent.appendChild(child);
    grandParent.appendChild(parent);
    document.body.appendChild(grandParent);

    // The expected value is the sum of left offsets: 30 + 40 + 50 = 120
    expect(getLeftmostOffset(child)).toBe(30 + 40 + 50);
  });

  it('should return 0 if element is not an HTMLElement', () => {
    expect(getLeftmostOffset(null)).toBe(0);
  });
});

describe('getOwnerDocument', () => {
  it('should return the owner document of a node', () => {
    const div = createMockElement('div');
    expect(getOwnerDocument(div)).toBe(document);
  });

  it('should return document if node is not an element', () => {
    expect(getOwnerDocument(null)).toBe(document);
  });
});

describe('getOwnerWindow', () => {
  it('should return the owner window of a node', () => {
    const div = createMockElement('div');
    expect(getOwnerWindow(div)).toBe(window);
  });

  it('should return window if node is not an element', () => {
    expect(getOwnerWindow(null)).toBe(window);
  });
});

describe('getRelatedTarget', () => {
  it('should return the related target of an event', () => {
    const event = new FocusEvent('focus', {
      relatedTarget: createMockElement('div'),
    });
    expect(getRelatedTarget(event)).toBe(event.relatedTarget);
  });

  it('should return the active element if related target is not available', () => {
    const input = createMockElement('input');
    document.body.appendChild(input);
    input.focus();
    const event = new FocusEvent('focus');
    expect(getRelatedTarget(event)).toBe(document.activeElement);
    document.body.removeChild(input);
  });
});

describe('getTopmostOffset', () => {
  it('should return the topmost offset of an element', () => {
    const grandParent = createMockElement('div', {
      marginTop: 30,
      width: 200,
      height: 200,
    });
    const parent = createMockElement('div', {
      marginTop: 40,
      width: 200,
      height: 150,
    });
    const child = createMockElement('div', {
      marginTop: 50,
      width: 200,
      height: 100,
    });

    parent.appendChild(child);
    grandParent.appendChild(parent);
    document.body.appendChild(grandParent);

    // The expected value is the sum of top offsets: 30 + 40 + 50 = 120
    expect(getTopmostOffset(child)).toBe(30 + 40 + 50);
  });

  it('should return 0 if element is not an HTMLElement', () => {
    expect(getTopmostOffset(null)).toBe(0);
  });
});

describe('isElement', () => {
  it('should return true for a valid element', () => {
    const element = createMockElement('div');
    expect(isElement(element)).toBe(true);
  });

  it('should return false for a text node', () => {
    const textNode = document.createTextNode('text');
    expect(isElement(textNode)).toBe(false);
  });

  it('should return false for non-element values', () => {
    expect(isElement(null)).toBe(false);
    expect(isElement(undefined)).toBe(false);
    expect(isElement('string')).toBe(false);
    expect(isElement(123)).toBe(false);
    expect(isElement(true)).toBe(false);
    expect(isElement({})).toBe(false);
    expect(isElement([])).toBe(false);
  });
});

describe('isHTMLElement', () => {
  it('should return true for a valid HTML element', () => {
    const element = createMockElement('div');
    expect(isHTMLElement(element)).toBe(true);
  });

  it('should return false for a text node', () => {
    const textNode = document.createTextNode('text');
    expect(isHTMLElement(textNode)).toBe(false);
  });

  it('should return false for non-HTML element values', () => {
    expect(isHTMLElement(null)).toBe(false);
    expect(isHTMLElement(undefined)).toBe(false);
    expect(isHTMLElement('string')).toBe(false);
    expect(isHTMLElement(123)).toBe(false);
    expect(isHTMLElement(true)).toBe(false);
    expect(isHTMLElement({})).toBe(false);
    expect(isHTMLElement([])).toBe(false);
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
