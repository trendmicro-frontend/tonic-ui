const notFirstChildStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const notLastChildStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const useInputGroupAppendStyle = () => {
  return {
    display: 'flex',
    ml: -1,
    css: {
      '& > *:first-of-type': notFirstChildStyle,
      '&:not(:last-child) > *:first-of-type': notLastChildStyle,
    }
  };
};

export {
  useInputGroupAppendStyle,
};
