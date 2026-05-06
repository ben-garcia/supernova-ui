import { ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the TextInput component
 */
export interface TextInputProps
  extends Omit<SupernovaProps<'input'>, 'type'>, FormControlProps {
  /**
   * The HTML label to be associated with the input.
   */
  label?: string;
  /**
   * Icon to the left of the Button text
   */
  leftIcon?: ReactNode;
  /**
   * Icon to the right of the Button text
   */
  rightIcon?: ReactNode;
  /**
   * HTML input type attribute
   *
   * @default 'text'
   */
  type?: 'email' | 'password' | 'text';
}
