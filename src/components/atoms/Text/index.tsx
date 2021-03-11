import React from 'react';

import { createClasses, createElement, createStyles } from '../../../utils';
import { TextProps } from './types';
import { MarginPaddingProps } from '../../../types';

/**
 * Ui component to display individual pieces of text
 */
const Text: React.FC<TextProps> = props => {
  const {
    backgroundColor = '',
    children,
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
  } = props;
  const colors = ['error', 'info', 'primary', 'success', 'warning'];
  const sizes = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const classes = createClasses('_snui-text', {
    [`_snui-color-${backgroundColor}`]:
      backgroundColor &&
      backgroundColor !== '' &&
      colors.includes(backgroundColor),
    [`_snui-color-$color}`]: color !== '' && colors.includes(color),
    [`_snui-font-${font}`]:
      (font && font === 'heading') || font === 'body' || font === 'mono',
    '_snui-font-mono': tag === 'kbd' || tag === 'samp',
    [`_snui-text-${fontSize}`]: sizes.includes(fontSize),
    [`_snui-font-weight-${fontWeight}`]:
      fontWeight !== '' && sizes.includes(fontWeight),
    [`_snui-font-${height}`]: height !== '' && sizes.includes(height),
    '_snui-text-truncated': isTruncated,
    [`_snui-letter-spacing-${letterSpacing}`]: sizes.includes(letterSpacing),
    [`_snui-line-height-${lineHeight}`]:
      // margin
      lineHeight !== '' && sizes.includes(lineHeight),
    [`_snui-margin-${margin}`]:
      typeof margin === 'string' && margin !== '' && sizes.includes(margin),
    [`_snui-margin-bottom-${(margin as MarginPaddingProps).bottom}`]:
      typeof margin === 'object' &&
      margin.bottom &&
      typeof margin.bottom === 'string' &&
      sizes.includes((margin as MarginPaddingProps).bottom as string),
    [`_snui-margin-left-${(margin as MarginPaddingProps).left}`]:
      typeof margin === 'object' &&
      margin.left &&
      typeof margin.left === 'string' &&
      sizes.includes((margin as MarginPaddingProps).left as string),
    [`_snui-margin-right-${(margin as MarginPaddingProps).right}`]:
      typeof margin === 'object' &&
      margin.right &&
      typeof margin.right === 'string' &&
      sizes.includes((margin as MarginPaddingProps).right as string),
    [`_snui-margin-top-${(margin as MarginPaddingProps).top}`]:
      typeof margin === 'object' &&
      margin.top &&
      typeof margin.top === 'string' &&
      sizes.includes((margin as MarginPaddingProps).top as string),
    [`_snui-margin-x-${(margin as MarginPaddingProps).x}`]:
      // make sure that left and right properties have not been defined
      !(margin as MarginPaddingProps).left &&
      !(margin as MarginPaddingProps).right &&
      typeof margin === 'object' &&
      margin.x &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).x as string),
    [`_snui-margin-y-${(margin as MarginPaddingProps).y}`]:
      // make sure that top and bottom properties have not been defined
      !(margin as MarginPaddingProps).bottom &&
      !(margin as MarginPaddingProps).top &&
      typeof margin === 'object' &&
      margin.y &&
      typeof margin.y === 'string' &&
      sizes.includes((margin as MarginPaddingProps).y as string),
    // padding
    [`_snui-padding-${padding}`]:
      typeof padding === 'string' && padding !== '' && sizes.includes(padding),
    [`_snui-padding-bottom-${(padding as MarginPaddingProps).bottom}`]:
      typeof padding === 'object' &&
      padding.bottom &&
      typeof padding.bottom === 'string' &&
      sizes.includes((padding as MarginPaddingProps).bottom as string),
    [`_snui-padding-left-${(padding as any).left}`]:
      typeof padding === 'object' &&
      padding.left &&
      sizes.includes((padding as MarginPaddingProps).left as string),
    [`_snui-padding-right-${(padding as MarginPaddingProps).right}`]:
      typeof padding === 'object' &&
      padding.right &&
      typeof padding.right === 'string' &&
      sizes.includes((padding as MarginPaddingProps).right as string),
    [`_snui-padding-top-${(padding as any).top}`]:
      typeof padding === 'object' &&
      padding.top &&
      typeof padding.top === 'string' &&
      sizes.includes((padding as MarginPaddingProps).top as string),
    [`_snui-padding-x-${(padding as MarginPaddingProps).x}`]:
      !(padding as MarginPaddingProps).left &&
      !(padding as MarginPaddingProps).right &&
      typeof padding === 'object' &&
      padding.x &&
      typeof padding.x === 'string' &&
      sizes.includes((padding as MarginPaddingProps).x as string),
    [`_snui-padding-y-${(padding as MarginPaddingProps).y}`]:
      !(padding as MarginPaddingProps).bottom &&
      !(padding as MarginPaddingProps).top &&
      typeof padding === 'object' &&
      padding.y &&
      typeof padding.y === 'string' &&
      sizes.includes((padding as MarginPaddingProps).y as string),
    [`_snui-text-${textTransform}`]:
      textTransform === 'capitalize' ||
      textTransform === 'lowercase' ||
      textTransform === 'uppercase',
    [`_snui-width-${width}`]: width !== '' && sizes.includes(width),
  });
  const styles = createStyles({
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
  const text = createElement(
    `${tag}`,
    {
      className: classes,
      style: styles,
    },
    children
  );

  return text;
};

export default Text;
