import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { useDrawer } from '@hooks/use-drawer';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Drawer.
 */
const DrawerBody: FC<PropsWithChildren<DrawerBodyProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getDrawerBodyProps } = useDrawer();

  return (
    <div {...getDrawerBodyProps({ ...addCSSClassesAndProps() })}>
      {children}
    </div>
  );
};

export default DrawerBody;
