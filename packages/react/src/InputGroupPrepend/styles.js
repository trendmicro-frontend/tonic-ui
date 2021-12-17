const notFirstChildStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const notLastChildStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const useInputGroupPrependStyle = () => {
  return {
    display: 'flex',
    mr: -1,
    css: {
      '& > *:first-of-type': notLastChildStyle,
      '&:not(:first-of-type) > *:first-of-type': notFirstChildStyle,
    },
  };
};

export {
  useInputGroupPrependStyle,
};
