import { getWidth } from './utils';

describe('getWidth', () => {
  test('no scale', () => {
    expect(getWidth('1x')).toEqual('1x');
    expect(getWidth(0)).toEqual('0%');
    expect(getWidth(0.5)).toEqual('50%');
    expect(getWidth(1)).toEqual('100%');
    expect(getWidth(2)).toEqual(2);
  });

  test('with scale', () => {
    const scale = {
      0: '0',
      '1x': '.25rem',
      '2x': '.5rem',
      '3x': '.75rem',
      '4x': '1rem',
    };

    expect(getWidth('auto', scale)).toEqual('auto');
    expect(getWidth('1rem', scale)).toEqual('1rem');
    expect(getWidth('1x', scale)).toEqual('.25rem');
    expect(getWidth(0, scale)).toEqual('0');
    expect(getWidth(0.5, scale)).toEqual('50%');
    expect(getWidth(1, scale)).toEqual('100%');
    expect(getWidth(2, scale)).toEqual(2);
  });
});
