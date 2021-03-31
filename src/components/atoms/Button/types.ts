import { RefObject, SyntheticEvent } from 'react';
import { AriaProps } from 'types/common';

import {
  CommonProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends Pick<
      AriaProps,
      'aria-describedby' | 'aria-label' | 'aria-labelledby'
    >,
    Omit<CommonProps, 'size'>,
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
