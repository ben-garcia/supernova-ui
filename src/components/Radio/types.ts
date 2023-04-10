import { ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the Radio component
 */
export interface RadioProps
  extends SupernovaProps<'input'>,
    Omit<FormControlProps, 'variant'> {
  /**
   * The visible helper text that describes the radio input option
   */
  label: string | ReactNode;
  /**
   * Configure the checked state of the checkbox.
   */
  isChecked?: boolean;
}
