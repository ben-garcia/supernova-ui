import { RefObject } from 'react';

import {
  CommonProps,
  FormControlProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Radio component
 */
export interface RadioProps
  extends Omit<
      CommonProps,
      'children' | 'isLoading' | 'leftIcon' | 'rightIcon'
    >,
    Omit<
      FormControlProps,
      'finalLabelTransform' | 'floatLabel' | 'initialLabelTransform' | 'variant'
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
