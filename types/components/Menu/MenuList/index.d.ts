import React from 'react';
import { SharedAnchorPositioningProps, SupernovaProps } from '@types';
import './styles.scss';
export interface MenuListProps extends SupernovaProps, Omit<SharedAnchorPositioningProps, 'withArrow' | 'placement'> {
    /**
     * Where the content of the Menu should be positioned
     * relative to the bottom of the trigger.
     *
     * @default 'start'
     */
    placement?: 'start' | 'center' | 'end';
    /**
     * Configure whether to render with an arrow pointing to the trigger element.
     *
     * NOTE: By default the color of the arrow is white.
     *       You can set a custom color by adding a
     *       'background' or 'backgroundColor' prop.
     *       If both are added, 'backgroundColor' takes precedence.
     *
     * @default false
     */
    withArrow?: boolean;
}
/**
 * Wrapper for all MenuItem
 */
declare const MenuList: React.ForwardRefExoticComponent<MenuListProps & React.RefAttributes<HTMLDivElement>>;
export default MenuList;
//# sourceMappingURL=index.d.ts.map