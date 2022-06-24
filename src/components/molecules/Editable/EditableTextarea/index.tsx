import React, { useEffect, useState } from 'react';

import { useEditable } from '../../../../hooks/use-editable';
import {
  createClasses,
  isFunction,
  isString,
  validateDataProps,
} from '../../../../utils';
import './styles.scss';

interface EditableTextareaProps {
  className?: string;
}

/**
 * The component used to edit the previewed text in when a textarea is needed.
 */
const EditableTextarea: React.FC<EditableTextareaProps> = props => {
  const { className, ...rest } = props;
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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFunction(onChange)) {
      onChange!(e.target.value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape' && submitOnBlur) {
      if (isFunction(onSubmit) && isString(value)) {
        onSubmit!(value);
      }
      exitEditMode();
      if (isFunction(onCancel) && isString(value)) {
        onCancel!(value as string);
      }
    }
  };

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
      disabled={isDisabled}
      hidden={!isEditing || isDisabled}
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
      placeholder={placeholder}
      ref={textareaRef}
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

export default EditableTextarea;
