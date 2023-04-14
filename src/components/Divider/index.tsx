import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useTheme } from '@hooks';
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
    orientation = 'horizontal',
    size = 'md',
    ...rest
  } = props;
  const { colors } = useTheme();
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-divider',
    {
      [`snui-divider-${orientation}`]: isString(orientation),
      [`snui-divider-${orientation}--${size}`]: isString(size),
    }
  );

  return (
    <hr
      {...addCSSClassesAndProps()}
      style={
        isString(colorVariant)
          ? { borderColor: colors[colorVariant!] }
          : undefined
      }
    />
  );
};

export default Divider;
