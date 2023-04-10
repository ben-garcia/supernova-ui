import {
  FormControlProps,
  PseudoProps,
  SharedAnchorPositioningProps,
  SupernovaProps,
} from '@types';

export interface TooltipProps
  extends SharedAnchorPositioningProps,
    Omit<SupernovaProps, keyof PseudoProps>,
    Pick<FormControlProps, 'colorVariant'> {
  /**
   * The ammount of time, in ms, to wait before
   * the component is unmounted.
   *
   * @default 0
   */
  closeDelay?: number;
  /**
   * Configure what the content of the tooltip should be
   */
  label: string;
  /**
   * Flag to indicate whether the component is interactive.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The ammount of time, in ms, to wait before
   * the component is mounted.
   *
   * @default 0
   */
  openDelay?: number;
}
