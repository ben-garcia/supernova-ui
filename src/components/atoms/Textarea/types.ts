import { RefObject } from 'react';

import {
  CommonProps,
  FormControlProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Textarea component
 */
export interface TextareaProps
  extends Omit<
      CommonProps,
      'children' | 'isLoading' | 'lefticon' | 'rightIcon'
    >,
    FormControlProps,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Reference used primarily to set focus after Modal closes
   */
  ref?: RefObject<HTMLTextAreaElement>;
  /**
   * Configure whether the user can resize the textarea
   *
   * css property resize
   *
   * @default 'none'
   */
  resize?: 'horizontal' | 'vertical' | 'both' | 'none';
}
