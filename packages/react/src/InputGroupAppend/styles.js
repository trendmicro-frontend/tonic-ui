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
    '& > *:first-of-type': notFirstChildStyle,
    '&:not(:last-child) > *:first-of-type': notLastChildStyle,
  }
};

export {
  baseProps,
};
