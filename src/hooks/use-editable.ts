import { useCallback, useContext, useState } from 'react';

import EditableProps from '@components/Editable/types';
import { EditableContext } from '@contexts';
import { isFunction } from '@utils';

/**
 * Hook that returns the EditableProvider props
 */
export const useEditableProvider = (props: Omit<EditableProps, 'children'>) => {
  const { value, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomEditable, setIsCustomEditableFunc] = useState(false);

  const exitEditMode = useCallback(() => setIsEditing(false), []);
  const enterEditMode = useCallback(() => setIsEditing(true), []);
  const setIsCustomEditable = useCallback(
    () => setIsCustomEditableFunc(true),
    []
  );

  return {
    enterEditMode,
    exitEditMode,
    isCustomEditable,
    isEditing,
    setIsEditing,
    setIsCustomEditable,
    value,
    ...rest,
  };
};

/**
 * Hook that returns contents from Editable context.
 */
export const useEditable = () => {
  const context = useContext(EditableContext);

  if (!context) {
    throw new Error(
      'useEditable: context is undefined, did you remember to wrap your components in a pair of <Editable>'
    );
  }

  return context;
};

/**
 * Hook that returns functions to help create a custom Editable.
 */
export const useEditableControls = () => {
  const {
    enterEditMode,
    exitEditMode,
    isEditing,
    onCancel,
    onSubmit,
    setIsCustomEditable,
    value,
  } = useEditable();

  setIsCustomEditable();
  /**
   * Get all the props for the cancel button when using a custom editable
   *
   * @param callback function to call after the button is clicked
   */
  const getCancelButtonProps = useCallback((callback?: () => void) => {
    const onClick = () => {
      if (isFunction(onCancel)) {
        onCancel!(value.slice(0, value.length - 1));
      }

      if (isFunction(callback)) {
        callback!();
      }
      exitEditMode();
    };

    return {
      onClick,
    };
  }, []);
  /**
   * Get all the props for the submit button when using a custom editable
   *
   * @param callback function to call after the button is clicked
   */
  const getSubmitButtonProps = useCallback((callback?: () => void) => {
    const onClick = () => {
      if (isFunction(onSubmit)) {
        onSubmit!(value);
      }

      if (isFunction(callback)) {
        callback!();
      }
      exitEditMode();
    };

    return {
      onClick,
    };
  }, []);

  return {
    enterEditMode,
    exitEditMode,
    getCancelButtonProps,
    getSubmitButtonProps,
    isEditing,
  };
};
