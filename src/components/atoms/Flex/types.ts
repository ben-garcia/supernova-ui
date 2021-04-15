import { ReactNode } from 'react';

type AlignItems = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';

type Direction = 'column' | 'column-reverse' | 'row' | 'row-reverse';

type JustifyContent =
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-evenly'
  | 'space-between';

type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps {
  /**
   * how flex items should be positioned on the cross axis
   */
  alignItems?: AlignItems;
  children: ReactNode;
  /**
   * the direction flex items
   *
   * @default 'row'
   */
  direction?: Direction;
  /**
   * how flex items should be positioned on the main axis
   */
  justifyContent?: JustifyContent;
  /**
   * the space between flex items
   *
   * a number between 0 and 10
   *
   * @default 2
   */
  spacing?: number;
  /**
   * configure the behavior of flex items when the
   * flex container's width is less than that of the flex items combined
   */
  wrap?: Wrap;
}
