import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import type { OverlayProps } from './types';
import './styles.scss';

/**
 * UI component that is used to dim the background
 * to set the focus to its children.
 */
const Overlay: FC<PropsWithChildren<OverlayProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    rest,
    'snui snui-overlay'
  );

  return <div {...addCSSClassesAndProps()}>{children}</div>;
};

export default Overlay;
