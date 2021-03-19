import { SupernovaUIBaseProps } from '../../../types';

export interface IconProps
  extends Omit<SupernovaUIBaseProps, 'backgroundColor' | 'color'> {
  /**
   * fill for the svg
   */
  fill?: string;
}
