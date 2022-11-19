import * as moduleExport from '@tonic-ui/utils/src';

test('should match expected exports', () => {
  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    // assertion
    'isBlankString',
    'isEmptyArray',
    'isEmptyObject',
    'isNullOrUndefined',
    'isWhitespace',

    // dom
    'canUseDOM',
    'contains',
    'getActiveElement',
    'getComputedStyle',
    'getEventWindow',
    'getOwnerDocument',
    'getOwnerWindow',
    'getRelatedTarget',
    'isElement',
    'isHTMLElement',
    'normalizeKeyboardEventKey',
    'reflow',

    // dom-query
    'getAllFocusable',

    // shared
    'ariaAttr',
    'callAll',
    'callEventHandlers',
    'dataAttr',
    'isFunction',
    'noop',
    'once',
    'runIfFn',
    'warnDeprecatedProps',
    'warnRemovedProps',

    // transition
    'createTransitionStyle',
    'getEnterTransitionProps',
    'getExitTransitionProps',
    'transitionDuration',
    'transitionEasing',
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
