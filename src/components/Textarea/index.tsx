import React, {
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
  useMemo,
} from 'react';

import { useCSSAndPseudoClassProps, useFormControl, useUniqueId } from '@hooks';
import {
  createClasses,
  forwardRef,
  isFunction,
  isString,
  mergeRefs,
} from '@utils';
import { TextareaProps } from './types';
import './styles.scss';

/**
 * UI textarea component used to enter multiple lines of text
 */
const Textarea = forwardRef<TextareaProps, HTMLTextAreaElement>(
  (props, ref) => {
    const {
      isAutoResize = true,
      isDisabled = false,
      label,
      placeholder,
      value,
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

    const [textareaValue, setTextareaValue] = useState(value || '');
    const uniqueId = useUniqueId('snui-text-input');
    const textareaId = useMemo(
      () => (isString(fieldId) ? fieldId : uniqueId),
      []
    );
    const labelClasses = createClasses('snui-textarea-label', {
      'snui-disabled': isDisabled,
    });
    const addCSSClassesAndProps = useCSSAndPseudoClassProps(
      rest,
      'snui snui-textarea',
      {
        'snui-disabled': isDisabled,
        [`snui-textarea--${variant}`]:
          isString(variant) && !props.backgroundColor,
        'snui-textarea--auto-resize': isAutoResize,
      }
    );
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const handleKeyUp = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (textareaRef?.current) {
        // @ts-ignore
        textareaRef.current.style.height = isString(props.height)
          ? props.height
          : 'auto';
        textareaRef.current.style.height = `${
          (e.target as any).scrollHeight
        }px`;
      }
    }, []);
    const labelIds: string[] = [];

    if (hasFeedbackText && isInvalid) {
      labelIds.push(`${fieldId}-feedback`);
    }

    if (hasHelpText) {
      labelIds.push(`${fieldId}-helper-text`);
    }

    return (
      <div className="snui-textarea-wrapper">
        <textarea
          {...addCSSClassesAndProps()}
          aria-describedby={labelIds.length ? labelIds.join(' ') : undefined}
          aria-disabled={isDisabled || formControlIsDisabled}
          aria-invalid={isInvalid ?? undefined}
          disabled={isDisabled || formControlIsDisabled}
          id={textareaId}
          onChange={e => {
            if (!isDisabled) {
              if (isFunction(props.onChange)) {
                props.onChange!(e);
              }
              setTextareaValue(e.target.value);
            }
          }}
          onKeyUp={e => {
            if (isAutoResize) {
              handleKeyUp(e);
            }

            if (isFunction(props?.onKeyUp)) {
              props.onKeyUp!(e);
            }
          }}
          placeholder={isString(placeholder) ? placeholder : ' '}
          ref={mergeRefs(textareaRef, ref)}
          style={
            isInvalid
              ? { border: '2px solid var(--snui-color-error500)' }
              : undefined
          }
          value={textareaValue}
        />

        {isString(label) && (
          <label className={labelClasses} htmlFor={textareaId}>
            {label}
            {isRequired && (
              <span
                aria-hidden="true"
                className="snui-error"
                role="presentation"
              >
                *
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

export default Textarea;
