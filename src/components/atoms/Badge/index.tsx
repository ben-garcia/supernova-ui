import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useInlineStyles,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { BadgeProps } from './types';
import './styles.scss';

/**
 * UI component to display an item's summary information.
 */
const Badge: FC<BadgeProps> = props => {
  const {
    colorVariant,
    children,
    className,
    size = 'md',
    variant = 'solid',
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const createInlineStyles = useInlineStyles(colorVariant);
  const addClasses = useCreateClassString('snui snui-badge', {
    [`${className}`]: isString(className),
    [`snui-badge--${size}`]: isString(size),
    [`snui-badge--${variant}`]: isString(variant),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <span {...remainingProps} {...addClasses()} {...createInlineStyles()}>
      {children}
    </span>
  );
};

export default Badge;
