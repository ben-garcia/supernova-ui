import { useCallback } from 'react';

import { useClassStyles } from '@hooks/use-class';
import { useCreateClassString } from '@hooks/use-create-class';
import { useValidateProps } from '@hooks/use-validate-props';
import { usePseudoClasses } from '@hooks/use-style';
import { isString } from '@utils/assertions';

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
  const { remainingProps, validatedCSSProps, validatedPseudoClassProps } =
    useValidateProps(props);
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
