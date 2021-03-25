import { ReactNode } from 'react';

/**
 * Available breakpoints defined in the theme
 */
export interface Breakpoints {
  /**
   * Configure how the component should render
   * when the viewport width equals the xs breakpoint
   *
   * value of xs breakpoint is (min-width: 0)
   * but can be user defined
   */
  xs?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the sm breakpoint
   *
   * value of sm breakpoint is (min-width: 480px)
   * but can be user defined
   */
  sm?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the md breakpoint
   *
   * value of md breakpoint is (min-width: 768px)
   * but can be user defined
   */
  md?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the lg breakpoint
   *
   * value of lg breakpoint is (min-width: 992px)
   * but can be user defined
   */
  lg?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the xl breakpoint
   *
   * value of xl breakpoint is (min-width: 1280px)
   * but can be user defined
   */
  xl?: Sizes | string;
  /**
   *
   * Configure how the component should render
   * when the viewport width equals the xxl breakpoint
   *
   * value of xxl breakpoint is (min-width: 1536px)
   * but can be user defined
   */
  xxl?: Sizes | string;
}

/**
 * Available colors to choose from
 */
export type Colors = 'primary' | 'info' | 'warning' | 'success' | 'error';

/**
 * Props that are common to more than 1 component
 */
export interface CommonProps {
  /**
   * The border radius
   *
   * accepts
   *
   * string with value of a valid size
   * e.g.
   *	borderRadius="lg"
   *
   * or
   *
   * valid css border-radius value
   * e.g.
   *	borderRadius="1px solid green"
   */
  borderRadius?: Sizes | string;
  /**
   * The box shadow
   *
   * accepts
   *
   * string with value of a valid size
   * e.g.
   *	boxShadow="lg"
   *
   * or
   *
   * valid css box-shadow value
   * e.g.
   *	boxShadow="0 0 1px black"
   */
  boxShadow?: Sizes | string;
  /**
   * React children
   */
  children: ReactNode;
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
}

/**
 * Available fonts to choose from
 */
export type Fonts = 'heading' | 'body' | 'mono';

/**
 * Available sizes to choose from
 */
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
