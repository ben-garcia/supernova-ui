import { ReactNode } from 'react';

import { SupernovaUIBaseProps } from '../../../types';

export interface IconBaseProps
  extends Omit<SupernovaUIBaseProps, 'backgroundColor' | 'color'> {
  children: ReactNode;
  /**
   * fill for the svg
   */
  fill?: string;
}

export interface IconProps extends Omit<IconBaseProps, 'children'> {}
