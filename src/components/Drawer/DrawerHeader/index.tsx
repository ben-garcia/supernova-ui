import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useDrawer } from '@hooks/use-drawer';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Drawer.
 */
const DrawerHeader: FC<PropsWithChildren<DrawerHeaderProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getDrawerHeaderProps } = useDrawer();

  return (
    <header {...getDrawerHeaderProps({ ...addCSSClassesAndProps() })}>
      {children}
    </header>
  );
};

export default DrawerHeader;
