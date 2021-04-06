import { RefObject } from 'react';

import {
  CommonProps,
  FormControlProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Switch component
 */
export interface SwitchProps
  extends Omit<
      CommonProps,
      'children' | 'isLoading' | 'leftIcon' | 'rightIcon'
    >,
    Omit<
      FormControlProps,
      | 'finalLabelTransform'
      | 'floatLabel'
      | 'initialLabelTransform'
      | 'value'
      | 'variant'
    >,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Configure the checked state of the checkbox
   */
  isChecked?: boolean;
  /**
   * React reference
   */
  ref?: RefObject<HTMLInputElement>;
}
