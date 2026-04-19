import React, { useState } from 'react';
import { ensureArray } from 'ensure-type';
import {
  Box,
  Stack,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormInput,
  FormTextarea,
  FormErrorMessage,
  FormHelperText,
  FormCharacterCount,
} from '@tonic-ui/react';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    country: '',
    bio: '',
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
      case 'country': {
        return !value ? 'Please select your experience level' : '';
      }
      case 'bio': {
        const bioErrors = [];
        if (value.length < 10) {
          bioErrors.push('Bio must be at least 10 characters');
        }
        if (value.length > 200) {
          bioErrors.push('Bio must not exceed 200 characters');
        }
        return bioErrors;
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
      if (error && error.length > 0) {
        newErrors[key] = error; 
      }
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

          {/* Bio textarea with character validation */}
          <FormControl error={hasError('bio')}>
            <FormLabel>Bio</FormLabel>
            <FormTextarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself..."
              rows={4}
            />
            <FormErrorMessage errors={ensureArray(errors.bio)} />
            <Flex justifyContent="space-between">
              <FormHelperText>
                Write a brief bio (10-200 characters)
              </FormHelperText>
              <FormCharacterCount count={formData.bio.length} maxCount={200} />
            </Flex>
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
