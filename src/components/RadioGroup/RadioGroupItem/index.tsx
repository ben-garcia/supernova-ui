import React from 'react';

import { useUniqueId } from '@hooks/use-unique-id';
import { useValidateProps } from '@hooks/use-validate-props';
import { useTheme } from '@hooks/use-theme';
import { useFormControl } from '@hooks/use-form-control';
import { useCreateClassString } from '@hooks/use-create-class';
import { usePseudoClasses } from '@hooks/use-style';
import { useClassStyles } from '@hooks/use-class';
import { isString } from '@utils/assertions';
import { forwardRef } from '@utils/react';
import type { RadioGroupItemProps } from './types';
import './styles.scss';

/**
 * UI interactive component used to indicate that only one choice must
 * be selected of a given number of choices presented
 */
const RadioGroupItem = forwardRef<RadioGroupItemProps, HTMLInputElement>(
  (props, ref) => {
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
    const radioId = useUniqueId('snui-radio');
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

    return (
      // eslint-disable-next-line
      <label {...addLabelClasses()}>
        <input
          {...remainingProps}
          aria-checked={isChecked || formControlIsDisabled}
          aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
          checked={isChecked || formControlIsDisabled}
          className="snui-hidden-radio snui-visually-hidden"
          disabled={isDisabled}
          id={radioId}
          ref={ref}
          type="radio"
        />

        {/* eslint-disable-next-line */}
        <span
          {...addControlClasses()}
          style={
            isChecked && isString(colorVariant)
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
  }
);

export default RadioGroupItem;
