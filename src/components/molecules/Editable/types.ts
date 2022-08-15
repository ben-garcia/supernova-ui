import { SupernovaProps } from '@types';

interface EditableProps extends SupernovaProps {
  /**
   * Flag used to check whether to trigger edit mode.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Callback function called when the user presses the 'Esc' key or
   * focus is lost.
   *
   * @param previousValue the value of 'value' before loss of focus or 'Esc' press
   */
  onCancel?: (previousValue: string) => void;
  /**
   * Callback function called when the value changes.
   *
   * @param nextValue updated value
   */
  onChange: (nextValue: string) => void;
  /**
   * Callback function called when in edit mode.
   */
  onEdit?: () => void;
  /**
   * Callback function called when exiting edit mode.
   *
   * @param val final value
   */
  onSubmit?: (val: string) => void;
  /**
   * The placeholder text for when the value is empty.
   */
  placeholder?: string;
  /**
   * Flag that checks whether the text should be selected when in focus.
   *
   * @default true
   */
  selectAllOnFocus?: boolean;
  /**
   * Flag used to check whether to update the value in exit edit mode
   * when the user removes focus.
   *
   * @default true
   */
  submitOnBlur?: boolean;
  /**
   * The value shown in preview mode and when in edit mode.
   */
  value: string;
}

export default EditableProps;
