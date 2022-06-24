import React, { useState } from 'react';

import Editable from '.';
import EditableInput from './EditableInput';
import EditablePreview from './EditablePreview';
import EditableTextarea from './EditableTextarea';
import EditableProps from './types';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../test-utils';

describe('<Editable>', () => {
  beforeAll(() => mockMatchMedia());

  describe('with <EditableInput>', () => {
    const EditableInputTest = (props: Partial<EditableProps>) => {
      const [value, setValue] = useState('test');
      return (
        <div>
          <Editable
            onChange={val => setValue(val)}
            placeholder="placeholder"
            value={value}
            {...props}
          >
            <EditablePreview data-testid="preview" />
            <EditableInput data-testid="input" />
          </Editable>
        </div>
      );
    };

    it('passes a11y tests', async () => {
      await a11yTest(<EditableInputTest />);
    });

    it('should have correct default attributes', () => {
      const value = 'test';
      render(<EditableInputTest />);

      const preview = screen.getByTestId('preview');
      const input = screen.getByTestId('input');

      expect(preview).toHaveTextContent(value);
      expect(input).toHaveAttribute('hidden');
    });

    it('should handle callbacks', async () => {
      const mockChange = jest.fn();
      const mockSubmit = jest.fn();
      const mockEdit = jest.fn();
      const mockCancel = jest.fn();

      const Test = () => {
        const [value, setValue] = React.useState('');
        return (
          <Editable
            onChange={val => {
              setValue(val);
              mockChange(val);
            }}
            onCancel={mockCancel}
            onSubmit={mockSubmit}
            onEdit={mockEdit}
            value={value}
          >
            <EditablePreview data-testid="preview" />
            <EditableInput data-testid="input" />
          </Editable>
        );
      };

      render(<Test />);

      const preview = screen.getByTestId('preview');
      const input = screen.getByTestId('input');

      // call 'onEdit' when the preview receives focused, which triggers
      // the '<EditableInput>' component to receive focus
      fireEvent.focus(preview);
      await waitFor(() => expect(mockEdit).toHaveBeenCalledWith());

      // call 'onChange' with the current value in the input
      userEvent.type(input, 'test');
      await waitFor(() => expect(mockChange).toHaveBeenCalledWith('test'));

      // call 'onSubmit' when the 'Enter' key is pressed with the current value
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(mockSubmit).toHaveBeenCalledWith('test');

      // input should be hidden
      expect(input).not.toBeVisible();

      fireEvent.focus(preview);
      userEvent.type(input, ' test');
      // trigger a cancel
      fireEvent.keyDown(input, { key: 'Escape' });

      // call 'onCancel' with the lastest value before pressing 'Escape'
      expect(mockCancel).toHaveBeenCalledWith('test test');
    });

    it('should contain the proper aria attributes', () => {
      const { rerender } = render(<EditableInputTest />);
      let preview = screen.getByTestId('preview');
      let input = screen.getByTestId('input');

      // preview and input should not not have aria-disabled by default
      expect(preview).not.toHaveAttribute('aria-disabled');
      expect(input).not.toHaveAttribute('aria-disabled');

      rerender(<EditableInputTest isDisabled />);

      preview = screen.getByTestId('preview');
      input = screen.getByTestId('input');

      // preview and input should have aria-disabled isDisabled prop is used
      expect(preview).toHaveAttribute('aria-disabled', 'true');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not be interactive when disabled', async () => {
      render(<EditableInputTest isDisabled />);

      const preview = screen.getByTestId('preview');
      const input = screen.getByTestId('input');

      fireEvent.click(preview);
      expect(input).not.toBeVisible();
    });
  });

  describe('with <EditableTextarea>', () => {
    const EditableTextareaTest = (props: Partial<EditableProps>) => {
      const [value, setValue] = useState('test');
      return (
        <div>
          <Editable
            onChange={val => setValue(val)}
            value={value}
            placeholder="placeholder"
            {...props}
          >
            <EditablePreview data-testid="preview" />
            <EditableTextarea data-testid="textarea" />
          </Editable>
        </div>
      );
    };

    it('should pass a11y tests', async () => {
      await a11yTest(<EditableTextareaTest />);
    });

    it('should have correct default attributes', () => {
      const value = 'test';
      render(<EditableTextareaTest />);

      const preview = screen.getByTestId('preview');
      const input = screen.getByTestId('textarea');

      expect(preview).toHaveTextContent(value);
      expect(input).toHaveAttribute('hidden');
    });

    it('should handle callbacks', async () => {
      const mockChange = jest.fn();
      const mockSubmit = jest.fn();
      const mockEdit = jest.fn();
      const mockCancel = jest.fn();

      const Test = () => {
        const [value, setValue] = React.useState('');
        return (
          <Editable
            onChange={val => {
              setValue(val);
              mockChange(val);
            }}
            onCancel={mockCancel}
            onSubmit={mockSubmit}
            onEdit={mockEdit}
            value={value}
          >
            <EditablePreview data-testid="preview" />
            <EditableTextarea data-testid="textarea" />
          </Editable>
        );
      };

      render(<Test />);

      const preview = screen.getByTestId('preview');
      const textarea = screen.getByTestId('textarea');

      // call 'onEdit' when the preview receives focused, which triggers
      // the '<EditableTextarea>' component to receive focus
      fireEvent.focus(preview);
      await waitFor(() => expect(mockEdit).toHaveBeenCalledWith());

      // call 'onChange' with the current value in the input
      userEvent.type(textarea, 'test');
      await waitFor(() => expect(mockChange).toHaveBeenCalledWith('test'));

      // call 'onSubmit' when the focus is lost
      fireEvent.blur(textarea);
      expect(mockSubmit).toHaveBeenCalledWith('test');

      // textarea should be hidden
      expect(textarea).not.toBeVisible();

      fireEvent.focus(preview);
      userEvent.type(textarea, ' test');
      // trigger a cancel
      fireEvent.keyDown(textarea, { key: 'Escape' });

      // call 'onCancel' with the lastest value before pressing 'Escape'
      expect(mockCancel).toHaveBeenCalledWith('test test');
    });

    it('should contain the proper aria attributes', () => {
      const { rerender } = render(<EditableTextareaTest />);
      let preview = screen.getByTestId('preview');
      let input = screen.getByTestId('textarea');

      // preview and input should not not have aria-disabled by default
      expect(preview).not.toHaveAttribute('aria-disabled');
      expect(input).not.toHaveAttribute('aria-disabled');

      rerender(<EditableTextareaTest isDisabled />);

      preview = screen.getByTestId('preview');
      input = screen.getByTestId('textarea');

      // preview and input should have aria-disabled isDisabled prop is used
      expect(preview).toHaveAttribute('aria-disabled', 'true');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not be interactive when disabled', async () => {
      render(<EditableTextareaTest isDisabled />);

      const preview = screen.getByTestId('preview');
      const input = screen.getByTestId('textarea');

      fireEvent.click(preview);
      expect(input).not.toBeVisible();
    });
  });
});
