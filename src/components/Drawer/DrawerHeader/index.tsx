import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useDrawer } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Drawer.
 */
const DrawerHeader: FC<DrawerHeaderProps> = props => {
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
