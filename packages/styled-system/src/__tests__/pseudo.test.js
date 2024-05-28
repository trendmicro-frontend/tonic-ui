import { pseudoClassSelector, pseudoElementSelector } from '@tonic-ui/styled-system/src';

describe('pseudo class selectors', () => {
  let testCount = 0;

  beforeEach(() => {
    const currentTestName = expect.getState().currentTestName;
    const mainTestTitle = 'pseudo class selectors';
    const selectorKey = currentTestName.slice(mainTestTitle.length).trim();
    if (pseudoClassSelector[selectorKey] !== undefined) {
      testCount++;
    }
  });

  afterAll(() => {
    // Ensure that pseudoClassSelector object exists and is not null
    expect(pseudoClassSelector).toBeTruthy();

    // Expected test count is equal to the number of selector functions
    const expectedTestCount = Object.keys(pseudoClassSelector).length;
    expect(testCount).toBe(expectedTestCount);
  });

  test('_active', () => {
    const activeSelector = pseudoClassSelector._active({ color: 'red' });
    expect(activeSelector).toEqual([
      ['&:active,&[data-active]', { color: 'red' }],
    ]);
  });

  test('_checked', () => {
    const checkedSelector = pseudoClassSelector._checked({ color: 'blue' });
    expect(checkedSelector).toEqual([
      ['&:checked,&[aria-checked=true],&[data-checked]', { color: 'blue' }],
    ]);
  });

  test('_disabled', () => {
    const disabledSelector = pseudoClassSelector._disabled({ color: 'gray' });
    expect(disabledSelector).toEqual([
      ['&:disabled,&:disabled:focus,&:disabled:hover,&[aria-disabled=true],&[aria-disabled=true]:focus,&[aria-disabled=true]:hover,&[data-disabled]', { color: 'gray' }],
    ]);
  });

  test('_empty', () => {
    const emptySelector = pseudoClassSelector._empty({ content: 'empty' });
    expect(emptySelector).toEqual([
      ['&:empty', { content: 'empty' }],
    ]);
  });

  test('_enabled', () => {
    const enabledSelector = pseudoClassSelector._enabled({ color: 'green' });
    expect(enabledSelector).toEqual([
      ['&:enabled,&:enabled:focus,&:enabled:hover', { color: 'green' }],
    ]);
  });

  test('_firstChild', () => {
    const firstChildSelector = pseudoClassSelector._firstChild({ fontWeight: 'bold' });
    expect(firstChildSelector).toEqual([
      ['&:first-child', { fontWeight: 'bold' }],
    ]);
  });

  test('_firstOfType', () => {
    const firstOfTypeSelector = pseudoClassSelector._firstOfType({ fontSize: '20px' });
    expect(firstOfTypeSelector).toEqual([
      ['&:first-of-type', { fontSize: '20px' }],
    ]);
  });

  test('_fullscreen', () => {
    const fullscreenSelector = pseudoClassSelector._fullscreen({ display: 'block' });
    expect(fullscreenSelector).toEqual([
      ['&:fullscreen', { display: 'block' }],
    ]);
  });

  test('_focus', () => {
    const focusSelector = pseudoClassSelector._focus({ outline: '2px solid blue' });
    expect(focusSelector).toEqual([
      ['&:focus,&[data-focus]', { outline: '2px solid blue' }],
    ]);
  });

  test('_focusActive', () => {
    const focusActiveSelector = pseudoClassSelector._focusActive({ outline: '2px solid red' });
    expect(focusActiveSelector).toEqual([
      ['&:focus:active', { outline: '2px solid red' }],
    ]);
  });

  test('_focusHover', () => {
    const focusHoverSelector = pseudoClassSelector._focusHover({ outline: '2px solid green' });
    expect(focusHoverSelector).toEqual([
      ['&:focus:hover', { outline: '2px solid green' }],
    ]);
  });

  test('_focusVisible', () => {
    const focusVisibleSelector = pseudoClassSelector._focusVisible({ outline: '2px solid blue' });
    expect(focusVisibleSelector).toEqual([
      ['&:focus-visible', { outline: '2px solid blue' }],
    ]);
  });

  test('_focusWithin', () => {
    const focusWithinSelector = pseudoClassSelector._focusWithin({ boxShadow: '0 0 5px rgba(0,0,0,0.5)' });
    expect(focusWithinSelector).toEqual([
      ['&:focus-within', { boxShadow: '0 0 5px rgba(0,0,0,0.5)' }],
    ]);
  });

  test('_hover', () => {
    const hoverSelector = pseudoClassSelector._hover({ color: 'purple' });
    expect(hoverSelector).toEqual([
      ['&:hover,&[data-hover]', { color: 'purple' }],
    ]);
  });

  test('_indeterminate', () => {
    const indeterminateSelector = pseudoClassSelector._indeterminate({ backgroundColor: 'yellow' });
    expect(indeterminateSelector).toEqual([
      ['&:indeterminate', { backgroundColor: 'yellow' }],
    ]);
  });

  test('_invalid', () => {
    const invalidSelector = pseudoClassSelector._invalid({ borderColor: 'red' });
    expect(invalidSelector).toEqual([
      ['&:invalid,&[aria-invalid=true]', { borderColor: 'red' }],
    ]);
  });

  test('_lastChild', () => {
    const lastChildSelector = pseudoClassSelector._lastChild({ border: '1px solid black' });
    expect(lastChildSelector).toEqual([
      ['&:last-child', { border: '1px solid black' }],
    ]);
  });

  test('_lastOfType', () => {
    const lastOfTypeSelector = pseudoClassSelector._lastOfType({ backgroundColor: 'lightgray' });
    expect(lastOfTypeSelector).toEqual([
      ['&:last-of-type', { backgroundColor: 'lightgray' }],
    ]);
  });

  test('_notFirstChild', () => {
    const notFirstChildSelector = pseudoClassSelector._notFirstChild({ opacity: 0.7 });
    expect(notFirstChildSelector).toEqual([
      ['&:not(:first-child)', { opacity: 0.7 }],
    ]);
  });

  test('_notFirstOfType', () => {
    const notFirstOfTypeSelector = pseudoClassSelector._notFirstOfType({ transform: 'scale(0.8)' });
    expect(notFirstOfTypeSelector).toEqual([
      ['&:not(:first-of-type)', { transform: 'scale(0.8)' }],
    ]);
  });

  test('_notLastChild', () => {
    const notLastChildSelector = pseudoClassSelector._notLastChild({ boxShadow: '0 0 5px rgba(0,0,0,0.5)' });
    expect(notLastChildSelector).toEqual([
      ['&:not(:last-child)', { boxShadow: '0 0 5px rgba(0,0,0,0.5)' }],
    ]);
  });

  test('_notLastOfType', () => {
    const notLastOfTypeSelector = pseudoClassSelector._notLastOfType({ border: '1px dashed blue' });
    expect(notLastOfTypeSelector).toEqual([
      ['&:not(:last-of-type)', { border: '1px dashed blue' }],
    ]);
  });

  test('_nthOfType', () => {
    const nthOfTypeSelector = pseudoClassSelector._nthOfType({ 'odd': { backgroundColor: 'lightblue' } });
    expect(nthOfTypeSelector).toEqual([
      ['&:nth-of-type(odd)', { backgroundColor: 'lightblue' }],
    ]);
  });

  test('_placeholderShown', () => {
    const placeholderShownSelector = pseudoClassSelector._placeholderShown({ color: 'lightgray' });
    expect(placeholderShownSelector).toEqual([
      ['&:placeholder-shown', { color: 'lightgray' }],
    ]);
  });

  test('_optional', () => {
    const optionalSelector = pseudoClassSelector._optional({ border: '2px dashed lightgray' });
    expect(optionalSelector).toEqual([
      ['&:optional', { border: '2px dashed lightgray' }],
    ]);
  });

  test('_readOnly', () => {
    const readOnlySelector = pseudoClassSelector._readOnly({ backgroundColor: 'lightyellow' });
    expect(readOnlySelector).toEqual([
      ['&:read-only,&[aria-readonly=true],&[data-readonly]', { backgroundColor: 'lightyellow' }],
    ]);
  });

  test('_required', () => {
    const requiredSelector = pseudoClassSelector._required({ border: '1px solid red' });
    expect(requiredSelector).toEqual([
      ['&:required', { border: '1px solid red' }],
    ]);
  });

  test('_selected', () => {
    const selectedSelector = pseudoClassSelector._selected({ backgroundColor: 'lightgreen' });
    expect(selectedSelector).toEqual([
      ['&[aria-selected=true],&[data-selected]', { backgroundColor: 'lightgreen' }],
    ]);
  });

  test('_valid', () => {
    const validSelector = pseudoClassSelector._valid({ borderColor: 'green' });
    expect(validSelector).toEqual([
      ['&[aria-invalid=false],&:valid', { borderColor: 'green' }],
    ]);
  });

  test('_visited', () => {
    const visitedSelector = pseudoClassSelector._visited({ color: 'gray' });
    expect(visitedSelector).toEqual([
      ['&:visited', { color: 'gray' }],
    ]);
  });

  afterAll(() => {
    // Expected test count is the number of selector functions
    const expectedTestCount = Object.keys(pseudoClassSelector).length;
    expect(testCount).toBe(expectedTestCount);
  });
});

