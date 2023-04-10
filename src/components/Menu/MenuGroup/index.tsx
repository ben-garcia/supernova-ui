import React, { FC } from 'react';

import {
  useClassStyles,
  useCreateClassString,
  useMenu,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';
import { SupernovaProps } from '@types';

interface MenuGroupProps extends SupernovaProps {
  /*
   * the header that describes how items are grouped
   */
  title: string;
  /**
   * class for the title wrapper
   */
  titleClassName?: string;
}

/**
 * Wrapper to group relatved MenuItem
 */
const MenuGroup: FC<MenuGroupProps> = props => {
  const { children, className, title, titleClassName, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const addGroupClasses = useCreateClassString(
    'snui snui-menu__group snui-flex snui-flex-column',
    {
      [`${className}`]: isString(className),
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    }
  );
  const addTitleClasses = useCreateClassString(
    'snui-padding-inline-left snui-font-weight-xl snui-margin-y-sm snui-text-sm snui-font-heading snui-color-black',
    {
      [`${titleClassName}`]: isString(titleClassName),
    }
  );

  useMenu();

  return (
    <div {...remainingProps} {...addGroupClasses()} role="group">
      <span {...addTitleClasses()}>{title}</span>
      {children}
    </div>
  );
};

export default MenuGroup;
