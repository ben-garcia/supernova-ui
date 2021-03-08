import { ReactNode } from 'react';

import { TypographyProps } from '../../../types';

/**
 * The props used by the Paragraph component
 */
export interface ParagraphProps extends TypographyProps {
  /**
   * The content for the element
   */
  children: ReactNode;
}
