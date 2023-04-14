import { useCallback } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

interface ClassesToAdd {
  [k: string]: boolean;
}

/**
 * React hook to validate and inject CSS and Pseudo class props.
 */
export const useCSSAndPseudoClassProps = (
  props: any,
  initialClass: string,
  classesToAdd?: ClassesToAdd
) => {
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(props);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString(initialClass, {
    ...classesToAdd,
    [`${props.className}`]: isString(props.className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  const addCSSAndPseudoClassProps = useCallback(
    () => ({
      ...remainingProps,
      ...addClasses(),
    }),
    [pseudoClassName, remainingProps, stylesClassName]
  );

  return addCSSAndPseudoClassProps;
};
