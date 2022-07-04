import { RefObject } from 'react';

import {
  CommonProps,
  SupernovaUIBaseProps,
  TypographyProps,
} from '../../../types';

/**
 * Props for the Modal component
 */
export interface ModalProps
  extends Pick<CommonProps, 'boxShadow' | 'size'>,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
  /**
   * Configure whether Modal should close when Esc key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Configure whether Modal should close when the overlay window is clicked
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * The reference of element to receive focus when the Modal closes
   */
  finalFocusRef?: RefObject<HTMLElement>;
  /**
   * The reference of element to receive focus when the Modal first opens
   */
  initialFocusRef?: RefObject<HTMLElement>;
  /**
   * Flag that determines when to open the Modal
   */
  isOpen: boolean;
  /**
   * Function to execute after an overlay click.
   *
   * NOTE: closeOnOverlayClick must be set to true.
   */
  onClickOutside?: () => void;
  /**
   * Function to execute to close the Modal,
   */
  onClose: () => void;
  /**
   * Function to execute after esc key press.
   *
   * NOTE: closeOnEsc must be set to true.
   */
  onEscPress?: () => void;
  /**
   * Configure whether focus should be locked inside the Modal
   *
   * @default true
   */
  trapFocus?: boolean;
}
