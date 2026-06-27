import * as moduleExport from '@tonic-ui/utils/src';

test('should match expected exports', () => {
  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    // assertion
    'isBlankString',
    'isEmptyArray',
    'isEmptyObject',
    'isFunction',
    'isNullish',
    'isNullOrUndefined',
    'isObject',
    'isPlainObject',
    'isWhitespace',

    // dom
    'canUseDOM',
    'contains',
    'getActiveElement',
    'getComputedStyle',
    'getEventWindow',
    'getLeftmostOffset',
    'getOwnerDocument',
    'getOwnerWindow',
    'getRelatedTarget',
    'getTopmostOffset',
    'isElement',
    'isHTMLElement',
    'normalizeKeyboardEventKey',
    'reflow',

    // dom-query
    'getAllFocusable',

    // resolveTheme
    'resolveTheme',

    // shared
    'ariaAttr',
    'callAll',
    'callEventHandlers',
    'dataAttr',
    'get',
    'merge',
    'noop',
    'once',
    'runIfFn',
    'warnDeprecatedProps',
    'warnRemovedProps',

    // toCSSVariable
    'toCSSVariable',

    // transition
    'createTransitionStyle',
    'getEnterTransitionProps',
    'getExitTransitionProps',
    'transitionDuration',
    'transitionEasing',
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
