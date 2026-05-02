import { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { createElement } from '@utils/react';
import type { TextProps } from './types';
import './styles.scss';

/**
 * UI component to display individual pieces of text
 */
const Text: FC<PropsWithChildren<TextProps>> = props => {
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
