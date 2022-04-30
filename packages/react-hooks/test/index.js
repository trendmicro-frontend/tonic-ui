import * as moduleExport from '../src';

test('should match expected exports', () => {
  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    'useConst',
    'useCopyToClipboard',
    'useEffectOnce',
    'useEffectOnceWhen',
    'useEventCallback',
    'useEventListener',
    'useHydrated',
    'useIsomorphicEffect',
    'useLatest', // deprecated: replaced by useLatestRef
    'useLatestRef',
    'useMediaQuery',
    'useOnce',
    'useOnceWhen',
    'useOutsideClick',
    'usePrevious',
    'useToggle',
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
