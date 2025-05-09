import React from 'react';

import { Radio } from '@components';
import { a11yTest, fireEvent, render } from '@test-utils';

describe('<Radio />', () => {
  const label = 'Testing in progress';

  it('should pass a11y tests', async () => {
    await a11yTest(<Radio label={label} />);
  });

  it('should render', () => {
    const { container } = render(<Radio label={label} />);

    expect(container).toBeInTheDocument();
  });

  it('should render as an input', () => {
    const { getByLabelText } = render(<Radio label={label} />);
    const result = getByLabelText(label);

    expect(result.nodeName).toBe('INPUT');
  });

  it('should render with checked state as false by default', () => {
    const { getByLabelText } = render(<Radio label={label} />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();
  });

  it('should render with checked state as true with isChecked prop', () => {
    const { getByLabelText } = render(<Radio label={label} isChecked />);
    const result = getByLabelText(label);

    expect(result).toBeChecked();
  });

  it('should call the onChange handler', () => {
    const mockOnClickHandler = jest.fn();
    const { getByLabelText } = render(
      <Radio label={label} onChange={mockOnClickHandler} />
    );
    const result = getByLabelText(label);

    fireEvent.click(result, {
      checked: true,
    });

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not change state when disabled', () => {
    function TestRadio() {
      const [check, setCheck] = React.useState(false);
      const changeHandler = () => setCheck(true);
      return (
        <Radio
          label={label}
          isChecked={check}
          isDisabled
          onChange={changeHandler}
        />
      );
    }
    const { getByLabelText } = render(<TestRadio />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();

    fireEvent.click(result, {
      checked: true,
    });

    expect(result).not.toBeChecked();
  });

  it('should change state when clicked', () => {
    function TestRadio() {
      const [check, setCheck] = React.useState(false);
      const changeHandler = () => setCheck(true);
      return <Radio label={label} isChecked={check} onChange={changeHandler} />;
    }
    const { getByLabelText } = render(<TestRadio />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();

    fireEvent.click(result);

    expect(result).toBeChecked();
  });
});
