import React from 'react';

import { a11yTest, fireEvent, render } from '@testUtils';
import Checkbox from '.';

describe('<Checkbox />', () => {
  const label = 'Testing in progress';

  it('should pass a11y tests', async () => {
    await a11yTest(<Checkbox label={label} />);
  });

  it('should render', () => {
    const { container } = render(<Checkbox label={label} />);

    expect(container).toBeInTheDocument();
  });

  it('should render as an input', () => {
    const { getByLabelText } = render(<Checkbox label={label} />);
    const result = getByLabelText(label);

    expect(result.nodeName).toBe('INPUT');
  });

  it('should render with checked state as false by default', () => {
    const { getByLabelText } = render(<Checkbox label={label} />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();
  });

  it('should render with checked state as true with isChecked prop', () => {
    const { getByLabelText } = render(<Checkbox label={label} isChecked />);
    const result = getByLabelText(label);

    expect(result).toBeChecked();
  });

  it('should call the onChange handler', () => {
    const mockOnClickHandler = jest.fn();
    const { getByLabelText } = render(
      <Checkbox label={label} onChange={mockOnClickHandler} />
    );
    const result = getByLabelText(label);

    fireEvent.click(result, {
      checked: true,
    });

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
  });

  it('should not change state when disabled', () => {
    const TestCheckbox = () => {
      const [check, setCheck] = React.useState(false);
      const changeHandler = () => setCheck(true);
      return (
        <Checkbox
          label={label}
          isChecked={check}
          isDisabled
          onChange={changeHandler}
        />
      );
    };
    const { getByLabelText } = render(<TestCheckbox />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();

    fireEvent.click(result, {
      checked: true,
    });

    expect(result).not.toBeChecked();
  });

  it('should change state when clicked', () => {
    const TestCheckbox = () => {
      const [check, setCheck] = React.useState(false);
      const changeHandler = () => setCheck(true);
      return (
        <Checkbox label={label} isChecked={check} onChange={changeHandler} />
      );
    };
    const { getByLabelText } = render(<TestCheckbox />);
    const result = getByLabelText(label);

    expect(result).not.toBeChecked();

    fireEvent.click(result);

    expect(result).toBeChecked();
  });
});
