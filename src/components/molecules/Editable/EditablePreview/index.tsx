import React from 'react';

import { useEditable } from '@hooks';
import { createClasses, isString, validateDataProps } from '@utils';

interface EditablePreviewProps {
  className?: string;
}

/**
 * The component that holds the preview content to be editable.
 */
const EditablePreview: React.FC<EditablePreviewProps> = props => {
  const { className, ...rest } = props;
  const {
    enterEditMode,
    inputRef,
    isDisabled,
    isEditing,
    placeholder,
    textareaRef,
    value,
  } = useEditable();
  const classes = createClasses('snui-editable__preview', {
    [`${className}`]: isString(className),
  });

  return (
    // eslint-disable-next-line
    <span
      {...validateDataProps(rest)}
      aria-disabled={isDisabled ?? undefined}
      className={classes}
      onFocus={() => {
        enterEditMode();
        setTimeout(() => {
          if (!isDisabled && inputRef?.current) {
            inputRef!.current!.focus();
          } else if (!isDisabled && textareaRef?.current) {
            textareaRef!.current!.focus();
          }
        });
      }}
      onClick={() => {
        if (inputRef?.current) {
          inputRef!.current!.focus();
        }
        enterEditMode();
      }}
      style={isEditing || isDisabled ? { display: 'none' } : undefined}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={isDisabled ? undefined : 0}
    >
      {!isString(value) && isString(placeholder) ? placeholder : value}
    </span>
  );
};

export default EditablePreview;
