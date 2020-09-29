const breakpoints = [
  '320px',
  '640px',
  '1024px',
  '1280px',
  '1680px',
];
// @media screen and (min-width: 320px)
// @media screen and (min-width: 640px)
// @media screen and (min-width: 1024px)
// @media screen and (min-width: 1280px)
// @media screen and (min-width: 1680px)

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints['2xl'] = breakpoints[4];

export default breakpoints;
