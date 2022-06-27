import React, { useCallback, useEffect, useState } from 'react';

import { useEditable } from '../../../../hooks/use-editable';
import {
  createClasses,
  isFunction,
  isNumber,
  isString,
  validateDataProps,
} from '../../../../utils';
import './styles.scss';

interface EditableTextareaProps {
  /**
   * Class to include.
   */
  className?: string;
  cols?: number;
  height?: string;
  /**
   * Flag to enable auto resize.
   */
  isAutoResize?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  width?: string;
}

/**
 * The component used to edit the previewed text in when a textarea is needed.
 */
const EditableTextarea: React.FC<EditableTextareaProps> = props => {
  const {
    className,
    cols,
    height,
    isAutoResize = false,
    maxLength,
    onKeyDown,
    rows,
    width,
    ...rest
  } = props;
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
  const classes = createClasses('snui-editable__textarea', {
    [`${className}`]: isString(className),
  });
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
        if (e.target !== textareaRef!.current) {
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
      {...validateDataProps(rest)}
      aria-disabled={isDisabled}
      className={classes}
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
      rows={isNumber(rows) && !isAutoResize ? rows : 1}
      style={{
        boxShadow:
          isEditing && !isDisabled && hasFocus
            ? '0 0 0 3px var(--snui-color-focus-ring)'
            : undefined,
        height: isString(height) && !isAutoResize ? height : undefined,
        overflow: isAutoResize ? 'hidden' : undefined,
        resize: isAutoResize ? 'none' : undefined,
        width: isString(width) ? width : undefined,
      }}
      value={value}
    />
  );
};

export default EditableTextarea;
