const notFirstChildStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const notLastChildStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const baseProps = {
  mr: -1,
  css: {
    '& > *:first-child': notLastChildStyle,
    '&:not(:first-child) > *:first-child': notFirstChildStyle,
  },
};

export {
  baseProps,
};
