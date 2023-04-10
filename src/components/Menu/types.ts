export interface MenuProps {
  /**
   * Configure whether the Menu should close when Esc key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Flag that determines when to open the Menu
   */
  isOpen: boolean;
  /**
   * Function to execute to close the Menu
   */
  onClose: () => void;
}
