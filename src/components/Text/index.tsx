import { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { createElement, isString } from '@utils';

import { TextProps } from './types';
import './styles.scss';

/**
 * UI component to display individual pieces of text
 */
const Text: FC<TextProps> = props => {
  const { children, className, tag = 'span', ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-text', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return createElement(
    `${tag}`,
    {
      ...remainingProps,
      ...addClasses(),
    },
    children
  );
};

export default Text;
