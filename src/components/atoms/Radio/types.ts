import { ReactNode, RefObject } from 'react';

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
      | 'finalLabelTransform'
      | 'label'
      | 'floatLabel'
      | 'initialLabelTransform'
      | 'variant'
    >,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * The visible helper text that describes the radio input option
   *
   * can be a string
   * or
   * a component that is to be rendered.
   */
  label: string | ReactNode;
  /**
   * Configure the checked state of the checkbox.
   */
  isChecked?: boolean;
  /**
   * React reference
   */
  ref?: RefObject<HTMLInputElement>;
}
