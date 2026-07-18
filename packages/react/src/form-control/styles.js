import useFormControl from './useFormControl';

const useFormLabelStyle = () => {
  const { orientation } = useFormControl() || {};

  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
  };

  if (orientation === 'horizontal') {
    styles.alignSelf = 'center';
  }

  return styles;
};

const useFormLabelRequiredStyle = () => {
  return {
    color: 'error.text',
    display: 'inline',
    ml: '1x',
  };
};

const useFormHelperTextStyle = () => {
  const { orientation } = useFormControl() || {};

  const styles = {
    color: 'text.secondary',
    fontSize: 'sm',
  };

  if (orientation === 'horizontal') {
    styles.gridColumn = '2';
  }

  return styles;
};

const useFormErrorMessageStyle = () => {
  const { orientation } = useFormControl() || {};

  const styles = {
    color: 'error.text',
    fontSize: 'sm',
  };

  if (orientation === 'horizontal') {
    styles.gridColumn = '2';
  }

  return styles;
};

const useFormErrorMessageListStyle = () => {
  return {
    margin: 0,
    paddingLeft: '6x',
    listStyleType: 'disc',
  };
};

const useFormCharacterCountColors = ({ isOverLimit = false } = {}) => {
  return {
    lengthColor: isOverLimit ? 'error.text' : 'text.secondary',
    maxColor: 'text.secondary',
  };
};

/**
 * Generates style properties for the character count element in a form control.
 *
 * - If the form control orientation is 'horizontal', sets `gridColumn` to '2'
 *   to maintain layout consistency when there is no FormHelperText / FormErrorMessage.
 *
 * @returns {{ fontSize: string, marginLeft: string, gridColumn?: string }} Style properties for the character count element.
 */
const useFormCharacterCountStyle = () => {
  const { orientation } = useFormControl() || {};

  const styles = {
    fontSize: 'sm',
    marginLeft: 'auto',
  };

  if (orientation === 'horizontal') {
    styles.gridColumn = '2';
  }

  return styles;
};

const useFormControlStyle = ({ orientation } = {}) => {
  if (orientation === 'horizontal') {
    return {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridRowGap: '1x',
      gridColumnGap: '3x',
      alignItems: 'center',
    };
  }

  return {
    gap: '1x',
  };
};

export {
  useFormLabelStyle,
  useFormLabelRequiredStyle,
  useFormHelperTextStyle,
  useFormErrorMessageStyle,
  useFormErrorMessageListStyle,
  useFormCharacterCountColors,
  useFormCharacterCountStyle,
  useFormControlStyle,
};
