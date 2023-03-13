import {
  FloatingProps,
  FormControlProps,
  PseudoProps,
  SupernovaProps,
} from '@types';

export interface TooltipProps
  extends Omit<
      FloatingProps,
      'arrowColor' | 'children' | 'show' | 'triggerRef'
    >,
    Omit<SupernovaProps, keyof PseudoProps>,
    Pick<FormControlProps, 'colorVariant'> {
  /**
   * Configure what the content of the tooltip should be
   */
  label: string;
}
