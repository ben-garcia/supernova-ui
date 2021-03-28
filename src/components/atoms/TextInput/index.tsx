import React, { useState, useMemo } from 'react';

import { TextInputProps } from './types';
import './styles.scss';

import {
  colors,
  createClasses,
  createStyles,
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
const TextInput: React.FC<TextInputProps> = props => {
  const {
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    floatLabel = false,
    height = '',
    hoverBackgroundColor = '',
    hoverColor = '',
    isDisabled = false,
    label = null,
    leftIcon = null,
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    onChange = null,
    padding = '',
    rightIcon = null,
    size = 'md',
    textTransform = '',
    value = null,
    variant = 'outline',
    width = '',
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const [inputValue, setInputValue] = useState(value || '');
  const [focusRingColor, setFocusRingColor] = useState(
    theme.colors.focusRing || '#4299e1'
  );
  // box shadow is different when variant is 'flushed'
  // the effect needs to be below the border
  const [boxShadowValues] = useState(
    variant !== 'flushed' ? '0 0 0 3px' : '0 3px 0 0'
  );
  const [hoverBackgroundColorToUse, setHoverBackgroundColorToUse] = useState(
    ''
  );
  const [hoverColorToUse, setHoverColorToUse] = useState('');
  const inputId = useMemo(
    () => `_snui-text-input-id-${Math.random().toFixed(10)}`,
    []
  );
  const [labelClasses, setLabelClasses] = useState(
    '_snui-text-label _snui-position-absolute _snui-position-top-left'
  );
  const classes = createClasses(
    '_snui-text-input _snui-inline-flex _snui-flex-center',
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
      [`_snui-text-input-${variant}`]: isString(variant),
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

  if (isString(size)) {
    if (sizes.includes(size as string)) {
      if (size === 'lg' || size === 'xl' || size === 'xxl') {
        styles.fontSize = `${theme.typography.fontSizes.lg}`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 1.05)`;
      } else if (size === 'xs') {
        styles.fontSize = `calc(${theme.typography.fontSizes.xs} * 1.2)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 1.7)`;
      } else if (size === 'sm') {
        styles.fontSize = `calc(${theme.typography.fontSizes.xs} * 1.2)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 1.3)`;
      } else if (size === 'md') {
        styles.fontSize = `${theme.typography.fontSizes[size as Sizes]}`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 1.12)`;
      }
      styles.paddingInline = theme.spacing.md;
    } else {
      styles.fontSize = `calc(${size} * 0.5)`;
      styles.height = size as string;
      styles.paddingInline = theme.spacing.md;
    }
  } else if (isObject(size)) {
    responsify('height', size, styles, theme.sizes, breakpoint, sizes);
    responsify('fontSize', size, styles, theme.sizes, breakpoint, sizes);
  }

  if (leftIcon) {
    styles.paddingLeft = `calc(${theme.spacing[size as Sizes]} * 2)`;
  }

  if (rightIcon) {
    styles.paddingRight = `calc(${theme.spacing[size as Sizes]} * 2)`;
  }

  return (
    <div className="_snui-position-relative">
      {leftIcon && (
        <div className="_snui-position-absolute _snui-position-top-left _snui-padding-left-sm">
          {leftIcon}
        </div>
      )}
      {floatLabel && isString(label) && (
        <label className={labelClasses} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        aria-label={!floatLabel && isString(label) ? `${label}` : undefined}
        className={classes}
        disabled={isDisabled}
        id={inputId}
        onBlur={() => {
          setFocusRingColor('');
          if (!isString(inputValue)) {
            setLabelClasses(
              '_snui-text-label _snui-position-absolute _snui-position-top-left'
            );
          }
        }}
        onChange={e => {
          if (typeof onChange === 'function') {
            onChange(e);
          } else {
            setInputValue(e.target.value);
          }
        }}
        onFocus={() => {
          setFocusRingColor(theme.colors.focusRing);
          if (!isString(inputValue)) {
            setLabelClasses(`${labelClasses} _snui-text-label-floating`);
          }
        }}
        style={{
          ...styles,
          backgroundColor: hoverBackgroundColorToUse,
          boxShadow: (isString(focusRingColor)
            ? `${boxShadowValues} ${focusRingColor}`
            : null) as any,
          color: hoverColorToUse,
        }}
        onMouseEnter={() => {
          if (colors.includes(hoverBackgroundColor)) {
            setHoverBackgroundColorToUse(
              (theme as any).colors[hoverBackgroundColor]
            );
          } else {
            setHoverBackgroundColorToUse(
              isString(hoverBackgroundColor) ? hoverBackgroundColor : ''
            );
          }

          if (colors.includes(hoverColor)) {
            setHoverColorToUse((theme as any).colors[hoverColor]);
          } else {
            setHoverColorToUse(isString(hoverColor) ? hoverColor : '');
          }
        }}
        onMouseLeave={() => {
          setHoverBackgroundColorToUse('');
          setHoverColorToUse('');
        }}
        type="text"
        value={inputValue}
      />
      {rightIcon && (
        <div className="_snui-position-absolute _snui-position-top-right _snui-padding-right-sm">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default TextInput;