import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { OverlayProps } from './types';
import './styles.scss';

/**
 * UI component that is used to dim the background
 * to set the focus to its children.
 */
const Overlay: FC<OverlayProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-overlay', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <div {...remainingProps} {...addClasses()}>
      {children}
    </div>
  );
};

export default Overlay;
