import React, { useMemo, useState } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useFormControl,
  usePseudoClasses,
  useTheme,
  useUniqueId,
  useValidateProps,
} from '@hooks';
import { forwardRef, isFunction, isString } from '@utils';

import { SwitchProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to toogle between 2 states.
 * */
const Switch = forwardRef<SwitchProps, HTMLInputElement>((props, ref) => {
  const {
    className,
    colorVariant,
    isChecked = false,
    isDisabled = false,
    label,
    size = 'md',
    ...rest
  } = props;
  const { remainingProps, validatedCSSProps, validatedPseudoClassProps } =
    useValidateProps(rest);
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
  const [switchIsChecked, setSwitchIsChecked] = useState(isChecked);
  const uniqueId = useUniqueId('snui-checkbox');
  const switchId = useMemo(() => (isString(fieldId) ? fieldId : uniqueId), []);
  const addControlClasses = useCreateClassString('snui snui-switch__control', {
    [`${className}`]: isString(className),
    [`snui-switch__control--${size}`]:
      isString(size) && !props.height && !props.width,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const addLabelClasses = useCreateClassString('snui-switch', {
    [`snui-switch--${size}`]: isString(size) && !props.height && !props.width,
    'snui-disabled': isDisabled,
  });
  const addCircleClasses = useCreateClassString('snui-switch__circle', {
    [`snui-switch__circle--${size}`]:
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

  return (
    // eslint-disable-next-line
    <label {...addLabelClasses()}>
      {label}
      {isRequired && isString(label) && (
        <span aria-hidden="true" className="snui-error" role="presentation">
          *
        </span>
      )}

      <input
        {...remainingProps}
        aria-checked={switchIsChecked || formControlIsDisabled}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        checked={switchIsChecked || formControlIsDisabled}
        className="snui-hidden-switch snui-visually-hidden"
        disabled={isDisabled}
        id={switchId}
        onChange={e => {
          if (!isDisabled) {
            if (isFunction(props?.onChange)) {
              props.onChange!(e);
            }
            setSwitchIsChecked(e.target.checked);
          }
        }}
        ref={ref}
        type="checkbox"
      />

      {/* eslint-disable-next-line */}
      <span
        {...addControlClasses()}
        style={
          switchIsChecked && isString(colorVariant)
            ? { backgroundColor: colors[colorVariant!] }
            : undefined
        }
      >
        <span {...addCircleClasses()} />
      </span>
    </label>
  );
});

export default Switch;
