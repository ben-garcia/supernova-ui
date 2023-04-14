import type { FC } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks';
import { createElement, isString } from '@utils';
import { HeadingProps } from './types';
import './styles.scss';

/**
 * Ui component to display headings
 */
const Heading: FC<HeadingProps> = props => {
  const { children, level = 1, size = 'xl', ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-heading',
    {
      [`snui-heading--${size}`]: isString(size),
    }
  );

  return createElement(
    `h${level}`,
    {
      ...addCSSClassesAndProps(),
    },
    children
  );
};

export default Heading;
