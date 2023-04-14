import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useEditable } from '@hooks';
import { isString } from '@utils';
import { SupernovaProps } from '@types';

interface EditablePreviewProps extends SupernovaProps {}

/**
 * The component that holds the preview content to be editable.
 */
const EditablePreview: FC<EditablePreviewProps> = props => {
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    props,
    'snui snui-editable__preview'
  );
  const {
    enterEditMode,
    inputRef,
    isDisabled,
    isEditing,
    placeholder,
    textareaRef,
    value,
  } = useEditable();

  return (
    // eslint-disable-next-line
    <span
      {...addCSSClassesAndProps()}
      aria-disabled={isDisabled ?? undefined}
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
