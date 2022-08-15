import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useDrawer,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface DrawerHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Drawer.
 */
const DrawerHeader: FC<DrawerHeaderProps> = props => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addClasses = useCreateClassString('', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const { getDrawerHeaderProps } = useDrawer();

  return (
    <header {...getDrawerHeaderProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </header>
  );
};

export default DrawerHeader;
