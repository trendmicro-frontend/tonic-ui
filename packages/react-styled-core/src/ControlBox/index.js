import styled from '@emotion/styled';
import css from '@styled-system/css';
import Box from '../Box';

const ControlBox = styled(Box)(
  ({
    type = 'checkbox',
    _hover,
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
    const checkedAndDisabled = `input[type=${type}]:checked:disabled + &`;
    const checkedAndActive = `input[type=${type}]:checked:active:not(:disabled):not(:focus) + &`;
    const checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled):not(:focus) + &`;
    const checkedAndFocus = `input[type=${type}]:checked:focus + &`;
    const indeterminateAndDisabled = `input[type=${type}][data-indeterminate=true]:disabled + &`;
    const indeterminateAndActive = `input[type=${type}][data-indeterminate=true]:active:not(:disabled):not(:focus) + &`;
    const indeterminateAndHover = `input[type=${type}][data-indeterminate=true]:hover:not(:disabled):not(:focus) + &`;
    const indeterminateAndFocus = `input[type=${type}][data-indeterminate=true]:focus + &`;
    const disabled = `input[type=${type}]:disabled + &`;
    const focus = `input[type=${type}]:focus + &`;
    const hover = `input[type=${type}]:hover:not(:disabled):not(:checked):not(:focus) + &`;
    const checked = `input[type=${type}]:checked + &`;
    const indeterminate = `input[type=${type}][data-indeterminate=true] + &`;

    return css({
      [focus]: _focus,
      [hover]: _hover,
      [disabled]: _disabled,

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
