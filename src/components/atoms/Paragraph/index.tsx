import React from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { ParagraphProps } from './types';
import './styles.scss';

/**
 * UI component to display a paragraph
 */
const Paragraph: React.FC<ParagraphProps> = props => {
  const { children, className, size = 'xl', ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-paragraph', {
    [`${className}`]: isString(className),
    [`snui-paragraph--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <p {...remainingProps} {...addClasses()}>
      {children}
    </p>
  );
};

export default Paragraph;
