import { SupernovaUIBaseProps } from '../../../types';
import { CommonProps } from '../../../types/common';

/**
 * Props for the Spinner component
 */
export interface SpinnerProps
  extends SupernovaUIBaseProps,
    Pick<CommonProps, 'size'> {
  /**
   * Label used by assistant technology like screen readers
   */
  ariaLabel?: string;
  /**
   * The thickness of the border
   *
   * '4px' is the default
   */
  borderWidth?: string;
  /**
   * How long the animation will last
   *
   * '1s' is the default
   */
  duration?: string;
  /**
   * The color of the spinner
   *
   * 'info700' is the default
   */
  primaryColor?: string;
  /**
   * The color for the empty space
   *
   * 'transparent' is the default
   */
  secondaryColor?: string;
}
