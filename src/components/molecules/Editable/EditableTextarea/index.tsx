import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useEditable,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isFunction, isNumber, isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

interface EditableTextareaProps extends SupernovaProps {
  /**
   * textarea cols attribue.
   */
  cols?: number;
  initialHeight?: string;
  /**
   * Flag to enable auto resize.
   */
  isAutoResize?: boolean;
  /**
   * textarea maxlength attribute.
   */
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /**
   * Callback function to call when a click
   * outside <EditableTextarea> component.
   *
   * @param val current value.
   */
  onClickOutside?: (val: string) => void;
  /**
   * textarea rows attribute.
   */
  rows?: number;
  initialWidth?: string;
}

/**
 * The component used to edit the previewed text in when a textarea is needed.
 */
const EditableTextarea: FC<EditableTextareaProps> = props => {
  const {
    className,
    cols,
    initialHeight,
    isAutoResize = false,
    maxLength,
    onClickOutside,
    onKeyDown,
    rows,
    initialWidth,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-editable__textarea', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const {
    exitEditMode,
    isCustomEditable,
    isDisabled,
    isEditing,
    onCancel,
    onChange,
    onEdit,
    onSubmit,
    placeholder,
    selectAllOnFocus,
    submitOnBlur,
    textareaRef,
    value,
  } = useEditable();
  const [hasFocus, setHasFocus] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isFunction(onChange)) {
        onChange!(e.target.value);
      }
    },
    []
  );
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isFunction(onKeyDown)) {
        onKeyDown!(e);
      }

      if (e.key === 'Escape' && submitOnBlur) {
        if (isFunction(onSubmit) && isString(value)) {
          onSubmit!(value);
        }

        exitEditMode();

        if (isFunction(onCancel) && isString(value)) {
          onCancel!(value as string);
        }
      }
    },
    [value]
  );
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${
          (e.target as any).scrollHeight
        }px`;
      }
    },
    []
  );

  useEffect(() => {
    let handleClick: any;
    if (isCustomEditable) {
      handleClick = (e: React.KeyboardEvent) => {
        if (e.target !== textareaRef?.current) {
          if (isFunction(onClickOutside) && textareaRef?.current) {
            onClickOutside!(textareaRef.current.value);
          }
          exitEditMode();
        }
      };
      window.addEventListener('click', handleClick);
    }

    return () => {
      if (isCustomEditable) {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [isCustomEditable]);

  return (
    <textarea
      {...remainingProps}
      {...addClasses()}
      aria-disabled={isDisabled}
      cols={isNumber(cols) ? cols : undefined}
      disabled={isDisabled}
      hidden={!isEditing || isDisabled}
      maxLength={isNumber(maxLength) ? maxLength : undefined}
      onBlur={
        isCustomEditable
          ? () => setHasFocus(false)
          : () => {
              if (isFunction(onSubmit) && isString(value)) {
                onSubmit!(value);
              }
              exitEditMode();
            }
      }
      onChange={handleChange}
      onFocus={() => {
        setHasFocus(true);
        if (selectAllOnFocus && textareaRef?.current) {
          textareaRef!.current!.select();
        }

        if (isFunction(onEdit)) {
          onEdit!();
        }
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={isAutoResize ? handleKeyUp : undefined}
      placeholder={placeholder}
      ref={textareaRef}
      rows={isNumber(rows) ? rows : undefined}
      style={{
        boxShadow:
          isEditing && !isDisabled && hasFocus
            ? '0 0 0 3px var(--snui-color-focus-ring)'
            : undefined,
        height:
          isString(initialHeight) && !isAutoResize ? initialHeight : undefined,
        overflow: isAutoResize ? 'hidden' : undefined,
        resize: isAutoResize ? 'none' : undefined,
        width: isString(initialWidth) ? initialWidth : undefined,
      }}
      value={value}
    />
  );
};

export default EditableTextarea;
