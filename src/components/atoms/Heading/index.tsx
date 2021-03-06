import React from 'react';

import {
  colors,
  createClasses,
  createElement,
  createStyles,
  isString,
  sizes,
} from '../../../utils';
import { HeadingProps } from './types';
import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';

/**
 * Ui component to display headings
 */
const Heading: React.FC<HeadingProps> = props => {
  const {
    align = 'left',
    backgroundColor = '',
    children,
    className = '',
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
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('', {
    [`${className}`]: isString(className),
    [`snui-text-${align}`]:
      align === 'center' || align === 'left' || align === 'right',
    [`snui-color-${backgroundColor}`]: backgroundColor !== '',
    [`snui-color-$color}`]: isString(color) && colors.includes(color),
    [`snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    [`snui-text-${fontSize}`]:
      isString(fontSize) && sizes.includes(fontSize as string),
    [`snui-text-${sizes[level - 1]}`]:
      fontSize === '' && !sizes.includes(fontSize as string),
    [`snui-font-weight-${fontWeight}`]:
      isString(fontWeight) &&
      fontWeight !== 'xxl' &&
      sizes.includes(fontWeight),
    [`snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
    'snui-text-truncated': isTruncated,
    [`snui-letter-spacing-${letterSpacing}`]:
      isString(letterSpacing) && sizes.includes(letterSpacing),
    [`snui-line-height-${lineHeight}`]:
      isString(lineHeight) && sizes.includes(lineHeight),
    [`snui-line-height-${sizes[level - 1]}`]: !sizes.includes(lineHeight),
    // margin
    [`snui-margin-${margin}`]:
      typeof margin === 'string' && margin !== '' && sizes.includes(margin),
    [`snui-margin-bottom-${(margin as MarginPaddingProps).bottom}`]:
      typeof margin === 'object' &&
      margin.bottom &&
      typeof margin.bottom === 'string' &&
      sizes.includes((margin as MarginPaddingProps).bottom as string),
    [`snui-margin-left-${(margin as MarginPaddingProps).left}`]:
      typeof margin === 'object' &&
      margin.left &&
      typeof margin.left === 'string' &&
      sizes.includes((margin as MarginPaddingProps).left as string),
    [`snui-margin-right-${(margin as MarginPaddingProps).right}`]:
      typeof margin === 'object' &&
      margin.right &&
      typeof margin.right === 'string' &&
      sizes.includes((margin as MarginPaddingProps).right as string),
    [`snui-margin-top-${(margin as MarginPaddingProps).top}`]:
      typeof margin === 'object' &&
      margin.top &&
      typeof margin.top === 'string' &&
      sizes.includes((margin as MarginPaddingProps).top as string),
    [`snui-margin-x-${(margin as MarginPaddingProps).x}`]:
      // make sure that left and right properties have not been defined
      !(margin as MarginPaddingProps).left &&
      !(margin as MarginPaddingProps).right &&
      typeof margin === 'object' &&
      margin.x &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).x as string),
    [`snui-margin-y-${(margin as MarginPaddingProps).y}`]:
      // make sure that top and bottom properties have not been defined
      !(margin as MarginPaddingProps).bottom &&
      !(margin as MarginPaddingProps).top &&
      typeof margin === 'object' &&
      margin.y &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).y as string),
    // padding
    [`snui-padding-${padding}`]:
      typeof padding === 'string' && padding !== '' && sizes.includes(padding),
    [`snui-padding-bottom-${(padding as MarginPaddingProps).bottom}`]:
      typeof padding === 'object' &&
      padding.bottom &&
      typeof padding.bottom === 'string' &&
      sizes.includes((padding as MarginPaddingProps).bottom as string),
    [`snui-padding-left-${(padding as any).left}`]:
      typeof padding === 'object' &&
      padding.left &&
      sizes.includes((padding as MarginPaddingProps).left as string),
    [`snui-padding-right-${(padding as MarginPaddingProps).right}`]:
      typeof padding === 'object' &&
      padding.right &&
      typeof padding.right === 'string' &&
      sizes.includes((padding as MarginPaddingProps).right as string),
    [`snui-padding-top-${(padding as any).top}`]:
      typeof padding === 'object' &&
      padding.top &&
      typeof padding.top === 'string' &&
      sizes.includes((padding as MarginPaddingProps).top as string),
    [`snui-padding-x-${(padding as MarginPaddingProps).x}`]:
      !(padding as MarginPaddingProps).left &&
      !(padding as MarginPaddingProps).right &&
      typeof padding === 'object' &&
      padding.x &&
      typeof padding.x === 'string' &&
      sizes.includes((padding as MarginPaddingProps).x as string),
    [`snui-padding-y-${(padding as MarginPaddingProps).y}`]:
      !(padding as MarginPaddingProps).bottom &&
      !(padding as MarginPaddingProps).top &&
      typeof padding === 'object' &&
      padding.y &&
      typeof padding.y === 'string' &&
      sizes.includes((padding as MarginPaddingProps).y as string),

    [`snui-text-${textTransform}`]:
      textTransform === 'capitalize' ||
      textTransform === 'lowercase' ||
      textTransform === 'uppercase',
    [`snui-width-${width}`]: isString(width) && sizes.includes(width as string),
  });

  const styles = createStyles(
    {
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
    },
    theme,
    breakpoint
  );

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
      ...rest,
      className: classes,
      style: styles,
    },
    children
  );

  return heading;
};

export default Heading;
