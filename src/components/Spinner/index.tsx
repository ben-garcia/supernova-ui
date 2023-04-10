import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useTheme,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SpinnerProps } from './types';
import './styles.scss';

/**
 * The Spinner component
 */
const Spinner: FC<SpinnerProps> = props => {
  const {
    borderThickness,
    className,
    duration,
    primaryColor,
    size = 'md',
    secondaryColor,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const { colors } = useTheme();
  const addClasses = useCreateClassString('snui snui-spinner', {
    [`${className}`]: isString(className),
    [`snui-spinner--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <div
      {...remainingProps}
      {...addClasses()}
      style={{
        animationDuration: isString(duration) ? duration : undefined,
        borderBottomColor: isString(primaryColor)
          ? colors[primaryColor as keyof typeof colors]
          : undefined,
        borderRightColor: isString(primaryColor)
          ? colors[primaryColor as keyof typeof colors]
          : undefined,
        borderLeftColor: isString(secondaryColor)
          ? colors[secondaryColor as keyof typeof colors]
          : undefined,
        borderTopColor: isString(secondaryColor)
          ? colors[secondaryColor as keyof typeof colors]
          : undefined,
        borderWidth: isString(borderThickness) ? borderThickness : undefined,
      }}
    />
  );
};

export default Spinner;
