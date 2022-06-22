import React, { useEffect, useState } from 'react';

import { useEditable } from '../../../../hooks/use-editable';
import { createClasses, isFunction, isString } from '../../../../utils';
import './styles.scss';

interface EditableInputProps {
  className?: string;
}

const EditableInput: React.FC<EditableInputProps> = () => {
  const {
    className,
    exitEditMode,
    isCustomEditable,
    isDisabled,
    isEditing,
    inputRef,
    onCancel,
    onChange,
    onEdit,
    placeholder,
    selectAllOnFocus,
    setValue,
    submitOnBlur,
    value,
  } = useEditable();
  const [hasFocus, setHasFocus] = useState(false);
  const classes = createClasses('snui-editable__input', {
    [`${className}`]: isString(className),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (isFunction(onChange)) {
      onChange!(e.target.value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exitEditMode();
    } else if (e.key === 'Escape' && submitOnBlur) {
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
