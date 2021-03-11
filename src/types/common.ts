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
 * Available fonts to choose from
 */
export type Fonts = 'heading' | 'body' | 'mono';

/**
 * Available sizes to choose from
 */
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
