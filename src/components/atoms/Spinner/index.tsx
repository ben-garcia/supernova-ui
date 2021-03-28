import React from 'react';

import { Sizes } from 'types/common';
import { SpinnerProps } from './types';

import { createClasses, createStyles, isString, sizes } from '../../../utils';
import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';
import './styles.scss';

/**
 * The Spinner component
 */
const Spinner: React.FC<SpinnerProps> = props => {
  const {
    ariaLabel = 'Action is being processed',
    borderWidth = '4px',
    duration = '1s',
    height = '',
    padding = '',
    primaryColor = 'info700',
    margin = '',
    size = 'md',
    secondaryColor = 'transparent',
    width = '',
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('_snui-spinner', {
    [`_snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
    // margin
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
    [`_snui-width-${width}`]:
      isString(width) && sizes.includes(width as string),
  });
  const styles = createStyles(
    {
      height,
      margin,
      padding,
      width,
      size,
    },
    theme,
    breakpoint
  );

  // width and height takes precedence
  // check that size is a string
  if (isString(size) && !width && !height) {
    // check for a valid size
    if (sizes.includes(size as string)) {
      styles.height = `calc(${theme.sizes[size as Sizes]} * 1.5)`;
      styles.width = `calc(${theme.sizes[size as Sizes]} * 1.5)`;
    } else {
      // when size isn't found in the theme
      styles.height = size as string;
      styles.width = size as string;
    }
  }

  // configure the primary color
  if (isString(primaryColor) && primaryColor !== 'info700') {
    styles.borderBottomColor = primaryColor;
    styles.borderRightColor = primaryColor;
  }

  // configure the secondary color
  if (isString(secondaryColor) && secondaryColor !== 'transparent') {
    styles.borderLeftColor = secondaryColor;
    styles.borderTopColor = secondaryColor;
  }

  // configure the animation duration
  if (isString(duration) && duration !== '1s') {
    styles.animationDuration = duration;
  }

  // configure the border width
  if (isString(borderWidth) && borderWidth !== '4px') {
    styles.borderWidth = borderWidth;
  }

  return <div aria-label={ariaLabel} className={classes} style={styles} />;
};

export default Spinner;
