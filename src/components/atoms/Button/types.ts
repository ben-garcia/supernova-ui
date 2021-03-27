import { SyntheticEvent } from 'react';

import {
  CommonProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends Omit<CommonProps, 'size'>,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Icon to the left of the Button text
   */
  leftIcon?: CommonProps['children'];
  /**
   * Text to accompany the loading spinner
   */
  loadingText?: string;
  /**
   * Function to be executed for onClick event
   */
  onClick?: (e: SyntheticEvent) => void;
  /**
   * Spinner to use for the loading state
   */
  spinner?: CommonProps['children'];
  /**
   * The look of the button
   *
   * default is 'filled'
   */
  variant?: 'filled' | 'outline';
}
