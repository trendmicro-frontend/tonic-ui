import { useColorStyle } from '@tonic-ui/react';
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
  const [colorStyle] = useColorStyle();
  return {
    color: colorStyle.color.error,
    display: 'inline',
    ml: '1x',
  };
};

const useFormHelperTextStyle = () => {
  const [colorStyle] = useColorStyle();
  const { orientation } = useFormControl() || {};

  const styles = {
    color: colorStyle.color.secondary,
    fontSize: 'sm',
  };

  if (orientation === 'horizontal') {
    styles.gridColumn = '2';
  }

  return styles;
};

const useFormErrorMessageStyle = () => {
  const [colorStyle] = useColorStyle();
  const { orientation } = useFormControl() || {};

  const styles = {
    color: colorStyle.color.error,
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
  const [colorStyle] = useColorStyle();

  return {
    lengthColor: isOverLimit
      ? colorStyle.color.error
      : colorStyle.color.secondary,
    maxColor: colorStyle.color.secondary,
  };
};

/**
 * Generates style properties for the character count element in a form control.
 *
 * - If the form control orientation is 'horizontal', sets `gridColumn` to '2'
 *   to maintain layout consistency when there is no FormHelperText / FormErrorMessage.
 *
 * @returns {Object} Style properties for the character count element.
 */
const useFormCharacterCountStyle = () => {
  const { orientation } = useFormControl() || {};

  const styles = {
    fontSize: 'sm',
    justifyContent: 'flex-end',
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