describe('pseudo element selectors', () => {
  let testCount = 0;

  beforeEach(() => {
    const currentTestName = expect.getState().currentTestName;
    const mainTestTitle = 'pseudo element selectors';
    const selectorKey = currentTestName.slice(mainTestTitle.length).trim();
    if (pseudoElementSelector[selectorKey] !== undefined) {
      testCount++;
    }
  });

  afterAll(() => {
    // Ensure that pseudoElementSelector object exists and is not null
    expect(pseudoElementSelector).toBeTruthy();

    // Expected test count is equal to the number of selector functions
    const expectedTestCount = Object.keys(pseudoElementSelector).length;
    expect(testCount).toBe(expectedTestCount);
  });

  test('__after', () => {
    const afterSelector = pseudoElementSelector.__after({ content: '"Hello"' });
    expect(afterSelector).toEqual([['&::after', { content: '"Hello"' }]]);
  });

  test('__backdrop', () => {
    const backdropSelector = pseudoElementSelector.__backdrop({ opacity: 0.5 });
    expect(backdropSelector).toEqual([['&::backdrop', { opacity: 0.5 }]]);
  });

  test('__before', () => {
    const beforeSelector = pseudoElementSelector.__before({ content: '"World"' });
    expect(beforeSelector).toEqual([['&::before', { content: '"World"' }]]);
  });

  test('__cue', () => {
    const cueSelector = pseudoElementSelector.__cue({ color: 'blue' });
    expect(cueSelector).toEqual([['&::cue', { color: 'blue' }]]);
  });

  test('__firstLetter', () => {
    const firstLetterSelector = pseudoElementSelector.__firstLetter({ fontSize: '24px' });
    expect(firstLetterSelector).toEqual([['&::first-letter', { fontSize: '24px' }]]);
  });

  test('__firstLine', () => {
    const firstLineSelector = pseudoElementSelector.__firstLine({ fontWeight: 'bold' });
    expect(firstLineSelector).toEqual([['&::first-line', { fontWeight: 'bold' }]]);
  });

  test('__marker', () => {
    const markerSelector = pseudoElementSelector.__marker({ color: 'red' });
    expect(markerSelector).toEqual([['&::marker', { color: 'red' }]]);
  });

  test('__placeholder', () => {
    const placeholderSelector = pseudoElementSelector.__placeholder({ color: 'gray' });
    expect(placeholderSelector).toEqual([['&::placeholder', { color: 'gray' }]]);
  });

  test('__selection', () => {
    const selectionSelector = pseudoElementSelector.__selection({ background: 'yellow' });
    expect(selectionSelector).toEqual([['&::selection', { background: 'yellow' }]]);
  });
});
