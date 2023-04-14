import { FC } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks';
import { createElement } from '@utils';
import { SupernovaProps } from '@types';

type Tag = 'article' | 'div' | 'footer' | 'header' | 'section';
export interface BoxProps extends SupernovaProps {
  tag?: Tag;
}

/**
 * Container component used as a wrapper for other components.
 */
const Box: FC<BoxProps> = props => {
  const { children, tag = 'div', ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-box'
  );

  return createElement(tag, { ...addCSSClassesAndProps() }, children);
};

export default Box;
