/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { forwardRef, useMemo, useState } from 'react';

import {
  useInputChecked,
  useBreakpoint,
  useFormControl,
  useTheme,
} from '../../../hooks';
import { RadioProps } from './types';

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

/**
 * UI interactive component used to indicate that only one choice must
 * be selected of a given number of choices presented
 */
const Radio = forwardRef((props: RadioProps, ref: any) => {
  const {
    backgroundColor = '',
    borderRadius = '',
    boxShadow = '',
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    isChecked = undefined,
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
    value,
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
  const [radioIsChecked, setRadioIsChecked] = useState(isChecked || false);
  const radioInputId = useMemo(
    () => (isString(fieldId) ? fieldId : `_snui-radio-${Math.random()}`),
    []
  );
  const backgroundColorToUse = useInputChecked(
    radioInputId,
    backgroundColor,
    radioIsChecked,
    isChecked
  );
  const classes = createClasses(
    '_snui-radio _snui-inline-flex _snui-flex-center',
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
  const circleStyles: any = {};

  if (isString(size)) {
    if (sizes.includes(size as string)) {
      if (size === 'xs') {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.4)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.4)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.7)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 0.7)`;
      } else if (size === 'sm') {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.3)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.3)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.6)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 0.6)`;
      } else {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.3)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.3)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.65)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 0.65)`;
      }
    } else {
      styles.height = size as string;
      styles.width = size as string;
    }
  } else if (isObject(size)) {
    responsify('height', size, styles, theme.sizes, breakpoint, sizes);
    responsify('width', size, styles, theme.sizes, breakpoint, sizes);
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
    <label
      className={`_snui-position-relative ${classes} ${
        isDisabled ? '_snui-disabled' : ''
      }`}
    >
      <input
        {...rest}
        aria-describedby={labelIds.join(' ') ?? undefined}
        checked={isChecked && radioIsChecked}
        className="_snui-hidden-radio _snui-visually-hidden"
        disabled={isDisabled || formControlIsDisabled}
        id={radioInputId}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(onChange)) {
              onChange!(e);
            }
            setRadioIsChecked(e.target.checked);
          }
        }}
        ref={ref}
        type="radio"
        value={value}
      />
      <span
        aria-hidden="true"
        className="_snui-radio__control"
        style={{
          ...styles,
          backgroundColor: backgroundColorToUse,
        }}
      >
        <span className="_snui-radio__circle" style={{ ...circleStyles }} />
      </span>
      <span
        className="_snui-radio__label"
        style={{ fontSize: `${theme.typography.fontSizes[size as Sizes]}` }}
      >
        {label}
        {isRequired && (
          <span aria-hidden="true" className="_snui-error" role="presentation">
            *
          </span>
        )}
      </span>
    </label>
  );
});

export default Radio;
