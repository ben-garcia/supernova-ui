import React, { forwardRef, useState, useMemo } from 'react';

import { TextInputProps } from './types';
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
import { useBreakpoint, useFormControl, useTheme } from '../../../hooks';

/**
 * UI interactive component used to enter information
 */
const TextInput = forwardRef((props: TextInputProps, ref: any) => {
  const {
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    color = '',
    className = '',
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
    labelClassName = '',
    leftIcon = null,
    letterSpacing = '',
    lineHeight = '',
    isTruncated = false,
    margin = '',
    onBlur = null,
    onChange = null,
    padding = '',
    rightIcon = null,
    size = 'md',
    textTransform = '',
    typeOf = 'text',
    value = null,
    variant = 'outline',
    width = '',
    ...rest
  } = props;
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  const {
    hasHelpText,
    hasFeedbackText,
    id: fieldId,
    isDisabled: formControlIsDisabled,
    isInvalid,
    isRequired,
  } = useFormControl();
  const [inputValue, setInputValue] = useState(value || '');
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
  const inputId = useMemo(
    () =>
      isString(fieldId)
        ? fieldId
        : `snui-text-input-${Math.random().toFixed(10)}`,
    []
  );
  const [labelTransition, setLabelTransition] = useState(
    initialLabelTransform ?? 'translate(2.5rem, 50%) scale(1.4)'
  );
  const [labelColor, setLabelColor] = useState('');
  const [labelClasses, setLabelClasses] = useState(
    'snui-text-label snui-position-absolute'
  );
  const classes = createClasses(
    'snui-text-input snui-inline-flex snui-flex-center',
    {
      [`${className}`]: isString(className),
      [`snui-color-${backgroundColor}`]:
        backgroundColor &&
        backgroundColor !== '' &&
        colors.includes(backgroundColor),
      [`snui-border-radius-${borderRadius}`]:
        isString(borderRadius) && radii.includes(borderRadius),
      [`snui-box-shadow-${boxShadow}`]:
        isString(boxShadow) && shadows.includes(boxShadow),
      [`snui-color-$color}`]: isString(color) && colors.includes(color),
      [`snui-font-${font}`]:
        (font && font === 'heading') || font === 'body' || font === 'mono',
      [`snui-text-${fontSize}`]:
        isString(fontSize) && sizes.includes(fontSize as string),
      [`snui-font-weight-${fontWeight}`]:
        isString(fontWeight) && sizes.includes(fontWeight),
      [`snui-height-${height}`]:
        isString(height) && sizes.includes(height as string),
      'snui-disabled': isDisabled,
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
      [`snui-text-input-${variant}`]: isString(variant),
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

  // copy margin and padding props to give to the wrapper div
  const textInputWrapperStyles = {
    marginBottom: styles.marginBottom,
    marginLeft: styles.marginLeft,
    marginRight: styles.marginRight,
    marginTop: styles.marginTop,
    paddingBottom: styles.paddingBottom,
    paddingLeft: styles.paddingLeft,
    paddingRight: styles.paddingRight,
    paddingTop: styles.paddingTop,
  };

  // remove all margin and padding props from styles
  delete styles.marginBottom;
  delete styles.marginLeft;
  delete styles.marginRight;
  delete styles.marginTop;
  delete styles.paddingBottom;
  delete styles.paddingLeft;
  delete styles.paddingRight;
  delete styles.paddingTop;

  if (isString(size)) {
    if (sizes.includes(size as string)) {
      if (floatLabel && isString(label)) {
        if (size === 'sm') {
          styles.height = `calc(${theme.sizes[size as Sizes]} * 2)`;
          styles.paddingTop = '1rem';
        } else if (size === 'md') {
          styles.height = `calc(${theme.sizes[size as Sizes]} * 1.85)`;
          styles.paddingTop = '1.5rem';
        }
      } else {
        styles.height = `calc(${theme.sizes[size as Sizes]} * 1.2)`;
      }
      styles.paddingInlineStart = theme.spacing.md;
      styles.paddingInlineEnd = theme.spacing.md;
    } else {
      styles.height = size as string;
      styles.paddingInlineStart = theme.spacing.md;
      styles.paddingInlineEnd = theme.spacing.md;
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

  const labelIds: string[] = [];

  if (hasFeedbackText && isInvalid) {
    labelIds.push(`${fieldId}-feedback`);
  }

  if (hasHelpText) {
    labelIds.push(`${fieldId}-helper-text`);
  }

  if (isInvalid) {
    styles.border = `2px solid ${theme.colors.error500}`;
  }

  return (
    <div
      className="snui-position-relative"
      style={{ ...textInputWrapperStyles, height: styles.height }}
    >
      {leftIcon && (
        <div className="snui-position-absolute snui-position-top-left snui-padding-left-sm">
          {leftIcon}
        </div>
      )}
      {floatLabel && isString(label) && (
        <label
          className={`${labelClasses} ${
            isString(labelClassName) ? labelClassName : ''
          } ${isDisabled ? 'snui-disabled' : ''}`}
          htmlFor={inputId}
          style={{
            transform: isString(finalLabelTransform) ? labelTransition : '',
            color: labelColor,
          }}
        >
          {label}
          {isRequired && (
            <span aria-hidden="true" className="snui-error" role="presentation">
              *
            </span>
          )}
        </label>
      )}
      {!floatLabel && isString(label) && (
        <label
          className={`snui-visually-hidden ${
            isDisabled ? 'snui-disabled' : ''
          }`}
          htmlFor={inputId}
        >
          {label}
          {isRequired && (
            <span aria-hidden="true" className="snui-error" role="presentation">
              *
            </span>
          )}
        </label>
      )}

      <input
        {...rest}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        className={classes}
        disabled={isDisabled || formControlIsDisabled}
        id={inputId}
        onBlur={e => {
          setFocusRingColor('');
          if (!isString(inputValue)) {
            setLabelClasses('snui-text-label snui-position-absolute');
          }
          if (
            labelTransition &&
            !isString(inputValue) &&
            !initialLabelTransform
          ) {
            setLabelTransition('translate(2.5rem, 50%) scale(1.4)');
            // remove color from the label
            setLabelColor('');
          }
          if (!isString(inputValue) && initialLabelTransform) {
            setLabelTransition(initialLabelTransform);
          }
          if (isFunction(onBlur) && !isDisabled) {
            onBlur!(e);
          }
        }}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(onChange)) {
              onChange!(e);
            }
            setInputValue(e.target.value);
          }
        }}
        onFocus={() => {
          setFocusRingColor(theme.colors.focusRing);
          // add focus ring color to the label
          setLabelColor(theme.colors.focusRing);

          if (!isString(inputValue)) {
            setLabelClasses(`${labelClasses} snui-text-label-floating`);
          }

          if (isString(finalLabelTransform)) {
            setLabelTransition(finalLabelTransform as string);
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
        placeholder={!floatLabel ? label : undefined}
        ref={ref}
        type={typeOf}
        value={inputValue}
      />
      {rightIcon && (
        <div className="snui-position-absolute snui-position-top-right snui-padding-right-sm">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

export default TextInput;
