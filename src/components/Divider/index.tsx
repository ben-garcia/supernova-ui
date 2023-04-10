import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePseudoClasses,
  useTheme,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { DividerProps } from './types';
import './styles.scss';

/**
 * A line that helps visually seperate content.
 *
 * NOTE: parent element must have a height for
 * orientation of vertial to work correctly.
 */
const Divider: FC<DividerProps> = props => {
  const {
    colorVariant,
    className,
    orientation = 'horizontal',
    size = 'md',
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const { colors } = useTheme();
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('snui snui-divider', {
    [`${className}`]: isString(className),
    [`snui-divider-${orientation}`]: isString(orientation),
    [`snui-divider-${orientation}--${size}`]: isString(size),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });

  return (
    <hr
      {...remainingProps}
      {...addClasses()}
      style={
        isString(colorVariant)
          ? { borderColor: colors[colorVariant!] }
          : undefined
      }
    />
  );
};

export default Divider;
