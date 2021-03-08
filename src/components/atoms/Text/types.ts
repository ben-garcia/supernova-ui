import { ReactNode } from 'react';

import { TypographyProps } from '../../../types';

type Tag =
  | 'abbr'
  | 'cite'
  | 'del'
  | 'em'
  | 'i'
  | 'ins'
  | 'kbd'
  | 'mark'
  | 's'
  | 'samp'
  | 'span'
  | 'sub'
  | 'sup'
  | 'u';

/**
 * The props used by the Text component
 */
export interface TextProps extends Omit<TypographyProps, 'align'> {
  /**
   * The content for the element
   */
  children: ReactNode;
  /**
   * The html tag to render text that is
   *
   * abbr = abbreviation
   * cite = citation
   * del = deleted
   * em = emphasis
   * i = italic
   * ins = inserted
   * kbd = keyboard input
   * mark = highlighted
   * s = strikethrough
   * samp = sample output from a computer program
   * sub = subscript
   * sup = superscript
   * u = underline
   *
   * @see https://www.w3schools.com/Tags
   *
   * default is 'span'
   */
  tag?: Tag;
}
