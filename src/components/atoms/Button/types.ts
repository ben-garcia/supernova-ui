import { MouseEvent, RefObject, SyntheticEvent } from 'react';

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
   * Whether to set the type as 'submit'
   */
  asSubmitButton?: boolean;
  id?: string;
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
   * Function to be executed when button has focus
   */
  onFocus?: () => void;
  onMouseEnter?: (e?: MouseEvent) => void;
  onMouseLeave?: () => void;
  /**
   * Reference used primarily to set focus after Modal closes
   */
  ref?: RefObject<HTMLButtonElement>;
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
