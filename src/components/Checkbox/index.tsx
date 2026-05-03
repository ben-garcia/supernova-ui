import React, { useMemo, useState } from 'react';

import CheckmarkIcon from '@components/Icon/Icons/CheckmarkIcon';
import { useClassStyles } from '@hooks/use-class';
import { useCreateClassString } from '@hooks/use-create-class';
import { useFormControl } from '@hooks/use-form-control';
import { usePseudoClasses } from '@hooks/use-style';
import { useTheme } from '@hooks/use-theme';
import { useUniqueId } from '@hooks/use-unique-id';
import { useValidateProps } from '@hooks/use-validate-props';
import { isFunction, isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';
import type { CheckboxProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to select one or more options
 * of a limited number of choices.
 */
const Checkbox = forwardRef<CheckboxProps, HTMLInputElement>((props, ref) => {
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
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(isChecked);
  const uniqueId = useUniqueId('snui-checkbox');
  const checkboxId = useMemo(
    () => (isString(fieldId) ? fieldId : uniqueId),
    []
  );
  const addControlClasses = useCreateClassString(
    'snui snui-checkbox__control',
    {
      [`${className}`]: isString(className),
      [`snui-checkbox--${size}`]:
        isString(size) && !props.height && !props.width,
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    }
  );
  const addLabelClasses = useCreateClassString('snui-checkbox__label', {
    [`snui-checkbox__label--${size}`]:
      isString(size) && !props.height && !props.width,
    'snui-disabled': isDisabled,
  });
  const handleToggleCheck = (e: any) => {
    if (isDisabled) return;

    if (isFunction(props?.onChange)) {
      props.onChange!(e);
    }
    setCheckboxIsChecked(!checkboxIsChecked);
  };
  const labelIds: string[] = [];

  if (hasFeedbackText && isInvalid) {
    labelIds.push(`${fieldId}-feedback`);
  }

  if (hasHelpText) {
    labelIds.push(`${fieldId}-helper-text`);
  }

  return (
    <div className="snui-checkbox snui-position-relative snui-inline-flex snui-flex-center">
      <input
        {...remainingProps}
        aria-checked={checkboxIsChecked || formControlIsDisabled}
        aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
        aria-invalid={isInvalid ?? undefined}
        checked={checkboxIsChecked || formControlIsDisabled}
        className="snui-hidden-checkbox snui-visually-hidden"
        disabled={isDisabled}
        id={checkboxId}
        onChange={e => {
          if (isDisabled) return;

          if (isFunction(props?.onChange)) {
            props.onChange!(e);
          }
          setCheckboxIsChecked(e.target.checked);
        }}
        ref={ref}
        type="checkbox"
      />

      {/* eslint-disable-next-line */}
      <span
        {...addControlClasses()}
        onClick={handleToggleCheck}
        style={
          checkboxIsChecked && isString(colorVariant)
            ? { backgroundColor: colors[colorVariant!] }
            : undefined
        }
      >
        <div className="snui-fill-parent">
          {checkboxIsChecked && (
            <CheckmarkIcon
              color="var(--snui-color-white)"
              height="100%"
              width="100%"
            />
          )}
        </div>
      </span>

      {isString(label) && (
        // eslint-disable-next-line
        <label {...addLabelClasses()} htmlFor={checkboxId}>
          {label}
          {isRequired && isString(label) && (
            <span aria-hidden="true" className="snui-error" role="presentation">
              *
            </span>
          )}
        </label>
      )}
    </div>
  );
});

export default Checkbox;
