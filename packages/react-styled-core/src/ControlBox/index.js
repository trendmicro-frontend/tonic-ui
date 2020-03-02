import styled from '@emotion/styled';
import css from '@styled-system/css';
import Box from '../Box';

const ControlBox = styled(Box)(
  ({
    type = 'checkbox',
    _hover,
    _invalid,
    _disabled,
    _focus,
    _checked,
    _indeterminate,
    _child = { opacity: 0 },
    _checkedAndChild = { opacity: 1 },
    _checkedAndDisabled,
    _checkedAndActive,
    _checkedAndFocus,
    _checkedAndHover,
    _indeterminateAndChild = { opacity: 1 },
    _indeterminateAndDisabled,
    _indeterminateAndActive,
    _indeterminateAndFocus,
    _indeterminateAndHover,
  }) => {
    const checkedAndDisabled = `input[type=${type}]:checked:disabled + &`,
      checkedAndActive = `input[type=${type}]:checked:active:not(:disabled):not(:focus) + &`,
      checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled):not(:focus) + &`,
      checkedAndFocus = `input[type=${type}]:checked:focus + &`,
      indeterminateAndDisabled = `input[type=${type}][aria-checked=mixed]:disabled + &`,
      indeterminateAndActive = `input[type=${type}][aria-checked=mixed]:active:not(:disabled):not(:focus) + &`,
      indeterminateAndHover = `input[type=${type}][aria-checked=mixed]:hover:not(:disabled):not(:focus) + &`,
      indeterminateAndFocus = `input[type=${type}][aria-checked=mixed]:focus + &`,
      disabled = `input[type=${type}]:disabled + &`,
      focus = `input[type=${type}]:focus + &`,
      hover = `input[type=${type}]:hover:not(:disabled):not(:checked):not(:focus) + &`,
      checked = `input[type=${type}]:checked + &`,
      indeterminate = `input[type=${type}][aria-checked=mixed] + &`,
      invalid = `input[type=${type}][aria-invalid=true] + &`;

    return css({
      [focus]: _focus,
      [hover]: _hover,
      [disabled]: _disabled,
      [invalid]: _invalid,

      [checkedAndDisabled]: _checkedAndDisabled,
      [checkedAndActive]: _checkedAndActive,
      [checkedAndFocus]: _checkedAndFocus,
      [checkedAndHover]: _checkedAndHover,
      '& > *': _child,
      [checked]: {
        ..._checked,
        '& > *': _checkedAndChild,
      },

      [indeterminateAndDisabled]: _indeterminateAndDisabled,
      [indeterminateAndActive]: _indeterminateAndActive,
      [indeterminateAndFocus]: _indeterminateAndFocus,
      [indeterminateAndHover]: _indeterminateAndHover,
      [indeterminate]: {
        ..._indeterminate,
        '& > *': _indeterminateAndChild,
      },
    });
  },
);

ControlBox.displayName = 'ControlBox';

ControlBox.defaultProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 120ms',
  flexShrink: '0',
  'aria-hidden': 'true',
};

export default ControlBox;
