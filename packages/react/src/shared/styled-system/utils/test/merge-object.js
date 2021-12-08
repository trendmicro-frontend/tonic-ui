import mergeObject from '../merge-object';

test('deeply merges', () => {
  const result = mergeObject(
    {
      hello: 'hi',
      media: {
        howdy: 'ho',
      },
    },
    {
      beep: 'boop',
      media: {
        bleep: 'bloop',
      },
    }
  );
  expect(result).toEqual({
    hello: 'hi',
    beep: 'boop',
    media: {
      howdy: 'ho',
      bleep: 'bloop',
    },
  });
});
