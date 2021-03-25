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
   * Custom background color when a hover event is triggered
   */
  hoverBackgroundColor?: string;
  /**
   * Custom color when a hover event is triggered
   */
  hoverColor?: string;
  /**
   * Disable button interactivity
   */
  isDisabled?: boolean;
  /**
   * Indicates to the user that something is happening
   */
  isLoading?: boolean;
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
   * Icon to the right of the Button text
   */
  rightIcon?: CommonProps['children'];

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
