import { FormControlProps, SupernovaProps } from '@types';

/**
 * Props for the Badge component
 */
export interface BadgeProps
  extends SupernovaProps,
    Pick<FormControlProps, 'colorVariant' | 'size'> {
  /**
   * Configure the look of the Badge.
   *
   * @default 'solid'
   */
  variant?: 'outline' | 'solid';
}
