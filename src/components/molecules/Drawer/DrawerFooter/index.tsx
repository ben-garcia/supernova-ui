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

export interface DrawerFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Drawer.
 */
const DrawerFooter: FC<DrawerFooterProps> = props => {
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
  const { getDrawerFooterProps } = useDrawer();

  return (
    <footer {...getDrawerFooterProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </footer>
  );
};

export default DrawerFooter;
