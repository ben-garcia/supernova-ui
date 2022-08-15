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

export interface DrawerBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Drawer.
 */
const DrawerBody: FC<DrawerBodyProps> = props => {
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
  const { getDrawerBodyProps } = useDrawer();

  return (
    <div {...getDrawerBodyProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </div>
  );
};

export default DrawerBody;
