import { CommonProps, TypographyProps } from '../../../types';

/**
 * Props for the Paragraph component
 */
export interface ParagraphProps
  extends TypographyProps,
    Pick<CommonProps, 'children'> {}
