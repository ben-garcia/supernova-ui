import React, { FC } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks';
import { isString } from '@utils';
import { ParagraphProps } from './types';
import './styles.scss';

/**
 * UI component to display a paragraph
 */
const Paragraph: FC<ParagraphProps> = props => {
  const { children, size = 'xl', ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-paragraph',
    {
      [`snui-paragraph--${size}`]: isString(size),
    }
  );

  return <p {...addCSSClassesAndProps()}>{children}</p>;
};

export default Paragraph;
