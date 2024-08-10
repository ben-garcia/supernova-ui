import { FC, MutableRefObject } from 'react';
import { DialogLikeProps } from '@types';
export interface DrawerProps extends DialogLikeProps {
    /**
     * The reference element to receive focus when the Drawer first opens
     */
    initialFocusRef?: MutableRefObject<HTMLElement | null>;
    /**
     * The position relative to the viewport
     *
     * @default 'left'
     */
    placement?: 'bottom' | 'left' | 'right' | 'top';
}
/**
 * The container for all Drawer related components
 * that provides context to its children.
 */
declare const Drawer: FC<DrawerProps>;
export default Drawer;
//# sourceMappingURL=Drawer.d.ts.map