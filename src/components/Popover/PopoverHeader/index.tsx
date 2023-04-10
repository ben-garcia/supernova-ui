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

export interface PopoverHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Popover component.
 */
const PopoverHeader: FC<PopoverHeaderProps> = props => {
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
  const { getPopoverHeaderProps } = usePopover();

  return (
    <header {...getPopoverHeaderProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </header>
  );
};

export default PopoverHeader;
