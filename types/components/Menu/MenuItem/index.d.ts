import React, { ReactNode } from 'react';
import { SupernovaProps } from '@types';
import './styles.scss';
export interface MenuItemProps extends SupernovaProps {
    children: ReactNode;
    onClick?: () => void;
}
/**
 * Menu option to select from.
 */
declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export default MenuItem;
//# sourceMappingURL=index.d.ts.map