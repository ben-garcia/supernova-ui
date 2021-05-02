import { ReactNode } from 'react';

import { SupernovaUIBaseProps } from '../../../types';

type PositionTypes = 'bottom' | 'left' | 'right' | 'top';

export interface TooltipProps
  extends Pick<SupernovaUIBaseProps, 'backgroundColor' | 'color'> {
  children: ReactNode;
  /**
   * Configure what the content of the tooltip should be
   */
  content: string;
  /**
   * Where the content of the tooltip should be positioned
   * relative to the trigger
   *
   * @default 'bottom'
   */
  position?: PositionTypes;
}
