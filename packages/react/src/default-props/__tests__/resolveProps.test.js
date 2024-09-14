import resolveProps from '../resolveProps';

describe('resolveProps', () => {
  it('use default props if no props', () => {
    expect(resolveProps({ foo: 'foo' }, {})).toEqual({
      foo: 'foo',
    });
  });

  it('use props if defined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar' })).toEqual({
      foo: 'bar',
    });
  });

  it('merge extra props', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: 'bar', bar: 'bar' })).toEqual({
      foo: 'bar',
      bar: 'bar',
    });
  });

  it('use default props if prop value is undefined', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: undefined })).toEqual({
      foo: 'foo',
    });
  });

  it('use props if default value is undefined', () => {
    expect(resolveProps({ foo: undefined }, { foo: 'bar' })).toEqual({
      foo: 'bar',
    });
  });

  it('null is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: null })).toEqual({
      foo: null,
    });
  });

  it('"" is a considered a valid value', () => {
    expect(resolveProps({ foo: 'foo' }, { foo: '' })).toEqual({
      foo: '',
    });
  });

  it('merge `slots` and `slotProps` props', () => {
    expect(
      resolveProps(
        {
          slots: {
            input: 'input',
          },
          slotProps: {
            input: {
              className: 'input',
            },
          },
        },
        {
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
        },
      ),
    ).toEqual({
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
