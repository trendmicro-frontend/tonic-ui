export const reflow = (node) => node && node?.scrollTop;

export const formatMs = ms => {
  return (ms > 0) ? `${Math.round(ms)}ms` : '';
};
