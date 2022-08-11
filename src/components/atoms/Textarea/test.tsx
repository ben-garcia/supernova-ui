import React from 'react';

import { a11yTest, fireEvent, mockMatchMedia, render } from '@testUtils';
import Textarea from '.';

describe('<Textarea />', () => {
  beforeAll(() => mockMatchMedia());

  const label = 'Testing in progress';

  it('should pass a11y tests', async () => {
    await a11yTest(<Textarea label={label} />);
  });

  it('should pass a11y tests when floating label', async () => {
    await a11yTest(<Textarea label={label} />);
  });

  it('should render', () => {
    const { container } = render(<Textarea label={label} />);

    expect(container).toBeInTheDocument();
  });

  it('should render as an textarea', () => {
    const { getByLabelText } = render(<Textarea label={label} />);
    const result = getByLabelText(label);

    expect(result.nodeName).toBe('TEXTAREA');
  });

  it('should call the onChange handler', () => {
    const mockOnClickHandler = jest.fn();
    const { getByLabelText } = render(
      <Textarea label={label} onChange={mockOnClickHandler} />
    );
    const result = getByLabelText(label);

    fireEvent.change(result, {
      target: {
        value: 'test',
      },
    });

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });
});
