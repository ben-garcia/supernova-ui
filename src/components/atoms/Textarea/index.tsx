import React, { forwardRef, useState, useMemo } from 'react';

import { TextareaProps } from './types';
import './styles.scss';

import {
  colors,
  createClasses,
  createStyles,
  isObject,
  isFunction,
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
 * UI textarea component used to enter multiple lines of text
 */
const Textarea = forwardRef((props: TextareaProps, ref: any) => {
  const {
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    color = '',
    finalLabelTransform = null,
    font = 'body',
    fontSize = '',
    fontWeight = '',
    floatLabel = false,
    height = '',
    hoverBackgroundColor = '',
    hoverColor = '',
    initialLabelTransform = null,
    isDisabled = false,
    label = undefined,
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    onChange = null,
    padding = '',
    resize = 'none',
    size = 'md',
    textTransform = '',
    value = null,
    variant = 'outline',
    width = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const [textareaValue, setTextareaValue] = useState(value || '');
  const [focusRingColor, setFocusRingColor] = useState('');
  // box shadow is different when variant is 'flushed'
  // the effect needs to be below the border
  const [boxShadowValues] = useState(
    variant !== 'flushed' ? '0 0 0 3px' : '0 3px 0 0'
  );
  const [hoverBackgroundColorToUse, setHoverBackgroundColorToUse] = useState(
    ''
  );
  const [hoverColorToUse, setHoverColorToUse] = useState('');
  const textareaId = useMemo(
    () => `_snui-textarea-${Math.random().toFixed(10)}`,
    []
  );
  const [labelClasses, setLabelClasses] = useState(
    '_snui-textarea-label _snui-position-absolute _snui-position-top-left'
  );
  const [labelTransition, setLabelTransition] = useState(
    initialLabelTransform ?? 'translate(2.5rem, 50%) scale(1.4)'
  );
  const [labelColor, setLabelColor] = useState('');
  const classes = createClasses(
    '_snui-textarea _snui-inline-flex _snui-flex-center',
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
      [`_snui-textarea-${variant}`]: isString(variant),
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
      if (size === 'xs' || size === 'sm' || size === 'md') {
        styles.fontSize = `calc(${
          theme.typography.fontSizes[size as Sizes]
        } * 1.2)`;
      } else {
        styles.fontSize = theme.typography.fontSizes.lg;
      }
      styles.paddingInlineStart = theme.spacing.md;
      styles.paddingInlineEnd = theme.spacing.md;
    } else {
      styles.fontSize = `calc(${size} * 0.5)`;
      styles.paddingInlineStart = theme.spacing.md;
      styles.paddingInlineEnd = theme.spacing.md;
    }
  } else if (isObject(size)) {
    responsify('fontSize', size, styles, theme.sizes, breakpoint, sizes);
  }

  return (
    <div className="_snui-position-relative">
      {floatLabel && isString(label) && (
        <label
          className={`${labelClasses} ${isDisabled ? '_snui-disabled' : ''}`}
          htmlFor={textareaId}
          style={{
            transform: isString(finalLabelTransform) ? labelTransition : '',
            color: labelColor,
          }}
        >
          {label}
        </label>
      )}
      {!floatLabel && isString(label) && (
        <label
          className={`_snui-visually-hidden ${
            isDisabled ? '_snui-disabled' : ''
          }`}
          htmlFor={textareaId}
        >
          {label}
        </label>
      )}
      <textarea
        {...rest}
        className={classes}
        disabled={isDisabled}
        id={textareaId}
        onBlur={() => {
          setFocusRingColor('');
          if (!isString(textareaValue)) {
            setLabelClasses(
              '_snui-textarea-label _snui-position-absolute _snui-position-top-left'
            );
          }
          if (
            labelTransition &&
            !isString(textareaValue) &&
            !initialLabelTransform
          ) {
            setLabelTransition('translate(2.5rem, 50%) scale(1.4)');
            // remove color from the label
            setLabelColor('');
          }
          if (!isString(textareaValue) && initialLabelTransform) {
            setLabelTransition(initialLabelTransform);
          }
        }}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(onChange)) {
              onChange!(e);
            }
            setTextareaValue(e.target.value);
          }
        }}
        onFocus={() => {
          setFocusRingColor(theme.colors.focusRing);
          // add focus ring color to the label
          setLabelColor(theme.colors.focusRing);

          if (!isString(textareaValue)) {
            setLabelClasses(`${labelClasses} _snui-textarea-label-floating`);
          }

          if (isString(finalLabelTransform)) {
            setLabelTransition(finalLabelTransform as string);
          }
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
        placeholder={!floatLabel ? label : undefined}
        ref={ref}
        style={{
          ...styles,
          backgroundColor: hoverBackgroundColorToUse,
          boxShadow: (isString(focusRingColor)
            ? `${boxShadowValues} ${focusRingColor}`
            : null) as any,
          color: hoverColorToUse,
          resize: isString(resize) ? resize : 'none',
        }}
        value={textareaValue}
      />
    </div>
  );
});

export default Textarea;
