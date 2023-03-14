import React from 'react';

import { a11yTest, fireEvent, render } from '@testUtils';
import Button from '.';

describe('<Button />', () => {
  const buttonText = 'Submit';
  it('should pass a11y tests', async () => {
    await a11yTest(<Button>Submit</Button>);
  });

  it('should render', () => {
    const { container } = render(<Button>Submit</Button>);

    expect(container).toBeInTheDocument();
  });

  it('should render with correct text', () => {
    const { getByText } = render(<Button>{buttonText}</Button>);
    const result = getByText(buttonText);

    expect(result.textContent).toBe(buttonText);
  });

  it('should render loadingText when isLoading is true', () => {
    const loadingText = 'loading...';
    const { queryByText, rerender } = render(
      <Button loadingText={loadingText} isLoading={false}>
        {buttonText}
      </Button>
    );
    let text = queryByText(loadingText);

    expect(text).not.toBeInTheDocument();

    rerender(
      <Button isLoading loadingText={loadingText}>
        {buttonText}
      </Button>
    );

    text = queryByText(loadingText);

    expect(text).toBeInTheDocument();
  });

  it('should call the onClick handler', () => {
    const mockOnClickHandler = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClickHandler}>{buttonText}</Button>
    );

    fireEvent.click(getByText(buttonText));

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
