import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useInlineStyles } from '@hooks';
import { isString } from '@utils';
import { TagProps } from './types';
import './styles.scss';

/**
 * UI component to display an item's summary information.
 */
const Tag: FC<TagProps> = props => {
  const {
    colorVariant,
    children,
    size = 'md',
    variant = 'solid',
    ...rest
  } = props;
  const createInlineStyles = useInlineStyles(colorVariant);
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-tag',
    {
      [`snui-tag--${size}`]: isString(size),
      [`snui-tag--${variant}`]: isString(variant),
    }
  );

  return (
    <span {...addCSSClassesAndProps()} {...createInlineStyles()}>
      {children}
    </span>
  );
};

export default Tag;
