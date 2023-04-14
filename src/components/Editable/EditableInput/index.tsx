import React, { FC, useCallback, useEffect, useState } from 'react';

import { useCSSAndPseudoClassProps, useEditable } from '@hooks';
import { isFunction, isString } from '@utils';
import { SupernovaProps } from '@types';
import './styles.scss';

interface EditableInputProps extends SupernovaProps<'input'> {}

/**
 * The component used to edit the previewed text by an input.
 */
const EditableInput: FC<EditableInputProps> = props => {
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    props,
    'snui snui-editable__input'
  );
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
      {...addCSSClassesAndProps()}
      aria-disabled={isDisabled}
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
