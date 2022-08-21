/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import { TextInput } from '@atoms';
import { FormControl, FormErrorMessage, FormHelperText } from '@molecules';
import { a11yTest, render } from '@testUtils';

import { FormControlProps } from './types';

describe('<FormControl />', () => {
  const errorMessage = 'error message';
  const helperText = 'helper text';
  const label = 'testing label';
  const FormControlTest = (props: Omit<FormControlProps, 'children'>) => {
    return (
      <FormControl {...props}>
        <TextInput data-testid="text-input" label={label} />
        <FormHelperText data-testid="helper-text">{helperText}</FormHelperText>
        <FormErrorMessage data-testid="error-message">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<FormControlTest />);
  });

  it('should render as fieldset when passing tag prop', () => {
    const { getByRole } = render(<FormControlTest tag="fieldset" />);
    const result = getByRole('group');

    expect(result.nodeName).toBe('FIELDSET');
  });

  it('should only render error message when isInvalid prop is true', () => {
    const { rerender, getByTestId } = render(<FormControlTest isInvalid />);
    const errorMessageElement = getByTestId('error-message');

    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveTextContent(errorMessage);

    rerender(<FormControlTest isInvalid={false} />);

    expect(errorMessageElement).not.toBeInTheDocument();
  });

  it('should render with correct aria attributes', () => {
    const { rerender, getByTestId } = render(<FormControlTest />);
    const inputElement = getByTestId('text-input');
    let inputElementIds = inputElement.getAttribute('aria-describedby');
    let helperTextId = getByTestId('helper-text').getAttribute('id');

    expect(inputElementIds).toBe(helperTextId);

    rerender(<FormControlTest isInvalid />);

    const errorMessageElement = getByTestId('error-message');

    helperTextId = getByTestId('helper-text').getAttribute('id');
    inputElementIds = getByTestId('text-input').getAttribute(
      'aria-describedby'
    );

    expect(inputElementIds).toBe(
      `${errorMessageElement.getAttribute('id')} ${helperTextId}`
    );
    expect(errorMessageElement).toHaveAttribute('aria-live', 'polite');
    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
  });
});
