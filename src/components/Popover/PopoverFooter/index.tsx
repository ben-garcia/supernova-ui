import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, usePopover } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Popover component.
 */
const PopoverFooter: FC<PopoverFooterProps> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getPopoverFooterProps } = usePopover();

  return (
    <footer {...getPopoverFooterProps({ ...addCSSClassesAndProps() })}>
      {children}
    </footer>
  );
};

export default PopoverFooter;
