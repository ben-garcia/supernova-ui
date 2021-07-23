import { CommonProps, TypographyProps } from '../../../types';

/**
 * Props for the Badge component
 */
export interface BadgeProps
  extends Omit<TypographyProps, 'align'>,
    Pick<CommonProps, 'children'> {
  /**
   * Configure the look of the Badge.
   *
   * @default 'solid'
   */
  variant?: 'outline' | 'solid';
}
