import React, { useMemo } from 'react';

import { useClassStyles } from '@hooks/use-class';
import { useCreateClassString } from '@hooks/use-create-class';
import { useDualModeInput } from '@hooks/use-dual-mode-input';
import { useFormControl } from '@hooks/use-form-control';
import { usePseudoClasses } from '@hooks/use-style';
import { useUniqueId } from '@hooks/use-unique-id';
import { useTheme } from '@hooks/use-theme';
import { useValidateProps } from '@hooks/use-validate-props';
import { isFunction, isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';
import type { SwitchProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to toogle between 2 states.
 * */
const Switch = forwardRef<SwitchProps, HTMLInputElement>((props, ref) => {
  const {
    checked,
    className,
    colorVariant,
    defaultChecked,
    isChecked,
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
  const { value, setInternalValue, isControlled } = useDualModeInput({
    defaultValue: defaultChecked,
    name: 'Switch',
    value: checked || isChecked,
  });
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
        aria-checked={(value as boolean) || formControlIsDisabled}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        checked={(value as boolean) || formControlIsDisabled}
        className="snui-hidden-switch snui-visually-hidden"
        disabled={isDisabled}
        id={switchId}
        onChange={e => {
          if (isDisabled) return;

          // Update internal state if uncontrolled
          if (!isControlled) {
            setInternalValue(e.target.checked);
          }

          if (isFunction(props?.onChange)) {
            props.onChange!(e);
          }
        }}
        ref={ref}
        type="checkbox"
      />

      {/* eslint-disable-next-line */}
      <span
        {...addControlClasses()}
        style={
          value && isString(colorVariant)
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
