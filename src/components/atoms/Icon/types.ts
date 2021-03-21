import { ReactNode } from 'react';

import { Sizes } from '../../../types/common';

export interface IconBaseProps {
  children: ReactNode;
  /**
   * fill for the svg
   */
  fill?: string;
  /**
   * The size of the icon
   */
  size?: Sizes | string;
  /**
   * The svg viewbox
   */
  viewBox?: string;
}

export interface IconProps extends Pick<IconBaseProps, 'size' | 'fill'> {}
