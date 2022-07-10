import React, { forwardRef, useMemo, useState } from 'react';

import {
  useBreakpoint,
  useInputChecked,
  useFormControl,
  useTheme,
} from '@hooks/index';
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
} from '@utils/index';

import { MarginPaddingProps } from '@/types/index';
import { Sizes } from '@/types/common';
import { SwitchProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to indicate a boolean value
 */
const Switch = forwardRef((props: SwitchProps, ref: any) => {
  const {
    backgroundColor = 'info700',
    borderRadius = '',
    boxShadow = '',
    className = '',
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
    onChange,
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
  const switchId = useMemo(
    () => (isString(fieldId) ? fieldId : `snui-switch-${Math.random()}`),
    []
  );
  const backgroundColorToUse = useInputChecked(
    switchId,
    backgroundColor,
    checkboxIsChecked
  );
  const classes = createClasses(
    'snui-switch snui-inline-flex snui-items-center snui-justify-space-between',
    {
      [`${className}`]: isString(className),
      [`snui-border-radius-${borderRadius}`]:
        isString(borderRadius) && radii.includes(borderRadius),
      [`snui-box-shadow-${boxShadow}`]:
        isString(boxShadow) && shadows.includes(boxShadow),
      [`snui-color-${color}`]: isString(color) && colors.includes(color),
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
  const circleStyles: any = {};

  if (isString(backgroundColor) && checkboxIsChecked) {
    if (colors.includes(backgroundColor as string)) {
      styles.backgroundColor = `${(theme as any).colors[backgroundColor]}`;
    } else {
      styles.backgroundColor = backgroundColor;
    }
  }

  if (isString(size)) {
    if (sizes.includes(size as string)) {
      if (size === 'xs') {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.7)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 1.4)`;
      } else if (size === 'sm') {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.6)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 1.3)`;
      } else {
        circleStyles.height = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        circleStyles.width = `calc(${theme.sizes[size as Sizes]} * 0.5)`;
        styles.height = `calc(${theme.sizes[size as Sizes]} * 0.6)`;
        styles.width = `calc(${theme.sizes[size as Sizes]} * 1.2)`;
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
    // eslint-disable-next-line
    <label
      className={`snui-position-relative ${classes} ${
        isDisabled ? 'snui-disabled' : ''
      }`}
    >
      <span className="snui-switch__label">
        {label}
        {isRequired && (
          <span aria-hidden="true" className="snui-error" role="presentation">
            *
          </span>
        )}
      </span>
      <input
        {...rest}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        checked={checkboxIsChecked || formControlIsDisabled}
        className="snui-hidden-switch snui-visually-hidden"
        disabled={isDisabled}
        id={switchId}
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
        aria-hidden="true"
        className="snui-switch__control"
        style={{
          ...styles,
          backgroundColor: backgroundColorToUse,
        }}
      >
        <span className="snui-switch__circle" style={{ ...circleStyles }} />
      </span>
    </label>
  );
});

export default Switch;
