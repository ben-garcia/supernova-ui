import { FC } from 'react';
import { SupernovaProps } from '@types';
interface MenuGroupProps extends SupernovaProps {
    title: string;
    /**
     * class for the title wrapper
     */
    titleClassName?: string;
}
/**
 * Wrapper to group relatved MenuItem
 */
declare const MenuGroup: FC<MenuGroupProps>;
export default MenuGroup;
//# sourceMappingURL=index.d.ts.map