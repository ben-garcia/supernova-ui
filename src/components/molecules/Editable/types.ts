interface EditableProps {
  className?: string;
  /**
   * The initial value shown in preview mode and when in edit mode.
   */
  defaultValue?: string;
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
  onChange?: (nextValue: string) => void;
  /**
   * Callback function called when in edit mode.
   */
  onEdit?: () => void;
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
   * Flag used to check whether to update the value and exit edit mode
   * when the user removes focus.
   *
   * @default true
   */
  submitOnBlur?: boolean;
}

export default EditableProps;
