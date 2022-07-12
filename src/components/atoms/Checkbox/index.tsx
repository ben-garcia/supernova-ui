/* eslint jsx-a11y/label-has-associated-control: 0 */
import React, { forwardRef, useMemo, useState } from 'react';

import { CheckmarkIcon } from '@atoms';
import {
  useBreakpoint,
  useInputChecked,
  useFormControl,
  useTheme,
} from '@hooks';
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
} from '@utils';

import { MarginPaddingProps, Sizes } from '@types';
import { CheckboxProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to enter information
 */
const Checkbox = forwardRef((props: CheckboxProps, ref: any) => {
  const {
    backgroundColor = 'info700',
    borderRadius = '',
    boxShadow = '',
    className,
    color = '',
    font = 'body',
    fontSize = '',
    fontWeight = '',
    height = '',
    isChecked = false,
    isDisabled = false,
    label,
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
  const {
    hasHelpText,
    hasFeedbackText,
    id: fieldId,
    isDisabled: formControlIsDisabled,
    isInvalid,
    isRequired,
  } = useFormControl();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(isChecked);
  const checkboxId = useMemo(
    () => (isString(fieldId) ? fieldId : `snui-checkbox-${Math.random()}`),
    []
  );
  const backgroundColorToUse = useInputChecked(
    checkboxId,
    backgroundColor,
    checkboxIsChecked
  );
  const classes = createClasses(
    'snui-checkbox snui-inline-flex snui-flex-center',
    {
      [`${className}`]: isString(className),
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
      className={`snui-position-relative ${classes} ${
        isDisabled ? 'snui-disabled' : ''
      }`}
    >
      <input
        {...rest}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        checked={checkboxIsChecked || formControlIsDisabled}
        className="snui-hidden-checkbox snui-visually-hidden"
        disabled={isDisabled}
        id={checkboxId}
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
        className="snui-checkbox__control"
        style={{
          ...styles,
          backgroundColor: backgroundColorToUse,
        }}
      >
        <div className="snui-flex snui-flex-center snui-fill-parent">
          {checkboxIsChecked && (
            <CheckmarkIcon fill="#fff" height="100%" width="100%" />
          )}
        </div>
      </span>
      <span className="snui-checkbox__label snui-flex snui-flex-center">
        {label}
        {isRequired && isString(label) && (
          <span aria-hidden="true" className="snui-error" role="presentation">
            *
          </span>
        )}
      </span>
    </label>
  );
});

export default Checkbox;
