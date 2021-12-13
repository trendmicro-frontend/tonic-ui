import background from './background';

test('returns background styles', () => {
  const style = background({
    background: 'tomato',
    backgroundAttachment: 'fixed',
    backgroundClip: 'border-box',
    backgroundColor: 'gold',
    backgroundImage: 'url(kitten.gif)',
    backgroundPosition: 'center',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  });
  expect(style).toEqual({
    background: 'tomato',
    backgroundAttachment: 'fixed',
    backgroundClip: 'border-box',
    backgroundColor: 'gold',
    backgroundImage: 'url(kitten.gif)',
    backgroundPosition: 'center',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  });
});

test('returns background styles using shorthand props', () => {
  const style = background({
    bg: 'tomato',
    bgAttachment: 'fixed',
    bgClip: 'border-box',
    bgColor: 'gold',
    bgImage: 'url(kitten.gif)',
    bgPosition: 'center',
    bgPositionX: 'center',
    bgPositionY: 'center',
    bgRepeat: 'no-repeat',
    bgSize: 'contain',
  });
  expect(style).toEqual({
    background: 'tomato',
    backgroundAttachment: 'fixed',
    backgroundClip: 'border-box',
    backgroundColor: 'gold',
    backgroundImage: 'url(kitten.gif)',
    backgroundPosition: 'center',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  });
});
