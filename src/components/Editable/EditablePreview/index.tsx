import React from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useEditable,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';

interface EditablePreviewProps extends SupernovaProps {}

/**
 * The component that holds the preview content to be editable.
 */
const EditablePreview: React.FC<EditablePreviewProps> = props => {
  const { className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-editable__preview', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
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
      {...remainingProps}
      {...addClasses()}
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
