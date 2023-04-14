import { FC } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks';
import { createElement } from '@utils';
import { TextProps } from './types';
import './styles.scss';

/**
 * UI component to display individual pieces of text
 */
const Text: FC<TextProps> = props => {
  const { children, tag = 'span', ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-text'
  );

  return createElement(
    `${tag}`,
    {
      ...addCSSClassesAndProps(),
    },
    children
  );
};

export default Text;
