import { useCallback, useContext, useState } from 'react';

import { EditableContext } from '../contexts/editable';
import EditableProps from '../components/molecules/Editable/types';
import { isFunction } from '../utils';

/**
 * Hook that returns the EditableProvider props
 */
const useEditableProvider = (props: Omit<EditableProps, 'children'>) => {
  const { defaultValue, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
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
    setValue,
    setIsCustomEditable,
    value,
    ...rest,
  };
};

/**
 * Hook that returns contents from Editable context.
 */
const useEditable = () => {
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
const useEditableControls = () => {
  const { exitEditMode, isEditing, setIsCustomEditable } = useEditable();

  setIsCustomEditable();
  /**
   * Get all the props for the cancel button when using a custom editable
   *
   * @param callback function to call after the button is clicked
   */
  const getCancelButtonProps = useCallback((callback?: () => void) => {
    const onClick = () => {
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
    getCancelButtonProps,
    getSubmitButtonProps,
    isEditing,
  };
};

export { useEditable, useEditableControls, useEditableProvider };
