import { FormControlProps, SupernovaProps } from '@types';

type PositionTypes = 'bottom' | 'left' | 'right' | 'top';

export interface TooltipProps
  extends Omit<SupernovaProps, '_focus' | '_hover'>,
    Pick<FormControlProps, 'colorVariant'> {
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
  placement?: PositionTypes;
  /**
   * Configure whether to render with an arrow pointing to the trigger element
   *
   * @default true
   */
  withArrow?: boolean;
}

// for state
export interface TooltipPosition {
  left: number;
  top: number;
}
