import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { FormControlProps, SupernovaProps } from '@types';

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends SupernovaProps<ReactButtonProps>,
    Omit<FormControlProps, 'variant'> {
  /**
   * Whether to set the type as 'submit'
   */
  asSubmitButton?: boolean;
  /**
   * Disable interactivity
   */
  isDisabled?: boolean;
  /**
   * Indicates to the user that something is happening
   */
  isLoading?: boolean;
  /**
   * Icon to the left of the Button text
   */
  leftIcon?: ReactNode;
  /**
   * Text to accompany the loading spinner
   */
  loadingText?: string;
  /**
   * Icon to the right of the Button text
   */
  rightIcon?: ReactNode;
  /**
   * Spinner to use for the loading state
   */
  spinner?: ReactNode;
  /**
   * The look of the button
   *
   * default is 'filled'
   */
  variant?: 'filled' | 'outline';
}
