import React, { FC, PropsWithChildren } from 'react';

import { useCSSAndPseudoClassProps } from '@hooks/use-css-and-pseudo-class-props';
import { usePopover } from '@hooks/use-popover';
import type { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Popover component.
 */
const PopoverHeader: FC<PropsWithChildren<PopoverHeaderProps>> = props => {
  const { children, ...rest } = props;
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(rest, '');
  const { getPopoverHeaderProps } = usePopover();

  return (
    <header {...getPopoverHeaderProps({ ...addCSSClassesAndProps() })}>
      {children}
    </header>
  );
};

export default PopoverHeader;
