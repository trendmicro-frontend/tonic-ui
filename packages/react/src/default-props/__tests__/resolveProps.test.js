import resolveProps from '../resolveProps';

describe('resolveProps', () => {
  it('use default props if no props', () => {
    const defaultProps = { foo: 'foo' };
    const props = {};
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: 'foo',
    });
  });

  it('use props if defined', () => {
    const defaultProps = { foo: 'foo' };
    const props = { foo: 'bar' };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: 'bar',
    });
  });

  it('merge extra props', () => {
    const defaultProps = { foo: 'foo' };
    const props = { foo: 'bar', bar: 'bar' };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: 'bar',
      bar: 'bar',
    });
  });

  it('use default props if prop value is undefined', () => {
    const defaultProps = { foo: 'foo' };
    const props = { foo: undefined };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: 'foo',
    });
  });

  it('use props if default value is undefined', () => {
    const defaultProps = { foo: undefined };
    const props = { foo: 'bar' };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: 'bar',
    });
  });

  it('null is a considered a valid value', () => {
    const defaultProps = { foo: 'foo' };
    const props = { foo: null };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: null,
    });
  });

  it('"" is a considered a valid value', () => {
    const defaultProps = { foo: 'foo' };
    const props = { foo: '' };
    expect(resolveProps(defaultProps, props)).toEqual({
      foo: '',
    });
  });

  it('merge `slots` and `slotProps` props', () => {
    const defaultProps = {
      slots: {
        input: 'input',
      },
      slotProps: {
        input: {
          className: 'input',
          style: {
            fontSize: 'sm',
          },
        },
      },
    };
    const props = {
      slots: {
        root: 'root',
      },
      slotProps: {
        root: {
          className: 'root',
        },
        input: {
          style: {
            color: 'red',
          },
        },
      },
    };

    expect(resolveProps(defaultProps, props)).toEqual({
      slots: {
        root: 'root',
        input: 'input',
      },
      slotProps: {
        root: {
          className: 'root',
        },
        input: {
          className: 'input',
          style: {
            color: 'red',
          },
        },
      },
    });
  });

  it('should not merge props that are not intended', () => {
    expect(
      resolveProps(
        { notTheSlotProps: { style: { color: 'red' } } },
        { notTheSlotProps: { className: 'input' } },
      ),
    ).toEqual({
      notTheSlotProps: { className: 'input' },
    });
  });
});
