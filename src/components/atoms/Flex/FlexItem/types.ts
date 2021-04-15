import { ReactNode } from 'react';

export interface FlexItemProps {
  children: ReactNode;
  /**
   * the amount of rows to take up when breakpoint is lg
   *
   * a number betwee 0 and 12
   */
  lg?: number;
  /**
   * the amount of rows to take up when breakpoint is md
   *
   * a number betwee 0 and 12
   */
  md?: number;
  /**
   * the amount of rows to take up when breakpoint is sm
   *
   * a number betwee 0 and 12
   */
  sm?: number;
  /**
   * the amount of rows to take up when breakpoint is xl
   *
   * a number betwee 0 and 12
   */
  xl?: number;
  /**
   * the amount of rows to take up when breakpoint is xs
   *
   * a number betwee 0 and 12
   */
  xs?: number;
  /**
   * the amount of rows to take up when breakpoint is xxl
   *
   * a number betwee 0 and 12
   */
  xxl?: number;
}
