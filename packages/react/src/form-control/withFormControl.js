import { forwardRef } from 'react';
import useFormControl from './useFormControl';

/**
 * Default mapper that handles most common use cases
 */
const defaultMapper = (context) => ({
  disabled: context.disabled,
  error: context.error,
  readOnly: context.readOnly,
});

/**
 * Higher-order component that injects FormControlContext props into a component.
 * @param {React.ComponentType} Component - The component to wrap
 * @param {Function} [mapContextToProps] - Function to map context to props
 * @returns {React.ComponentType} Enhanced component with injected props
 */
const withFormControl = (Component, mapContextToProps = defaultMapper) => {
  const WrappedComponent = forwardRef((props, ref) => {
    const context = useFormControl();

    let injectedProps = {};

    if (context) {
      // Use mapper to get basic props
      injectedProps = mapContextToProps(context) || {};

      // Add accessibility props
      injectedProps.id = context.fieldId;

      const describedBy = [
        context.formErrorMessageId,
        context.formHelperTextId,
        context.formCharacterCountId,
      ].filter(Boolean);

      if (describedBy.length > 0) {
        injectedProps['aria-describedby'] = describedBy.join(' ');
      }
    }

    return <Component ref={ref} {...injectedProps} {...props} />;
  });

  WrappedComponent.displayName = `withFormControl(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default withFormControl;
