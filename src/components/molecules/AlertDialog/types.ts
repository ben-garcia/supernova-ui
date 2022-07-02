import { RefObject } from 'react';

import {
  CommonProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the AlertDialog component
 */
export interface AlertDialogProps
  extends Pick<CommonProps, 'boxShadow' | 'size'>,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Configure whether AlertDialog should close when Esc key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Configure whether AlertDialog should close when the overlay window is clicked
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * The reference of element to receive focus when the AlertDialog closes
   *
   * if not set, the focus returns to the button that triggerd it.
   */
  finalFocusRef?: RefObject<HTMLElement>;
  /**
   * The reference of element to receive focus when the AlertDialog opens
   */
  leastDestructiveRef: RefObject<HTMLElement>;
  /**
   * Flag that determines when to open the AlertDialog
   */
  isOpen: boolean;
  /**
   * Function to execute after an overlay click.
   *
   * NOTE: closeOnOverlayClick must be set to true.
   */
  onClickOutside?: () => void;
  /**
   * Function to execute to close the AlertDialog
   */
  onClose: () => void;
  /**
   * Function to execute after esc key press.
   *
   * NOTE: closeOnEsc must be set to true.
   */
  onEscPress?: () => void;
  /**
   * Configure whether focus should be locked inside the AlertDialog
   *
   * @default true
   */
  trapFocus?: boolean;
}
