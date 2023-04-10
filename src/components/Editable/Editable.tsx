import React, { FC, useMemo, useRef } from 'react';

import { EditableProvider } from '@contexts';
import {
  useClassStyles,
  useCreateClassString,
  useEditableProvider,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import EditableProps from './types';
import './styles.scss';

/**
 * The container for all Editable related components
 * that provides context for all subcomponents.
 */
const Editable: FC<EditableProps> = props => {
  const {
    children,
    className,
    isDisabled,
    onCancel,
    onChange,
    onEdit,
    onSubmit,
    placeholder,
    selectAllOnFocus = true,
    submitOnBlur = true,
    value,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-editable', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const context = useEditableProvider(props);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const customEditableRef = useRef<HTMLButtonElement | null>(null);
  const contextValue = useMemo(() => {
    return {
      ...context,
      customEditableRef,
      inputRef,
      isDisabled,
      onCancel,
      onChange,
      onEdit,
      onSubmit,
      placeholder,
      selectAllOnFocus,
      submitOnBlur,
      textareaRef,
      value,
    };
  }, [context, inputRef]);

  return (
    <EditableProvider value={contextValue as any}>
      <div {...remainingProps} {...addClasses()}>
        {children}
      </div>
    </EditableProvider>
  );
};

export default Editable;
