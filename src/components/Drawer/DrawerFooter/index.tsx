import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useDrawer } from '@hooks/use-drawer';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Drawer.
 */
const DrawerFooter: FC<PropsWithChildren<DrawerFooterProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getDrawerFooterProps } = useDrawer();

  return (
    <footer {...getDrawerFooterProps({ ...addCSSClassesAndProps() })}>
      {children}
    </footer>
  );
};

export default DrawerFooter;
