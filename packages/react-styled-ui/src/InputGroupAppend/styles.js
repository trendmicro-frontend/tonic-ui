const notFirstChildStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const notLastChildStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const baseProps = {
  ml: -1,
  css: {
    '& > *:first-child': notFirstChildStyle,
    '&:not(:last-child) > *:first-child': notLastChildStyle,
  }
};

export {
  baseProps,
};
