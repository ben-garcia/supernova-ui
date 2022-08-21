import React from 'react';

import { a11yTest, fireEvent, render } from '@testUtils';
import Button from '.';

describe('<Button />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Button>Submit</Button>);
  });

  it('should render', () => {
    const { container } = render(<Button>Submit</Button>);

    expect(container).toBeInTheDocument();
  });

  it('should render as a button with correct text', () => {
    const buttonText = 'Submit';
    const { getByText } = render(<Button>{buttonText}</Button>);
    const result = getByText(buttonText);

    expect(result.nodeName).toBe('BUTTON');
    expect(result.textContent).toBe(buttonText);
  });

  it('should call the onClick handler', () => {
    const mockOnClickHandler = jest.fn();
    const buttonText = 'Submit';
    const { getByText } = render(
      <Button onClick={mockOnClickHandler}>{buttonText}</Button>
    );

    fireEvent.click(getByText(buttonText));

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
