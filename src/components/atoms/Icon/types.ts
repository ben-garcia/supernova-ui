import { ReactNode } from 'react';

import { SupernovaUIBaseProps } from '../../../types';
import { Breakpoints } from '../../../types/common';

export interface IconBaseProps
  extends Omit<SupernovaUIBaseProps, 'backgroundColor' | 'color'> {
  children: ReactNode;
  /**
   * fill for the svg
   */
  fill?: string;
  /**
   * The size of the icon
   *
   * accepts
   *
   * 1. Breakpoints object to configure the size based on viewport width
   * e.g.
   *	size: {xs: ''<value>', ... ,  xxl: '<value>'}
   *
   * 2. string with value of a valid size
   * e.g.
   *	size="lg"
   *
   * or
   *
   * css height and width valid value
   * e.g.
   *	size="3rem"
   */
  size?: Breakpoints | string;
  /**
   * The svg viewbox
   */
  viewBox?: string;
}

export interface IconProps extends Omit<IconBaseProps, 'children'> {}
