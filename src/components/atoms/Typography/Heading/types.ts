import { ReactNode } from 'react';

import { TypographyProps } from '../../../../types';

/**
 * The props used by the Heading component
 */
export interface HeadingProps extends Omit<TypographyProps, 'textTransform'> {
  /**
   * The content for the element
   */
  children: ReactNode;
  /**
   * The html heading element
   *
   * default is h1
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
