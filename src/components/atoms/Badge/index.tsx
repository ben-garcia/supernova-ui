import React from 'react';

import {
  colors,
  createClasses,
  createStyles,
  isString,
  sizes,
} from '../../../utils';
import { BadgeProps } from './types';
import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';

/**
 * UI component to display an item's summary information.
 */
const Badge: React.FC<BadgeProps> = props => {
  const {
    backgroundColor = '',
    children,
    className = '',
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = 'xxl',
    height = '',
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    padding = 'xs xs 0 xs',
    textTransform = 'uppercase',
    variant = 'solid',
    width = '',
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('snui-badge', {
    [`${className}`]: isString(className),
    [`snui-color-${color}`]: isString(color) && colors.includes(color),
    [`snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    [`snui-text-${fontSize}`]:
      isString(fontSize) && sizes.includes(fontSize as string),
    [`snui-font-weight-${fontWeight}`]:
      isString(fontWeight) && sizes.includes(fontWeight),
    [`snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
    'snui-text-truncated': isTruncated,
    [`snui-letter-spacing-${letterSpacing}`]:
      isString(letterSpacing) && sizes.includes(letterSpacing),
    [`snui-line-height-${lineHeight}`]:
      lineHeight !== '' && sizes.includes(lineHeight),
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
    // text should be inline block if prop include width, padding, margin, and/or height
    'snui-display-inline-block': width || padding || margin || height,
  });
  const styles = createStyles(
    {
      // backgroundColor shouldn't change when variant is outline
      backgroundColor: variant !== 'outline' ? color : undefined,
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
      theme,
      width,
    },
    theme,
    breakpoint
  );

  if (variant === 'outline') {
    if (!isString(color)) {
      styles.border = `1px solid ${theme.colors.gray500}`;
      styles.color = theme.colors.gray500;
    } else if ((theme as any).colors[color]) {
      styles.border = `1px solid ${(theme as any).colors[color]}`;
      styles.color = (theme as any).colors[color];
    } else {
      styles.border = `1px solid ${color}`;
      styles.color = color;
    }
  } else if (variant === 'solid') {
    if (!isString(backgroundColor)) {
      styles.backgroundColor = theme.colors.gray500;
    } else if ((theme as any).colors[backgroundColor]) {
      styles.backgroundColor = (theme as any).colors[backgroundColor];
    } else {
      styles.backgroundColor = backgroundColor;
    }

    if (!isString(color)) {
      styles.color = theme.colors.white;
    } else if ((theme as any).colors[color]) {
      styles.color = (theme as any).colors[color];
    } else {
      styles.color = color;
    }
  }

  return (
    <span className={classes} style={styles}>
      {children}
    </span>
  );
};

export default Badge;
