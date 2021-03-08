import React from 'react';

import { createClasses, createStyles } from '../../../utils';
import { ParagraphProps } from './types';

/**
 * Ui component to display a paragraph
 */
const Paragraph: React.FC<ParagraphProps> = props => {
  const {
    align = 'left',
    backgroundColor = '',
    children,
    color = '',
    font = 'body',
    fontSize = 'md',
    fontWeight = '',
    height = '',
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    padding = '',
    textTransform = '',
    width = '',
  } = props;
  const colors = ['error', 'info', 'primary', 'success', 'warning'];
  const sizes = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const classes = createClasses('_snui-text-heading', {
    [`_snui-text-${align}`]:
      align === 'center' || align === 'left' || align === 'right',
    [`_snui-color-${backgroundColor}`]: backgroundColor !== '',
    [`_snui-color-$color}`]: color !== '' && colors.includes(color),
    [`_snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    [`_snui-text-${fontSize}`]: sizes.includes(fontSize),
    [`_snui-font-weight-${fontWeight}`]:
      fontWeight !== '' && fontWeight !== 'xxl' && sizes.includes(fontWeight),
    [`_snui-font-${height}`]: height !== '' && sizes.includes(height),
    '_snui-text-truncated': isTruncated,
    [`_snui-letter-spacing-${letterSpacing}`]: sizes.includes(letterSpacing),
    [`_snui-line-height-${lineHeight}`]:
      lineHeight !== '' && sizes.includes(lineHeight),
    [`_snui-margin-${margin}`]: margin !== '' && sizes.includes(margin),
    [`_snui-padding-${padding}`]: padding !== '' && sizes.includes(padding),
    [`_snui-padding-${textTransform}`]:
      textTransform === 'capitalize' ||
      textTransform === 'lowercase' ||
      textTransform === 'uppercase',
    [`_snui-width-${width}`]: width !== '' && sizes.includes(width),
  });

  const styles = createStyles({
    align,
    backgroundColor,
    color,
    font,
    fontSize,
    fontWeight,
    height,
    letterSpacing,
    lineHeight,
    margin,
    padding,
    textTransform,
    width,
  });

  return (
    <p className={classes} style={styles}>
      {children}
    </p>
  );
};

export default Paragraph;
