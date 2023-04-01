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

export interface PopoverBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Popover.
 */
const ModalBody: FC<PopoverBodyProps> = props => {
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
  const { getPopoverBodyProps } = usePopover();

  return (
    <div {...getPopoverBodyProps({ ...remainingProps, ...addClasses() })}>
      {children}
    </div>
  );
};

export default ModalBody;
