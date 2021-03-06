import React from 'react';

import { createClasses, createStyles } from '../../../../utils';
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
    fontSize = 'xl',
    fontWeight = 'xxl',
    height = '',
    letterSpacing = 'md',
    lineHeight = 'lg',
    isTruncated = false,
    margin = '',
    padding = '',
    tag = 'h1',
    width = '',
  } = props;
  const colors = ['error', 'info', 'primary', 'success', 'warning'];
  const sizes = [
    'xxxxs',
    'xxxs',
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl',
    'xxxxl',
  ];
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
    width,
  });
  let tagElement;

  switch (tag) {
    case 'h2':
      tagElement = (
        <h2 className={classes} style={styles}>
          {children}
        </h2>
      );
      break;
    case 'h3':
      tagElement = (
        <h3 className={classes} style={styles}>
          {children}
        </h3>
      );
      break;
    case 'h4':
      tagElement = (
        <h4 className={classes} style={styles}>
          {children}
        </h4>
      );
      break;
    case 'h5':
      tagElement = (
        <h5 className={classes} style={styles}>
          {children}
        </h5>
      );
      break;
    case 'h6':
      tagElement = (
        <h6 className={classes} style={styles}>
          {children}
        </h6>
      );
      break;
    default:
      tagElement = (
        <h1 className={classes} style={styles}>
          {children}
        </h1>
      );
  }
  return tagElement;
};

export default Heading;
