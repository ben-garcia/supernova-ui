import React, { FC } from 'react';

import { useCSSAndPseudoClassProps, usePopover } from '@hooks';
import { SupernovaProps } from '@types';
import './styles.scss';

export interface PopoverHeaderProps extends SupernovaProps {}

/**
 * The wrapper for the header content of the Popover component.
 */
const PopoverHeader: FC<PopoverHeaderProps> = props => {
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
