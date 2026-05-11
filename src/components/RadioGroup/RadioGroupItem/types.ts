import { ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the Radio component
 */
export interface RadioGroupItemProps
  extends
    Omit<SupernovaProps<'input'>, 'type' | 'onChange'>,
    Omit<FormControlProps, 'colorVariant' | 'size' | 'variant'> {
  /**
   * The visible helper text that describes the radio input option
   */
  label: string | ReactNode;
}
