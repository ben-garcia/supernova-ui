import { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { createElement, isString } from '@utils';
import { SupernovaProps } from '@types';

type Tag = 'article' | 'div' | 'footer' | 'header' | 'section';
export interface BoxProps extends SupernovaProps {
  tag?: Tag;
}

/**
 * Container component used as a wrapper for other components.
 */
const Box: FC<BoxProps> = props => {
  const { children, className, tag = 'div', ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-box', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return createElement(tag, { ...remainingProps, ...addClasses() }, children);
};

export default Box;
