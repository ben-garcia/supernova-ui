import React, { useState, useMemo } from 'react';

import { useCSSAndPseudoClassProps, useFormControl, useUniqueId } from '@hooks';
import {
  createClasses,
  forwardRef,
  isFunction,
  isObject,
  isString,
} from '@utils';
import { TextInputProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to enter information
 */
const TextInput = forwardRef<TextInputProps, HTMLInputElement>((props, ref) => {
  const {
    value,
    isDisabled = false,
    label,
    leftIcon,
    placeholder,
    rightIcon,
    size = 'md',
    variant = 'outline',
    ...rest
  } = props;
  const {
    hasHelpText,
    hasFeedbackText,
    id: fieldId,
    isDisabled: formControlIsDisabled,
    isInvalid,
    isRequired,
  } = useFormControl();
  const uniqueId = useUniqueId('snui-text-input');
  const [inputValue, setInputValue] = useState(value || '');
  const inputId = useMemo(() => (isString(fieldId) ? fieldId : uniqueId), []);
  const wrapperClasses = createClasses('snui-text-input-wrapper', {
    [`snui-text-input-wrapper--${size}`]: isString(size),
  });
  const labelClasses = createClasses('snui snui-text-label', {
    [`snui-text-label--${size}`]: isString(size),
    'snui-text-label--padding-left': isObject(leftIcon),
    'snui-disabled': isDisabled,
  });
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-text-input',
    {
      'snui-disabled': isDisabled,
      [`snui-text-input--${variant}`]:
        isString(variant) && !props.backgroundColor,
      [`snui-text-input--${size}`]:
        isString(size) && !props.height && !props.width,
      'snui-text-input--default-padding': !leftIcon,
      'snui-text-input--padding-left': isObject(leftIcon),
    }
  );
  const labelIds: string[] = [];

  if (hasFeedbackText && isInvalid) {
    labelIds.push(`${fieldId}-feedback`);
  }

  if (hasHelpText) {
    labelIds.push(`${fieldId}-helper-text`);
  }

  return (
    <div className={wrapperClasses}>
      {isObject(leftIcon) && (
        <div
          style={{
            height: size === 'sm' ? '1.1rem' : '1.3rem',
            paddingLeft: '0.5rem',
            position: 'absolute',
            transform: 'translateY(50%)',
          }}
        >
          {leftIcon}
        </div>
      )}

      <input
        {...addCSSClassesAndProps()}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-disabled={isDisabled || formControlIsDisabled}
        aria-invalid={isInvalid ?? undefined}
        disabled={isDisabled || formControlIsDisabled}
        id={inputId}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(props?.onChange)) {
              props.onChange!(e);
            }
            setInputValue(e.target.value);
          }
        }}
        placeholder={isString(placeholder) ? placeholder : ' '}
        ref={ref}
        style={
          isInvalid
            ? { border: '2px solid var(--snui-color-error500)' }
            : undefined
        }
        value={inputValue}
      />
      {isObject(rightIcon) && (
        <div
          style={{
            height:
              // eslint-disable-next-line no-nested-ternary
              size === 'sm' ? '1.1rem' : size === 'md' ? '1.3rem' : '1.5rem',
            paddingRight: '0.5rem',
            position: 'absolute',
            right: 0,
            top: 0,
            transform: 'translateY(50%)',
          }}
        >
          {rightIcon}
        </div>
      )}

      {isString(label) && (
        <label className={labelClasses} htmlFor={inputId}>
          {label}
          {isRequired && (
            <span aria-hidden="true" className="snui-error" role="presentation">
              *
            </span>
          )}
        </label>
      )}
    </div>
  );
});

export default TextInput;
