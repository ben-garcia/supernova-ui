import React, { useEffect, useState } from 'react';

import { useEditable } from '../../../../hooks/use-editable';
import { createClasses, isFunction, isString } from '../../../../utils';
import './styles.scss';

interface EditableTextareaProps {
  className?: string;
}

const EditableTextarea: React.FC<EditableTextareaProps> = () => {
  const {
    className,
    exitEditMode,
    isCustomEditable,
    isDisabled,
    isEditing,
    onCancel,
    onChange,
    onEdit,
    placeholder,
    selectAllOnFocus,
    setValue,
    submitOnBlur,
    textareaRef,
    value,
  } = useEditable();
  const [hasFocus, setHasFocus] = useState(false);
  const classes = createClasses('snui-editable__textarea', {
    [`${className}`]: isString(className),
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (isFunction(onChange)) {
      onChange!(e.target.value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape' && submitOnBlur) {
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
      aria-disabled={isDisabled}
      className={classes}
      disabled={isDisabled}
      hidden={!isEditing || isDisabled}
      onBlur={
        isCustomEditable ? () => setHasFocus(false) : () => exitEditMode()
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
