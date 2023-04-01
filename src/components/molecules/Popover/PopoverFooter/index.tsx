import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  usePopover,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Popover component.
 */
const PopoverFooter: FC<PopoverFooterProps> = props => {
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
  const { getPopoverFooterProps } = usePopover();

  return (
    <footer {...getPopoverFooterProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </footer>
  );
};

export default PopoverFooter;
