import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

type ReactInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;

/**
 * Props for the TextInput component
 */
export interface TextInputProps
  extends SupernovaProps<ReactInputProps>,
    FormControlProps {
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
}
