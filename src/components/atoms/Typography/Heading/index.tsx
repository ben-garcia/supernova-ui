import React from 'react';

import { createClasses, createElement, createStyles } from '../../../../utils';
import { HeadingProps } from './types';

/**
 * Ui component to display headings
 */
const Heading: React.FC<HeadingProps> = props => {
  const {
    align = 'left',
    backgroundColor = '',
    children,
    color = '',
    font = 'heading',
    fontSize = '',
    fontWeight = 'xxl',
    height = '',
    letterSpacing = 'md',
    lineHeight = '',
    level = 1,
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
    [`_snui-text-${sizes[level - 1]}`]:
      fontSize === '' && !sizes.includes(fontSize),
    [`_snui-font-weight-${fontWeight}`]:
      fontWeight !== '' && fontWeight !== 'xxl' && sizes.includes(fontWeight),
    [`_snui-font-${height}`]: height !== '' && sizes.includes(height),
    '_snui-text-truncated': isTruncated,
    [`_snui-letter-spacing-${letterSpacing}`]: sizes.includes(letterSpacing),
    [`_snui-line-height-${lineHeight}`]:
      lineHeight !== '' && sizes.includes(lineHeight),
    [`_snui-line-height-${sizes[level - 1]}`]: !sizes.includes(lineHeight),
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

  if (fontSize !== 'md') {
    if (fontSize === 'xxl') {
      if (level === 1) {
        styles.fontSize = '6.5rem';
        styles.lineHeight = '6.85rem';
      } else if (level === 2) {
        styles.fontSize = '4.5rem';
        styles.lineHeight = '4.75rem';
      } else if (level === 3) {
        styles.fontSize = '3rem';
        styles.lineHeight = '3.75rem';
      }
    } else if (fontSize === 'xl') {
      if (level === 1) {
        styles.fontSize = '4.7rem';
        styles.lineHeight = '4.55rem';
      } else if (level === 2) {
        styles.fontSize = '4rem';
        styles.lineHeight = '3.75rem';
      } else if (level === 3) {
        styles.fontSize = '2.5rem';
        styles.lineHeight = '2.75rem';
      }
    } else if (fontSize === 'lg') {
      if (level === 1) {
        styles.fontSize = '4.1rem';
        styles.lineHeight = '3.75rem';
      } else if (level === 2) {
        styles.fontSize = '3.5rem';
        styles.lineHeight = '3.75rem';
      } else if (level === 3) {
        styles.fontSize = '1.75rem';
        styles.lineHeight = '1.75rem';
      }
    } else if (fontSize === 'sm') {
      if (level === 1) {
        styles.fontSize = '2.325rem';
        styles.lineHeight = '2.5rem';
      } else if (level === 2) {
        styles.fontSize = '1.75rem';
        styles.lineHeight = '2rem';
      } else if (level === 3) {
        styles.fontSize = '1.375rem';
        styles.lineHeight = '1.75rem';
      }
    } else if (fontSize === 'xs') {
      if (level === 1) {
        styles.fontSize = '1.95rem';
        styles.lineHeight = '2rem';
      } else if (level === 2) {
        styles.fontSize = '1.5rem';
        styles.lineHeight = '1.72rem';
      } else if (level === 3) {
        styles.fontSize = '1rem';
        styles.lineHeight = '1.75rem';
      }
    }
    if (level === 4) {
      styles.fontSize = '1.125rem';
      styles.lineHeight = '1.5rem';
    } else if (level === 5) {
      styles.fontSize = '1rem';
      styles.lineHeight = '1.375rem';
    } else if (level === 6) {
      styles.fontSize = '0.875rem';
      styles.lineHeight = '1.25rem';
    }
  }
  const heading = createElement(
    `h${level}`,
    {
      className: classes,
      style: styles,
    },
    children
  );

  return heading;
};

export default Heading;
