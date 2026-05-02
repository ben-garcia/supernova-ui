import type { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { isString } from '@utils/assertions';
import { createElement } from '@utils/react';
import type { HeadingProps } from './types';
import './styles.scss';

/**
 * Ui component to display headings
 */
const Heading: FC<PropsWithChildren<HeadingProps>> = props => {
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
