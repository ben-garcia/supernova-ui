import { ReactNode, RefObject } from 'react';

export interface FocusLockProps {
  children: ReactNode;
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
   * Function to trigger the exit animation.
   */
  enterExitMode: () => void;
  /**
   * The reference of element to receive focus when the Modal closes
   */
  finalFocusRef?: RefObject<HTMLElement>;
  /**
   * The reference of element to receive focus when the Modal first opens
   */
  initialFocusRef?: RefObject<HTMLElement>;
  /**
   * Function to trigger the exit animation.
   */
  leaveExitMode: () => void;
  /**
   * Function to execute after an overlay click.
   */
  onClickOutside?: () => void;
  /**
   * Function to execute to close the Modal
   */
  onClose: () => void;
  /**
   * Function to execute after esc key press.
   */
  onEscPress?: () => void;
  /**
   * Should the focus be allowed outside the component
   *
   * @default true
   */
  trapFocus?: boolean;
}
