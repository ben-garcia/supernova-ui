import React, { useCallback, useContext, useState } from 'react';

import { isFunction } from '../utils';
import { FormControlContext } from '../contexts/form-control';

/**
 * credit https://github.com/chakra-ui/chakra-ui/blob/53d0d0cfec7b4404fd2bc123991352f81bd39a82/packages/react-utils/src/refs.ts#L34
 */

type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (isFunction(ref)) {
    (ref as any)(value);
    return;
  }

  try {
    // @ts-ignore
    // eslint-disable-next-line
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => assignRef(ref, value));
  };
}

/**
 * Hooks that returns the FormControl props
 */
const useFormControlProvider = (props: any) => {
  const { id: propId, isRequired, isInvalid, isDisabled } = props;

  const id = propId || `field-${Math.random()}`;
  const [hasFeedbackText, setHasFeedbackText] = useState(false);
  const [hasHelpText, setHasHelpText] = useState(false);
  const getHelpTextProps = useCallback(
    (helperTextProps = {}, forwardedRef = null) => ({
      id: `${id}-helper-text`,
      ...helperTextProps,
      ref: mergeRefs(forwardedRef, node => {
        if (!node) return;
        setHasHelpText(true);
      }),
    }),
    [id]
  );
  const getErrorMessageProps = useCallback(
    (errorMessageProps = {}, forwardedRef = null) => ({
      id: `${id}-feedback`,
      ...errorMessageProps,
      ref: mergeRefs(forwardedRef, node => {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      'aria-live': 'polite',
    }),
    [id]
  );

  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isDisabled: !!isDisabled,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    getHelpTextProps,
    getErrorMessageProps,
  };
};

/**
 * Hooks that returns all form control props
 */
const useFormControl = () => {
  const context = useContext(FormControlContext);
  return context;
};

export { useFormControlProvider, useFormControl };
