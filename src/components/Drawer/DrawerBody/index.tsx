import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, useDrawer } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Drawer.
 */
const DrawerBody: FC<DrawerBodyProps> = props => {
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
