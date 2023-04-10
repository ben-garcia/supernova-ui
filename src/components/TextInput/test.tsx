import React from 'react';

import { TextInput, UserIcon } from '@components';
import { a11yTest, fireEvent, render } from '@test-utils';

describe('<TextInput />', () => {
  const label = 'Testing in progress';

  it('should pass a11y tests', async () => {
    await a11yTest(<TextInput label={label} />);
  });

  it('should pass a11y tests when floating label', async () => {
    await a11yTest(<TextInput label={label} />);
  });

  it('should render', () => {
    const { container } = render(<TextInput label={label} />);

    expect(container).toBeInTheDocument();
  });

  it('should render as an input', () => {
    const { getByLabelText } = render(<TextInput label={label} />);
    const result = getByLabelText(label);

    expect(result.nodeName).toBe('INPUT');
  });

  it('should render with leftIcon', () => {
    const { container } = render(
      <TextInput label={label} leftIcon={<UserIcon />} />
    );

    expect(container).toBeInTheDocument();
  });

  it('should render with rightIcon', () => {
    const { container } = render(
      <TextInput label={label} rightIcon={<UserIcon />} />
    );

    expect(container).toBeInTheDocument();
  });

  it('should call the onChange handler', () => {
    const mockOnClickHandler = jest.fn();
    const { getByLabelText } = render(
      <TextInput label={label} onChange={mockOnClickHandler} />
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
