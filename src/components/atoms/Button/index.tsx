import React, { useState } from 'react';

import Spinner from '../Spinner';
import { ButtonProps } from './types';
import { Sizes } from '../../../types/common';
import './styles.scss';

import {
  colors,
  createClasses,
  createStyles,
  isString,
  radii,
  responsify,
  shadows,
  sizes,
} from '../../../utils';

import { MarginPaddingProps } from '../../../types';
import { useBreakpoint, useTheme } from '../../../hooks';

/**
 * UI interactive component used to trigger an action
 */
const Button: React.FC<ButtonProps> = props => {
  const {
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    children,
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    hoverBackgroundColor = '',
    hoverColor = '',
    isDisabled = false,
    isLoading = false,
    leftIcon = null,
    letterSpacing = '',
    lineHeight = '',
    loadingText = '',
    isTruncated = false,
    margin = '',
    onClick = () => {},
    padding = '',
    rightIcon = null,
    spinner = null,
    textTransform = '',
    variant = 'filled',
    width = '',
    ...rest // aria-* props
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const [focusRingColor, setFocusRingColor] = useState(
    theme.colors.focusRing || '#4299e1'
  );
  const [hoverBackgroundColorToUse, setHoverBackgroundColorToUse] = useState(
    ''
  );
  const [hoverColorToUse, setHoverColorToUse] = useState('');
  const classes = createClasses(
    '_snui-button _snui-inline-flex _snui-flex-center',
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
      '_snui-disabled': isDisabled || isLoading,
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
      [`_snui-button-${variant}`]: isString(variant),
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

  responsify(
    'paddingInline',
    fontSize,
    styles,
    theme.spacing,
    breakpoint,
    sizes
  );

  responsify(
    'height',
    fontSize,
    styles,
    {
      xs: `calc(${theme.spacing.xs} * 5)`,
      sm: `calc(${theme.spacing.sm} * 5)`,
      md: `calc(${theme.spacing.md} * 2)`,
      lg: `calc(${theme.spacing.lg} * 2)`,
      xl: `calc(${theme.spacing.xl} * 2)`,
      xxl: `calc(${theme.spacing.xxl} * 2)`,
    },
    breakpoint,
    sizes
  );

  if (isString(fontSize) && sizes.includes(fontSize as string)) {
    if (fontSize === 'xs' || fontSize === 'sm') {
      styles.paddingInlineStart = `${theme.spacing[fontSize as Sizes]}`;
      styles.paddingInlineEnd = `${theme.spacing[fontSize as Sizes]}`;
      styles.height = `calc(${theme.spacing[fontSize as Sizes]} * 5)`;
    } else {
      styles.paddingInlineStart = `${theme.spacing[fontSize as Sizes]}`;
      styles.paddingInlineEnd = `${theme.spacing[fontSize as Sizes]}`;
      styles.height = `calc(${theme.spacing[fontSize as Sizes]} * 2)`;
    }
  } else if (isString(fontSize) && !sizes.includes(fontSize as string)) {
    styles.paddingInlineStart = fontSize as string;
    styles.paddingInlineEnd = fontSize as string;
    styles.height = `calc(${fontSize} * 2)`;
  }

  return (
    <button
      {...rest}
      className={classes}
      disabled={isDisabled || isLoading}
      onBlur={() => setFocusRingColor('')}
      onClick={onClick}
      onFocus={() => setFocusRingColor(theme.colors.focusRing)}
      style={{
        ...styles,
        backgroundColor: hoverBackgroundColorToUse,
        boxShadow: (isString(focusRingColor)
          ? `0 0 0 4px ${focusRingColor}`
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
      type="button"
    >
      {leftIcon && !isLoading && leftIcon}
      {!spinner && !isLoading && (leftIcon || rightIcon) && (
        <span
          style={{
            margin: leftIcon || rightIcon ? '0.2rem 0.5rem 0 0.5rem' : '',
          }}
        >
          {children}
        </span>
      )}
      {!spinner && !isLoading && !leftIcon && !rightIcon && <>{children}</>}
      {!spinner && isLoading && (
        <Spinner
          size={fontSize || 'sm'}
          primaryColor={variant === 'filled' ? '#fff' : '#000'}
        />
      )}
      {spinner && spinner}
      {isLoading && isString(loadingText) && (
        <span className="_snui-self-center _snui-margin-left-sm">
          {loadingText}
        </span>
      )}
      {rightIcon && !isLoading && rightIcon}
    </button>
  );
};

export default Button;
