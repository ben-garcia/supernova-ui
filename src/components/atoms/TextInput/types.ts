import { ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the TextInput component
 */
export interface TextInputProps
  extends SupernovaProps<'input'>,
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
