import { SupernovaUIBaseProps } from '../../../types';
import { CommonProps } from '../../../types/common';

/**
 * Props for the Icon component
 */
export interface IconBaseProps
  extends Omit<SupernovaUIBaseProps, 'backgroundColor' | 'color'>,
    CommonProps {
  /**
   * fill for the svg
   */
  fill?: string;
  /**
   * The svg viewbox
   */
  viewBox?: string;
}

/**
 * Props for the specific icon components
 */
export interface IconProps extends Omit<IconBaseProps, 'children'> {}
