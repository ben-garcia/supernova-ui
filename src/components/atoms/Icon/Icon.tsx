import React from 'react';

import { Sizes } from 'types/common';
import { IconBaseProps } from './types';

import { createClasses, createStyles, isString, sizes } from '../../../utils';
import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';

/**
 * The base Icon component
 */
const Icon: React.FC<IconBaseProps> = props => {
  const {
    children,
    fill = '',
    size = 'md',
    viewBox = '0 0 4.208 4.208',
    width = '',
    height = '',
    padding = '',
    margin = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const classes = createClasses('', {
    [`snui-height-${height}`]:
      isString(height) && sizes.includes(height as string),
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
    [`snui-width-${width}`]: isString(width) && sizes.includes(width as string),
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
      styles.height = `calc(${theme.sizes[size as Sizes]} * 2)`;
      styles.width = `calc(${theme.sizes[size as Sizes]} * 2)`;
    } else {
      // when size isn't found in the theme
      styles.height = size as string;
      styles.width = size as string;
    }
  }
  if (isString(fill)) {
    if ((theme as any).colors[fill]) {
      styles.fill = (theme as any).colors[fill];
    } else {
      styles.fill = fill;
    }
  }

  return (
    <svg
      {...rest}
      aria-hidden="true"
      className={classes}
      focusable="false"
      style={styles}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
};

export default Icon;
