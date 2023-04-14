import React, { FC, useMemo, useRef } from 'react';

import { EditableProvider } from '@contexts';
import { useCSSAndPseudoClassProps, useEditableProvider } from '@hooks';
import EditableProps from './types';
import './styles.scss';

/**
 * The container for all Editable related components
 * that provides context for all subcomponents.
 */
const Editable: FC<EditableProps> = props => {
  const {
    children,
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
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-editable'
  );
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
      <div {...addCSSClassesAndProps()}>{children}</div>
    </EditableProvider>
  );
};

export default Editable;
