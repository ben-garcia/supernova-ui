import { FC, MutableRefObject } from 'react';
import { DialogLikeProps } from '@types';
export interface PopoverProps extends Omit<DialogLikeProps, 'closeOnOverlayClick' | 'onClickOutside' | 'size'> {
    closeOnBlur?: boolean;
    /**
     * The reference element to receive focus when the Modal first opens
     */
    initialFocusRef?: MutableRefObject<HTMLElement | null>;
    /**
     * The function that toggles 'isOpen' state prop.
     *
     * NOTE: necessary when the component inside
     *       <PopoverTrigger> opens/closes the Popover.
     */
    onToggle?: () => void;
    /**
     * The callback function for when the Popover compnents loses focus.
     *
     * Note: closeOnBlur must be set to true.
     */
    onBlur?: () => void;
    /**
     * Return focus to <PopoverTrigger>
     *
     * Note: When using a component other than <PopoverTrigger> to trigger
     * the Popover this flag should be set to false.
     *
     * @default true
     */
    shouldReturnFocusOnClose?: boolean;
}
/**
 * The container for all Popover related components
 * that provides context to its children.
 */
declare const Popover: FC<PopoverProps>;
export default Popover;
//# sourceMappingURL=Popover.d.ts.map