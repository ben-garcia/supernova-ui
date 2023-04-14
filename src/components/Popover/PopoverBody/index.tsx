import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, usePopover } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Popover.
 */
const ModalBody: FC<PopoverBodyProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getPopoverBodyProps } = usePopover();

  return (
    <div {...getPopoverBodyProps({ ...addCSSClassesAndProps() })}>
      {children}
    </div>
  );
};

export default ModalBody;
