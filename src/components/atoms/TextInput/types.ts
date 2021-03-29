import { SyntheticEvent } from 'react';

import {
  CommonProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the TextInput component
 */
export interface TextInputProps
  extends Omit<CommonProps, 'children' | 'isLoading'>,
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
