/* @jest-environment jsdom */
import React, { useCallback, useState } from 'react';
import { render, screen } from '../../../test-utils/render';
import userEvent from '@testing-library/user-event';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormCharacterCount,
  FormInput,
} from '../index';

describe('Form Control ', () => {
  it('renders basic form control', () => {
    // Arrange
    const labelText = 'Username';
    const placeholder = 'Enter username';
    const helperText = 'Choose a unique username';

    // Act
    render(
      <FormControl>
        <FormLabel>{labelText}</FormLabel>
        <FormInput placeholder={placeholder} />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );

    // Assert
    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  describe('Form Label', () => {
    it('displays required indicator', () => {
      // Arrange
      const labelText = 'Email';
      const requiredIndicator = '*';

      // Act
      render(
        <FormControl>
          <FormLabel required>{labelText}</FormLabel>
          <FormInput placeholder="Enter email" />
        </FormControl>
      );

      // Assert
      expect(screen.getByText(requiredIndicator)).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('displays single error message', () => {
      // Arrange
      const errorMessage = 'Password is required';
      const errors = [errorMessage];

      // Act
      render(
        <FormControl error>
          <FormLabel>Password</FormLabel>
          <FormInput />
          <FormErrorMessage errors={errors} />
        </FormControl>
      );

      // Assert
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('displays multiple error messages as list', () => {
      // Arrange
      const errors = ['Error 1', 'Error 2', 'Error 3'];

      // Act
      render(
        <FormControl error>
          <FormLabel>Test</FormLabel>
          <FormInput />
          <FormErrorMessage errors={errors} />
        </FormControl>
      );

      // Assert
      expect(screen.getByRole('alert')).toBeInTheDocument();
      errors.forEach((error) => {
        expect(screen.getByText(error)).toBeInTheDocument();
      });
    });

    it('hides error messages when error=false', () => {
      // Arrange & Act
      render(
        <FormControl error={false}>
          <FormLabel>Email</FormLabel>
          <FormInput />
          <FormErrorMessage errors={['This field is required']} />
        </FormControl>
      );

      // Assert
      expect(
        screen.queryByText('This field is required')
      ).not.toBeInTheDocument();
    });

    it('handles empty errors prop', () => {
      // Arrange & Act
      render(
        <FormControl error>
          <FormLabel>Test</FormLabel>
          <FormInput />
          <FormErrorMessage />
        </FormControl>
      );

      // Assert
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('character count', () => {
    it('displays character count with specified max value', () => {
      // Arrange & Act
      render(
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <FormInput />
          <FormCharacterCount count={0} maxCount={100} />
        </FormControl>
      );

      // Assert
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('/100')).toBeInTheDocument();
    });

    it('displays character count with default max value', () => {
      // Arrange & Act
      render(
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <FormInput />
          <FormCharacterCount count={4} />
        </FormControl>
      );

      // Assert
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('/0')).toBeInTheDocument();
    });

    it('updates character count on input', async () => {
      // Arrange
      const user = userEvent.setup();
      const inputText = 'Hello';
      const expectedCount = '5';
      const maxLength = 100;

      const TestComponent = () => {
        const [value, setValue] = useState('');
        const handleChange = useCallback((e) => setValue(e.target.value), []);
        return (
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <FormInput
              value={value}
              onChange={handleChange}
            />
            <FormCharacterCount count={value.length} maxCount={maxLength} />
          </FormControl>
        );
      };

      render(<TestComponent />);
      const input = screen.getByRole('textbox');

      // Act
      await user.type(input, inputText);

      // Assert
      expect(screen.getByText(expectedCount)).toBeInTheDocument();
    });
  });

  it('handles disabled state', () => {
    render(
      <FormControl disabled>
        <FormLabel>Disabled Field</FormLabel>
        <FormInput />
      </FormControl>
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
