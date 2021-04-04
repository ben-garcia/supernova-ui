import { RefObject, SyntheticEvent } from 'react';

import {
  CommonProps,
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
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Configure the label transform position after transition ends
   */
  finalLabelTransform?: string;
  /**
   * Configure the initial transform position before the transition begins
   */
  initialLabelTransform?: string;
  /**
   * The label for the interactive component
   *
   * used to set the value of 'aria-label' when 'floatLabel' is false
   */
  label: string;
  /**
   * Function to be executed for onChange event
   */
  onChange?: (e: SyntheticEvent) => void;
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
  resize?: 'horizontal' | 'vertical' | 'both';
  /**
   * Value of the input
   */
  value?: string;
  /**
   * The look of the button
   *
   * default is 'outline'
   */
  variant?: 'filled' | 'flushed' | 'outline';
}
