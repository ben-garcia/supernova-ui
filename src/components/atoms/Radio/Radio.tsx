import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useFormControl,
  usePseudoClasses,
  useTheme,
  useUniqueId,
  useValidateProps,
} from '@hooks';

import { isFunction, isString } from '@utils';

import { RadioProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to indicate that only one choice must
 * be selected of a given number of choices presented
 */
const Radio = forwardRef((props: RadioProps, ref: any) => {
  const {
    className,
    colorVariant,
    isChecked = false,
    isDisabled = false,
    label,
    size = 'md',
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const {
    hasHelpText,
    hasFeedbackText,
    id: fieldId,
    isDisabled: formControlIsDisabled,
    isInvalid,
    isRequired,
  } = useFormControl();
  const { colors } = useTheme();
  const [radioIsChecked, setRadioIsChecked] = useState(isChecked);
  const uniqueId = useUniqueId('snui-radio');
  const radioId = useMemo(() => (isString(fieldId) ? fieldId : uniqueId), []);
  const addControlClasses = useCreateClassString('snui snui-radio__control', {
    [`${className}`]: isString(className),
    [`snui-radio__control--${size}`]:
      isString(size) && !props.height && !props.width,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const addLabelClasses = useCreateClassString('snui-radio', {
    [`snui-radio--${size}`]: isString(size) && !props.height && !props.width,
    'snui-disabled': isDisabled,
  });
  const addCircleClasses = useCreateClassString('snui-radio__circle', {
    [`snui-radio__circle--${size}`]:
      isString(size) && !props.height && !props.width,
    'snui-disabled': isDisabled,
  });
  const labelIds: string[] = [];

  if (hasFeedbackText && isInvalid) {
    labelIds.push(`${fieldId}-feedback`);
  }

  if (hasHelpText) {
    labelIds.push(`${fieldId}-helper-text`);
  }

  useEffect(() => {
    setRadioIsChecked(isChecked);
  }, [isChecked]);

  return (
    // eslint-disable-next-line
    <label {...addLabelClasses()}>
      <input
        {...remainingProps}
        aria-checked={radioIsChecked || formControlIsDisabled}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        checked={radioIsChecked || formControlIsDisabled}
        className="snui-hidden-radio snui-visually-hidden"
        disabled={isDisabled}
        id={radioId}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(props?.onChange)) {
              props.onChange!(e);
            }
            setRadioIsChecked(e.target.checked);
          }
        }}
        ref={ref}
        type="radio"
      />

      {/* eslint-disable-next-line */}
      <span
        {...addControlClasses()}
        style={
          radioIsChecked && isString(colorVariant)
            ? { backgroundColor: colors[colorVariant!] }
            : undefined
        }
      >
        <span {...addCircleClasses()} />
      </span>

      {label}
      {isRequired && isString(label) && (
        <span aria-hidden="true" className="snui-error" role="presentation">
          *
        </span>
      )}
    </label>
  );
});

export default Radio;
