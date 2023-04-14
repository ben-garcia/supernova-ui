import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useTheme } from '@hooks';
import { isString } from '@utils';
import { SpinnerProps } from './types';
import './styles.scss';

/**
 * The Spinner component
 */
const Spinner: FC<SpinnerProps> = props => {
  const {
    borderThickness,
    duration,
    primaryColor,
    size = 'md',
    secondaryColor,
    ...rest
  } = props;
  const { colors } = useTheme();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-spinner',
    {
      [`snui-spinner--${size}`]: isString(size),
    }
  );

  return (
    <div
      {...addCSSClassesAndProps()}
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
