import { SupernovaProps } from '@types';

type Tags =
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
 * Props for the Text component
 */
export interface TextProps extends SupernovaProps {
  /**
   * The size of the component.
   */
  // size?: FormControlProps['size'] | 'xl' | 'xxl' | 'xxxl';
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
  tag?: Tags;
}
