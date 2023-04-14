import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useDrawer } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Drawer.
 */
const DrawerFooter: FC<DrawerFooterProps> = props => {
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
