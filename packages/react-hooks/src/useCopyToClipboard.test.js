import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useCopyToClipboard from './useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
  const originalClipboard = global.navigator.clipboard;

  beforeEach(() => {
    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(data => clipboardData = data),
      readText: jest.fn(() => clipboardData),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  afterAll(() => {
    global.navigator.clipboard = originalClipboard;
  });

  it('should be defined', () => {
    expect(useCopyToClipboard).toBeDefined();
  });

  it('should pass a value to copy to clipboard', async () => {
    const testValue = 'test';
    const { result } = renderHook(() => useCopyToClipboard());
    let [value, copyToClipboard] = result.current;
    expect(value).toBeUndefined();
    await act(async () => {
      const ok = await copyToClipboard(testValue);
      expect(ok).toBe(true);
    });
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(testValue);
    [value] = result.current;
    expect(value).toBe(testValue);
  });

  it('should console error if clipboard is not supported', async () => {
    // Make clipboard not supported
    global.navigator.clipboard = undefined;

    const testValue = 'test';
    const { result } = renderHook(() => useCopyToClipboard());
    let [value, copyToClipboard] = result.current;
    expect(value).toBeUndefined();
    await act(async () => {
      const ok = await copyToClipboard(testValue);
      expect(ok).toBe(false);
    });
    expect(consoleErrorSpy).toBeCalled();
    [value] = result.current;
    expect(value).toBeUndefined();
  });

  it('should console error if clipboard write failed', async () => {
    // Make clipboard write failed
    global.navigator.clipboard.writeText = jest.fn(() => { throw new Error(); });

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
