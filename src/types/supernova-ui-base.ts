import { Breakpoints, Colors, Sizes } from './common';

export interface MarginPaddingProps {
  /**
   * css property: margin-bottom
   *
   * accepts
   *
   * 1. a Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	bottom: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		bottom: 'xxl'
   *		bottom: 'md'
   *
   * 3. a css value
   *	e.g.
   *		bottom: '10px'
   *		bottom: '1rem'
   *
   */
  bottom?: Breakpoints | Sizes | string;
  /**
   * css property: margin-left
   *
   * accepts
   *
   * 1. a Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	left: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		left: 'xxl'
   *		left: 'md'
   *
   * 3. a css value
   *	e.g.
   *		left: '10px'
   *		left: '1rem'
   *
   */
  left?: Breakpoints | Sizes | string;
  /**
   * css property: margin-right
   *
   * accepts
   *
   * 1. a Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	right: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		right: 'xxl'
   *		right: 'md'
   *
   * 3. a css value
   *	e.g.
   *		right: '10px'
   *		right: '1rem'
   *
   */
  right?: Breakpoints | Sizes | string;
  /**
   * css property: margin-top
   *
   * accepts
   *
   * 1. a Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	top: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		top: 'xxl'
   *		top: 'md'
   *
   * 3. a css value
   *	e.g.
   *		top: '10px'
   *		top: '1rem'
   *
   */
  top?: Breakpoints | Sizes | string;
  /**
   * css properties: margin-left and margin-right
   * or
   * css properties: padding-left and padding-right
   *
   * NOTE:
   * left and right properties take precedence,
   * if either property is defined, this x property will have no effect
   *
   * accepts
   *
   * 1. Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	x: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		x: 'xxl'
   *		x: 'md'
   *
   * 3. a css value
   *	e.g.
   *		x: '10px'
   *		x: '1rem'
   *
   */
  x?: Breakpoints | Sizes | string;
  /**
   * css property: margin-bottom and margin-top
   * or
   * css property: padding-bottom and padding-top
   *
   * NOTE:
   * bottom and top properties take precedence,
   * if either property is defined, this y property will have no effect
   *
   * accepts
   *
   * 1. a Breakpoints object to configure media queries based on the breakpoint
   *
   * e.g.
   *	y: {
   *	  xs: 'value',
   *	  sm: 'value',
   *	  md: 'value',
   *	  lg: 'value',
   *	  xl: 'value',
   *	  xxl: 'value'
   *	}
   *
   * 2. a Size from the theme
   *	e.g.
   *		y: 'xxl'
   *		y: 'md'
   *
   * 3. a css value
   *	e.g.
   *		y: '10px'
   *		y: '1rem'
   *
   */
  y?: Breakpoints | Sizes | string;
}

/**
 * The base props that will be shared by most(if not all)
 * of the components.
 */
export interface SupernovaUIBaseProps {
  /**
   * set the background color
   *
   * can be a custom color provided to the ThemeProvider
   */
  backgroundColor?: Colors | string;
  /**
   * custom class
   */
  className?: string;
  /**
   * set the color
   *
   * can be a custom color provided to the ThemeProvider
   */
  color?: Colors | string;
  /**
   * sets the height(using rem, em, px, %)
   *
   * when the default or custom values don't cut it
   *
   * e.g.
   *	height="5rem", height="6em", height="100px", height="10%"
   */
  height?: Breakpoints | string;
  /**
   * margin to apply
   *
   * accepts
   *
   * 1. MarginPaddingProps object used to configure either
   * each individual value(bottom, left, right, top) 
	 *
   * e.g.
   *	margin={{bottom: 'value', left: 'value', right: 'value', top: 'value' }}
	 *
	 * or
	 *
   * horizontal(margin-left, margin-right) and vertical(margin-top, margin-bttom) values
	 *
	 * e.g.
	 *	margin={{x: 'value', y: 'value'}}

   *
   * 2. css value
   *	e.g.
   *		margin="1rem"
   *		margin="3em"
   *		margin="10%"
   *		margin="50px"
   *
   */
  margin?: MarginPaddingProps | string;
  /**
   * padding to apply
   *
   * accepts
   *
   * 1. MarginPaddingProps object used to configure either
   * each individual value(bottom, left, right, top) 
	 *
   * e.g.
   *	margin={{bottom: 'value', left: 'value', right: 'value', top: 'value' }}
	 *
	 * or
	 *
   * horizontal(padding-left, padding-right) and vertical(padding-top, padding-bttom) values
	 *
	 * e.g.
	 *	padding={{x: 'value', y: 'value'}}

   *
   * 2. css value
   *	e.g.
   *		padding="1rem"
   *		padding="3em"
   *		padding="10%"
   *		padding="50px"
   *
   */
  padding?: MarginPaddingProps | string;
  /**
   * sets the width(using rem, em, px, %)
   *
   * when the default or custom values don't cut it
   *
   * accepts
   * breakpoint object
   *
   * or
   *
   * string
   *
   * @example
   *	width="5rem", width="6em", width="100px", width="10%"
   */
  width?: Breakpoints | string;
}
