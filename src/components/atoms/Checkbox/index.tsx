/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { forwardRef, useState } from 'react';

import { CheckmarkIcon } from '../Icon/Icons';
import { CheckboxProps } from './types';
import './styles.scss';

import {
  colors,
  createClasses,
  createStyles,
  isFunction,
  isObject,
  isString,
  radii,
  responsify,
  shadows,
  sizes,
} from '../../../utils';

import { MarginPaddingProps } from '../../../types';
import { Sizes } from '../../../types/common';
import { useBreakpoint, useTheme } from '../../../hooks';

/**
 * UI interactive component used to enter information
 */
const Checkbox = forwardRef((props: CheckboxProps, ref: any) => {
  const {
    backgroundColor = 'info700',
    borderRadius = '',
    boxShadow = '',
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    isChecked = false,
    isDisabled = false,
    label = undefined,
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    onChange = undefined,
    padding = '',
    size = 'md',
    textTransform = '',
    width = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(isChecked);
  const classes = createClasses(
    '_snui-checkbox _snui-inline-flex _snui-flex-center',
    {
      [`_snui-color-${backgroundColor}`]:
        backgroundColor &&
        backgroundColor !== '' &&
        colors.includes(backgroundColor),
      [`_snui-border-radius-${borderRadius}`]:
        isString(borderRadius) && radii.includes(borderRadius),
      [`_snui-box-shadow-${boxShadow}`]:
        isString(boxShadow) && shadows.includes(boxShadow),
      [`_snui-color-$color}`]: isString(color) && colors.includes(color),
      [`_snui-font-${font}`]:
        (font && font === 'heading') || font === 'body' || font === 'mono',
      [`_snui-text-${fontSize}`]:
        isString(fontSize) && sizes.includes(fontSize as string),
      [`_snui-font-weight-${fontWeight}`]:
        isString(fontWeight) && sizes.includes(fontWeight),
      [`_snui-height-${height}`]:
        isString(height) && sizes.includes(height as string),
      '_snui-disabled': isDisabled,
      '_snui-text-truncated': isTruncated,
      [`_snui-letter-spacing-${letterSpacing}`]:
        isString(letterSpacing) && sizes.includes(letterSpacing),
      [`_snui-line-height-${lineHeight}`]:
        lineHeight !== '' && sizes.includes(lineHeight),
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
        typeof padding === 'string' &&
        padding !== '' &&
        sizes.includes(padding),
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
      [`_snui-width-${width}`]:
        isString(width) && sizes.includes(width as string),
    }
  );
  const styles = createStyles(
    {
      backgroundColor,
      borderRadius,
      boxShadow,
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

  if (isString(backgroundColor) && checkboxIsChecked) {
    if (colors.includes(backgroundColor as string)) {
      styles.backgroundColor = `${(theme as any).colors[backgroundColor]}`;
    } else {
      styles.backgroundColor = backgroundColor;
    }
  }

  if (isString(size)) {
    if (sizes.includes(size as string)) {
      styles.height = `calc(${theme.sizes[size as Sizes]} * 0.55)`;
      styles.width = `calc(${theme.sizes[size as Sizes]} * 0.55)`;
    } else {
      styles.height = size as string;
      styles.width = size as string;
    }
  } else if (isObject(size)) {
    responsify('height', size, styles, theme.sizes, breakpoint, sizes);
    responsify('width', size, styles, theme.sizes, breakpoint, sizes);
  }

  return (
    <label
      className={`_snui-position-relative ${classes} ${
        isDisabled ? '_snui-disabled' : ''
      }`}
    >
      <input
        {...rest}
        checked={checkboxIsChecked}
        className="_snui-hidden-checkbox _snui-visually-hidden"
        disabled={isDisabled}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(onChange)) {
              onChange!(e);
            }
            setCheckboxIsChecked(e.target.checked);
          }
        }}
        ref={ref}
        type="checkbox"
      />
      <span
        className="_snui-checkbox__control"
        style={{
          ...styles,
        }}
      >
        <div className="_snui-flex _snui-flex-center _snui-fill-parent">
          {checkboxIsChecked && (
            <CheckmarkIcon fill="#fff" height="100%" width="100%" />
          )}
        </div>
      </span>
      <span className="_snui-checkbox__label">{label}</span>
    </label>
  );
});

export default Checkbox;
