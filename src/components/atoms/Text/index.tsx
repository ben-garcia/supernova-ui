import React from 'react';

import { createClasses, createElement, createStyles } from '../../../utils';
import { TextProps } from './types';

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
    [`_snui-color-${backgroundColor}`]: backgroundColor !== '',
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
      lineHeight !== '' && sizes.includes(lineHeight),
    [`_snui-margin-${margin}`]: margin !== '' && sizes.includes(margin),
    [`_snui-padding-${padding}`]: padding !== '' && sizes.includes(padding),
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
