import { FC, MutableRefObject } from 'react';
import { DialogLikeProps } from '@types';
export interface AlertDialogProps extends DialogLikeProps {
    /**
     * The reference element to receive focus after the AlertDialog opens
     */
    leastDestructiveRef: MutableRefObject<HTMLElement | null>;
}
/**
 * The container for all AlertDialog related components
 * that provides context to its children.
 */
declare const AlertDialog: FC<AlertDialogProps>;
export default AlertDialog;
//# sourceMappingURL=AlertDialog.d.ts.map