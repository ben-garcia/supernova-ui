import React from 'react';

import { useBreakpoint, useTheme } from '@hooks/index';
import {
  colors,
  createClasses,
  createElement,
  createStyles,
  isString,
  sizes,
} from '@utils/index';

import { MarginPaddingProps } from '@/types/index';
import { TextProps } from './types';

/**
 * UI component to display individual pieces of text
 */
const Text: React.FC<TextProps> = props => {
  const {
    backgroundColor = '',
    children,
    className = '',
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    padding = '',
    tag = 'span',
    textTransform = '',
    width = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('', {
    [`${className}`]: isString(className),
    [`snui-color-${backgroundColor}`]:
      backgroundColor &&
      backgroundColor !== '' &&
      colors.includes(backgroundColor),
    [`snui-color-${color}`]: isString(color) && colors.includes(color),
    [`snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    'snui-font-mono': tag === 'kbd' || tag === 'samp',
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
      theme,
      width,
    },
    theme,
    breakpoint
  );
  const text = createElement(
    `${tag}`,
    {
      ...rest,
      className: classes,
      style: styles,
    },
    children
  );

  return text;
};

export default Text;
