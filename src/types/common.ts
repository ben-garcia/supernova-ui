import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  TextareaHTMLAttributes,
} from 'react';

import type { CSSProps, PseudoProps, WithResponsiveProps } from '@types';

import colors from '../theme/colors';

/**
 * Any object
 */
export interface AnyObject {
  [key: string]: any;
}

/**
 * Props for AlertDialog, Drawer, and Modal.
 */
export interface DialogLikeProps {
  /**
   * Configure whether Dialog should close when Esc key is pressed
   *
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Configure whether Dialog should close when the overlay window is clicked
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * The reference of element to receive focus when the Dialog closes
   */
  finalFocusRef?: RefObject<HTMLElement>;
  /**
   * Flag that determines when to open the Dialog
   */
  isOpen: boolean;
  /**
   * Function to execute after an overlay click.
   *
   * NOTE: closeOnOverlayClick must be set to true.
   */
  onClickOutside?: () => void;
  /**
   * Function to execute to close the Dialog,
   */
  onClose: () => void;
  /**
   * Function to execute after esc key press.
   *
   * NOTE: closeOnEsc must be set to true.
   */
  onEscPress?: () => void;
  /**
   * The size of the component.
   */
  size?: FormControlProps['size'] | 'xl' | 'xxl';
  /**
   * Configure whether focus should be locked inside the Modal
   *
   * @default true
   */
  trapFocus?: boolean;
}

/**
 * Colors from the theme.
 */
export type ColorVariant = keyof typeof colors;

/**
 * Props used in form control components.
 */
export interface FormControlProps {
  /**
   * Set the background using a color from the theme.
   *
   * NOTE: This will override 'background'.
   */
  colorVariant?: ColorVariant;
  /**
   * Disable interactivity
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Set size for the component.
   */
  size?: ComponentSize;
  /**
   * The look of the button
   *
   * @default 'outline'
   */
  variant?: 'filled' | 'flushed' | 'outline';
}

/**
 * Component sizes.
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * All attributes supplied to a React button.
 */
type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
/**
 * All attributes supplied to a React input.
 */
type ReactInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;
/**
 * All attributes supplied to a React textarea.
 */
type ReactTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

/**
 * React elements with their respective attributes.
 */
interface ReactElementProps {
  button: ReactButtonProps;
  input: ReactInputProps;
  textarea: ReactTextareaProps;
}

interface SharedProps {
  /**
   * class HTML attribute to add.
   */
  className?: string;
  /**
   * id HTML attribute to add.
   */
  id?: string;
}

/**
 * Props shared by all supernova-ui components.
 */
export type SupernovaProps<Type = ''> = Type extends keyof ReactElementProps
  ? WithResponsiveProps<CSSProps> & PseudoProps & ReactElementProps[Type]
  : WithResponsiveProps<CSSProps> & PseudoProps & SharedProps;
