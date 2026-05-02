import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { usePopover } from '@hooks/use-popover';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverBodyProps extends SupernovaProps {}

/**
 * The wrapper for the main content of the Popover.
 */
const ModalBody: FC<PropsWithChildren<PopoverBodyProps>> = props => {
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
