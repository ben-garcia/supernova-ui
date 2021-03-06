import { Colors, Sizes } from './common';

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
  height?: string;
  /**
   * margin to apply
   *
   * you can pass in a string to either set all sides or 2 values to set
   * horizontal and vertical values
   *
   * accepts size unit(xxxxs, xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl, xxxxl)
   *
   * or
   *
   * accepts rem, em, px, % or a combination
   *
   *	e.g.
   *		margin="30px 10% 6rem 3em"
   *		margin="10px 0 20px"
   *		margin="1em 20px 0 0"
   *		margin="5em"
   */
  margin?: Sizes | string;
  /**
   * padding to apply
   *
   * you can pass in a string to either set all sides or 2 values to set
   * horizontal and vertical values
   *
   * accepts size unit(xxxxs, xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl, xxxxl)
   *
   * or
   *
   * accepts rem, em, px, % or a combination
   *
   *	e.g.
   *		padding="30px 10% 6rem 3em"
   *		padding="10px 0 20px"
   *		padding="10px 20px"
   *		padding="10px"
   */
  padding?: Sizes | string;
  /**
   * sets the width(using rem, em, px, %)
   *
   * when the default or custom values don't cut it
   *
   * e.g.
   *	width="5rem", width="6em", width="100px", width="10%"
   */
  width?: string;
}
