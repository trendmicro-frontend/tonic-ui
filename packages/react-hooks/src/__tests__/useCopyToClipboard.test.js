import { act, renderHook } from '@testing-library/react';
import { useCopyToClipboard } from '..';

describe('useCopyToClipboard', () => {
  const originalClipboard = global.navigator.clipboard;

  beforeEach(() => {
    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(data => {
        clipboardData = data;
        return Promise.resolve(clipboardData);
      }),
      readText: jest.fn(() => clipboardData),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  afterAll(() => {
    global.navigator.clipboard = originalClipboard;
  });

  it('should be defined', () => {
    expect(useCopyToClipboard).toBeDefined();
  });

  it('should copy a value to clipboard', async () => {
    const testValue = 'test';
    const { result } = renderHook(() => useCopyToClipboard());
    let [value, copyToClipboard] = result.current;
    expect(value).toBeUndefined();
    const ok = await act(async () => {
      const value = await copyToClipboard(testValue);
      return value;
    });
    expect(ok).toBe(true);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(testValue);
    [value] = result.current;
    expect(value).toBe(testValue);
  });

  it('should console error if clipboard not supported', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // clipboard not supported
    global.navigator.clipboard = undefined;

    const testValue = 'test';
    const { result } = renderHook(() => useCopyToClipboard());
    let [value, copyToClipboard] = result.current;
    expect(value).toBeUndefined();
    const ok = await act(async () => {
      const value = await copyToClipboard(testValue);
      return value;
    });
    expect(ok).toBe(false);
    expect(consoleErrorSpy).toBeCalled();
    [value] = result.current;
    expect(value).toBeUndefined();
  });

  it('should console error if clipboard write failed', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // clipboard write failed
    global.navigator.clipboard.writeText = jest.fn(() => {
      throw new Error();
    });

    const testValue = 'test';
    const { result } = renderHook(() => useCopyToClipboard());
    let [value, copyToClipboard] = result.current;
    expect(value).toBeUndefined();
    await act(async () => {
      const ok = await copyToClipboard(testValue);
      expect(ok).toBe(false);
    });
    expect(consoleErrorSpy).toBeCalled();
    expect(global.navigator.clipboard.writeText).toBeCalled();
    [value] = result.current;
    expect(value).toBeUndefined();
  });
});
