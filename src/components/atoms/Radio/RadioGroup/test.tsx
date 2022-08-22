import React from 'react';

import { a11yTest, fireEvent, render } from '@testUtils';

import { Radio, RadioGroup } from '@atoms';

describe('<GroupRadio />', () => {
  const TestRadioGroup = () => {
    const [value, setValue] = React.useState('one');
    return (
      <RadioGroup
        data-testid="radiogroup"
        defaultValue={value}
        name="testing"
        onChange={setValue}
      >
        <Radio label="one" value="one" />
      </RadioGroup>
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<TestRadioGroup />);
  });

  it('should render', () => {
    const { container } = render(<TestRadioGroup />);

    expect(container).toBeInTheDocument();
  });

  it('should render with the correct role of radiogroup', () => {
    const { getByTestId } = render(<TestRadioGroup />);
    const result = getByTestId('radiogroup');
    expect(result).toHaveAttribute('role', 'radiogroup');
  });

  it('should render with the correct Radio checked', () => {
    const { getByLabelText } = render(<TestRadioGroup />);
    const result = getByLabelText('one');
    expect(result).toBeChecked();
  });

  it('should render with no Radio checked when omitting defaultValue prop', () => {
    const RadioGroupTest = () => {
      // @ts-ignore
      // eslint-disable-next-line
      const [_, setValue] = React.useState('one');
      return (
        <RadioGroup name="testing" onChange={setValue}>
          <Radio label="one" value="one" />
        </RadioGroup>
      );
    };
    const { getByLabelText } = render(<RadioGroupTest />);
    const result = getByLabelText('one');
    expect(result).not.toBeChecked();
  });

  it('should manage state for uncontrolled children', () => {
    const RadioGroupTest = () => {
      return (
        <RadioGroup name="testing" defaultValue="two">
          <Radio label="one" value="one" />
          <Radio label="two" value="two" />
          <Radio label="three" value="three" />
        </RadioGroup>
      );
    };
    const { getByLabelText } = render(<RadioGroupTest />);
    const two = getByLabelText('two');
    const three = getByLabelText('three');

    expect(two).toBeChecked();

    fireEvent.click(three, { target: { checked: true } });

    expect(three).toBeChecked();
  });

  it('should manage state for controlled children', () => {
    const mockHandler = jest.fn();
    const Test = () => {
      return (
        <RadioGroup defaultValue="one" name="testing" onChange={mockHandler}>
          <Radio label="one" value="one" />
          <Radio label="two" value="two" />
          <Radio label="three" value="three" />
        </RadioGroup>
      );
    };
    const { getByLabelText } = render(<Test />);
    const one = getByLabelText('one');
    const two = getByLabelText('two');

    expect(one).toBeChecked();

    fireEvent.click(two, { checked: true });

    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith('two');
  });

  describe('focus', () => {
    const RadioGroupTest = ({ defaultValue }: any) => {
      const ref = React.useRef<any>(null);
      const setFocus = () => {
        const rootNode = ref.current;
        // query for the checked input element that is not disabled
        let input = rootNode.querySelector('input:not(:disabled):checked');

        if (input) {
          // if one is found,
          // set focus to that input
          input.focus();
          return;
        }

        // when there are no checked inputs
        // query for the first input that is not disabled
        input = rootNode.querySelector('input:not(:disabled)');

        if (input) {
          // set focus
          input.focus();
        }
      };
      return (
        <>
          <button onClick={setFocus} type="button">
            focus
          </button>
          <div data-testid="radiogroup-parent" ref={ref}>
            <RadioGroup name="testing" defaultValue={defaultValue}>
              <Radio label="one" isDisabled value="one" />
              <Radio label="two" value="two" />
              <Radio label="three" value="three" />
            </RadioGroup>
          </div>
        </>
      );
    };

    it('should give focus to the checked Radio', () => {
      const { getByText, getByLabelText } = render(
        <RadioGroupTest defaultValue="three" />
      );
      const button = getByText('focus');
      const three = getByLabelText('three');

      fireEvent.click(button);

      expect(document.activeElement).toEqual(three);
    });

    it('should give focus to the first enabled Radio when defaultValue is omitted', () => {
      const { getByText, getByLabelText } = render(<RadioGroupTest />);
      const button = getByText('focus');
      const two = getByLabelText('two');

      fireEvent.click(button);

      expect(document.activeElement).toEqual(two);
    });

    it('should give focus to the first enabled Radio when defaultValue is a disabled Radio', () => {
      const { getByText, getByLabelText } = render(
        <RadioGroupTest defaultValue="one" />
      );
      const button = getByText('focus');
      const two = getByLabelText('two');

      fireEvent.click(button);

      expect(document.activeElement).toEqual(two);
    });
  });
});
