import React, { useCallback, useEffect, useState } from 'react';

import { useEditable } from '@hooks';
import { createClasses, isFunction, isString, validateDataProps } from '@utils';

import './styles.scss';

interface EditableInputProps {
  /**
   * Class to add.
   */
  className?: string;
}

/**
 * The component used to edit the previewed text by an input.
 */
const EditableInput: React.FC<EditableInputProps> = props => {
  const { className, ...rest } = props;
  const {
    exitEditMode,
    isCustomEditable,
    isDisabled,
    isEditing,
    inputRef,
    onCancel,
    onChange,
    onEdit,
    onSubmit,
    placeholder,
    selectAllOnFocus,
    submitOnBlur,
    value,
  } = useEditable();
  const [hasFocus, setHasFocus] = useState(false);
  const classes = createClasses('snui-editable__input', {
    [`${className}`]: isString(className),
  });
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFunction(onChange)) {
      onChange!(e.target.value);
    }
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (isFunction(onSubmit) && isString(value)) {
          onSubmit!(value);
        }
        exitEditMode();
      } else if (e.key === 'Escape' && submitOnBlur) {
        exitEditMode();
        if (isFunction(onCancel) && isString(value)) {
          onCancel!(value as string);
        }
      }
    },
    [value]
  );

  useEffect(() => {
    let handleClick: any;
    if (isCustomEditable) {
      handleClick = (e: React.KeyboardEvent) => {
        if (e.target !== inputRef!.current) {
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
    <input
      {...validateDataProps(rest)}
      aria-disabled={isDisabled}
      className={classes}
      disabled={isDisabled}
      hidden={!isEditing || isDisabled}
      onBlur={
        isCustomEditable
          ? () => setHasFocus(false)
          : () => {
              if (isFunction(onSubmit) && isString(value) && submitOnBlur) {
                onSubmit!(value);
              }
              exitEditMode();
            }
      }
      onChange={handleChange}
      onFocus={() => {
        setHasFocus(true);
        if (selectAllOnFocus && inputRef?.current) {
          inputRef!.current!.select();
        }

        if (isFunction(onEdit)) {
          onEdit!();
        }
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={inputRef}
      style={{
        boxShadow:
          isEditing && !isDisabled && hasFocus
            ? '0 0 0 3px var(--snui-color-focus-ring)'
            : undefined,
      }}
      value={value}
    />
  );
};

export default EditableInput;
