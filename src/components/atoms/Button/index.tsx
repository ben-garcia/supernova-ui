/* eslint react/button-has-type: 0 */
import React, { forwardRef, useEffect, useState } from 'react';

import Spinner from '../Spinner';
import { ButtonProps } from './types';
import { Sizes } from '../../../types/common';
import './styles.scss';

import {
  createClasses,
  createStyles,
  isFunction,
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
const Button = forwardRef((props: ButtonProps, ref: any) => {
  const {
    asSubmitButton = false,
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    children,
    className = '',
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
    onFocus,
    onMouseEnter = null,
    onMouseLeave = null,
    padding = '',
    rightIcon = null,
    spinner = null,
    textTransform = '',
    variant = 'filled',
    width = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const [focusRingColor, setFocusRingColor] = useState('');
  const [backgroundColorToUse, setBackgroundColorToUse] = useState('');
  const [colorToUse, setColorToUse] = useState('');

  useEffect(() => {
    if (isString(backgroundColor)) {
      if ((theme as any).colors[backgroundColor]) {
        setBackgroundColorToUse((theme as any).colors[backgroundColor]);
      } else {
        setBackgroundColorToUse(backgroundColor);
      }
    }
    if (isString(color)) {
      if ((theme as any).colors[color]) {
        setColorToUse((theme as any).colors[color]);
      } else {
        setColorToUse(color);
      }
    }
  }, []);

  const classes = createClasses(
    'snui-button snui-inline-flex snui-flex-center',
    {
      [`snui-border-radius-${borderRadius}`]:
        isString(borderRadius) && radii.includes(borderRadius),
      [`snui-box-shadow-${boxShadow}`]:
        isString(boxShadow) && shadows.includes(boxShadow),
      [className]: isString(className),
      [`snui-font-${font}`]:
        (font && font === 'heading') || font === 'body' || font === 'mono',
      [`snui-text-${fontSize}`]:
        isString(fontSize) && sizes.includes(fontSize as string),
      [`snui-font-weight-${fontWeight}`]:
        isString(fontWeight) && sizes.includes(fontWeight),
      [`snui-height-${height}`]:
        isString(height) && sizes.includes(height as string),
      'snui-disabled': isDisabled || isLoading,
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
        typeof padding === 'string' &&
        padding !== '' &&
        sizes.includes(padding),
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
      [`snui-button-${variant}`]: isString(variant),
      [`snui-width-${width}`]:
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
      onBlur={() => {
        setFocusRingColor('');

        if (isFunction(onMouseLeave)) {
          onMouseLeave!();
        }
      }}
      onClick={onClick}
      onFocus={() => {
        if (isFunction(onFocus)) {
          onFocus!();
        }
        setFocusRingColor(theme.colors.focusRing);

        if (isFunction(onMouseEnter)) {
          onMouseEnter!();
        }
      }}
      style={{
        ...styles,
        backgroundColor: backgroundColorToUse,
        boxShadow: (isString(focusRingColor)
          ? `0 0 0 4px ${focusRingColor}`
          : null) as any,
        color: colorToUse,
      }}
      onMouseEnter={e => {
        if ((theme as any).colors[hoverBackgroundColor]) {
          setBackgroundColorToUse((theme as any).colors[hoverBackgroundColor]);
        } else {
          setBackgroundColorToUse(
            isString(hoverBackgroundColor) ? hoverBackgroundColor : ''
          );
        }

        if ((theme as any).colors[hoverColor]) {
          setColorToUse((theme as any).colors[hoverColor]);
        } else {
          setColorToUse(isString(hoverColor) ? hoverColor : '');
        }

        if (isFunction(onMouseEnter)) {
          onMouseEnter!(e);
        }
      }}
      onMouseLeave={() => {
        if (isString(backgroundColor)) {
          if ((theme as any).colors[backgroundColor]) {
            setBackgroundColorToUse((theme as any).colors[backgroundColor]);
          } else {
            setBackgroundColorToUse(backgroundColor);
          }
        } else {
          setBackgroundColorToUse('');
        }
        if (isString(color)) {
          if ((theme as any).colors[color]) {
            setColorToUse((theme as any).colors[color]);
          } else {
            setColorToUse(color);
          }
        } else {
          setColorToUse('');
        }

        if (isFunction(onMouseLeave)) {
          onMouseLeave!();
        }
      }}
      ref={ref}
      type={asSubmitButton ? 'submit' : undefined}
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
        <span className="snui-self-center snui-margin-left-sm">
          {loadingText}
        </span>
      )}
      {rightIcon && !isLoading && rightIcon}
    </button>
  );
});

export default Button;
