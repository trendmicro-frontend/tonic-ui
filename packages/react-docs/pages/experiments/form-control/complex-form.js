import React, { useState, forwardRef } from 'react';
import { ensureArray } from 'ensure-type';
import { Box, Stack, Input, Button, Text } from '@tonic-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@/experiments/form-control';
import useFormControl from '@/experiments/form-control/useFormControl';

const FormInput = forwardRef((props, ref) => {
  const formContext = useFormControl();
  const { id, error, disabled, readOnly, errorId, helperId, countId } =
    formContext || {};

  const describedByIds = [];
  if (error) describedByIds.push(errorId);
  if (helperId) describedByIds.push(helperId);
  if (countId) describedByIds.push(countId);

  return (
    <Input
      ref={ref}
      id={id}
      aria-invalid={error}
      aria-describedby={
        describedByIds.length > 0 ? describedByIds.join(' ') : undefined
      }
      disabled={disabled}
      readOnly={readOnly}
      {...props}
    />
  );
});

FormInput.displayName = 'FormInput';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? 'Please enter a valid email address'
          : '';
      }
      case 'password': {
        const passwordErrors = [];
        if (value.length < 8) {
          passwordErrors.push('Password must be at least 8 characters');
        }
        if (!/[A-Z]/.test(value)) {
          passwordErrors.push('Must include uppercase letter');
        }
        if (!/[a-z]/.test(value)) {
          passwordErrors.push('Must include lowercase letter');
        }
        return passwordErrors;
      }
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const hasError = (fieldName) => {
    return (
      touched[fieldName] &&
      errors[fieldName] &&
      ensureArray(errors[fieldName]).length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error && error.length > 0) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(newErrors).length === 0) {
      alert('Form validated successfully!');
    }
  };

  return (
    <Box maxWidth="400px">
      <Text fontSize="xl" fontWeight="semibold" mb="6x">
        FormControl Validation Example
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing="5x">
          {/* Email with validation */}
          <FormControl error={hasError('email')}>
            <FormLabel required>Email Address</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
            <FormErrorMessage errors={ensureArray(errors.email)} />
            <FormHelperText>Used for login and notifications</FormHelperText>
          </FormControl>

          {/* Password with multiple validation rules */}
          <FormControl error={hasError('password')}>
            <FormLabel required>Password</FormLabel>
            <FormInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Create a password"
            />
            <FormErrorMessage errors={ensureArray(errors.password)} />
            <FormHelperText>
              Must be at least 8 characters with mixed case
            </FormHelperText>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            width="100%"
            mt="4x"
          >
            Validate Form
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default App;
