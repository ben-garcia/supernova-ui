import { CommonProps, TypographyProps } from '../../../types';

/**
 * The props used by the Heading component
 */
export interface HeadingProps
  extends TypographyProps,
    Pick<CommonProps, 'children'> {
  /**
   * The html heading level(1, 2, 3, 4, 5, 6)
   *
   * default is 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
