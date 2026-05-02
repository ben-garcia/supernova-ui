import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { usePopover } from '@hooks/use-popover';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverFooterProps extends SupernovaProps {}

/**
 * The wrapper for the footer content of the Popover component.
 */
const PopoverFooter: FC<PropsWithChildren<PopoverFooterProps>> = props => {
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
