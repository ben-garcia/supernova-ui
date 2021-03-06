import { SupernovaUIBaseProps } from './supernova-ui-base';
import { Fonts, Sizes } from './common';

/**
 * Props for components that can change typography related props.
 */
export interface TypographyProps extends SupernovaUIBaseProps {
  /**
   * configure the placement of the text
   *
   * css property: align-text
   *
   * default is 'center'
   */
  align?: 'center' | 'left' | 'right';
  /**
   * configure the font family
   *
   * css property: font-family
   */
  font?: Fonts | string;
  /**
   * configure the size of characters
   *
   * css property: font-size
   */
  fontSize?: Sizes | string;
  /**
   * configure the width of letters of text
   *
   * css property: font-weight
   */
  fontWeight?: Sizes | string;
  /**
   * when text exceeds its width, component will
   *  1. not overflow
   *	2. show ellipsis(...) before cutting the text
   *
   *	default is false
   */
  isTruncated?: boolean;
  /**
   * configure the space lines of text
   *
   * css property: line-height
   */
  lineHeight?: Sizes | string;
  /**
   * configure the spacing between letters
   *
   * css property: letter-spacing
   */
  letterSpacing?: Sizes | string;
  /**
   * configure the capitalization of the text
   *
   * css property: text-transfrom
   *
   * default is 'capitalize' for <Heading />
   *				 and 'lowercase' for <Text />
   */
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase';
}
