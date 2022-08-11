import type { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the Switch component
 */
export interface SwitchProps
  extends SupernovaProps<'input'>,
    Omit<FormControlProps, 'variant'> {
  /**
   * The visible helper text that describes the radio input option
   *
   * can be a string
   * or
   * a component that is to be rendered.
   */
  label?: string;
  /**
   * Configure the checked state of the checkbox
   */
  isChecked?: boolean;
}
