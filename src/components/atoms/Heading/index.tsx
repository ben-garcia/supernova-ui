import type { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { createElement, isString } from '@utils';

import { HeadingProps } from './types';
import './styles.scss';

/**
 * Ui component to display headings
 */
const Heading: FC<HeadingProps> = props => {
  const { children, className, level = 1, size = 'xl', ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-heading', {
    [`${className}`]: isString(className),
    [`snui-heading--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  const heading = createElement(
    `h${level}`,
    {
      ...rest,
      ...remainingProps,
      ...addClasses(),
    } as any,
    children
  );

  return heading;
};

export default Heading;
