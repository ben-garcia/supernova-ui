import React, { useMemo, useRef } from 'react';

import { EditableProvider } from '@contexts/index';
import { useEditableProvider } from '@hooks/use-editable';
import { createClasses, isString } from '@utils/index';

import EditableProps from './types';
import './styles.scss';

/**
 * The container for all Editable related components
 * that provides context for all subcomponents.
 */
const Editable: React.FC<EditableProps> = props => {
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
  } = props;
  const classes = createClasses('snui-editable', {
    [`${className}`]: isString(className),
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
    };
  }, [context, inputRef]);

  return (
    <EditableProvider value={contextValue as any}>
      <div className={classes}>{children}</div>
    </EditableProvider>
  );
};

export default Editable;
