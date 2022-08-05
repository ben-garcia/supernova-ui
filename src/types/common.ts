import type {
  StandardLonghandPropertiesHyphen,
  StandardLonghandProperties,
  StandardShorthandPropertiesHyphen,
  StandardShorthandProperties,
} from 'csstype';
import type {
  AriaAttributes,
  ChangeEvent,
  FC,
  RefObject,
  FocusEvent,
  ReactNode,
} from 'react';

import type {
  HTMLAttributes,
  HTMLElements,
  SupernovaUIBaseProps,
  TypographyProps,
  WithResponsiveProps,
} from '@types';

/**
 * The WAI ARIA supported attributes.
 */
export type AriaProps = AriaAttributes;

/**
 * Available breakpoints defined in the theme.
 */
export interface Breakpoints {
  /**
   * Configure how the component should render
   * when the viewport width equals the xs breakpoint
   *
   * value of xs breakpoint is (min-width: 0)
   * but can be user defined
   */
  xs?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the sm breakpoint
   *
   * value of sm breakpoint is (min-width: 480px)
   * but can be user defined
   */
  sm?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the md breakpoint
   *
   * value of md breakpoint is (min-width: 768px)
   * but can be user defined
   */
  md?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the lg breakpoint
   *
   * value of lg breakpoint is (min-width: 992px)
   * but can be user defined
   */
  lg?: Sizes | string;
  /**
   * Configure how the component should render
   * when the viewport width equals the xl breakpoint
   *
   * value of xl breakpoint is (min-width: 1280px)
   * but can be user defined
   */
  xl?: Sizes | string;
  /**
   *
   * Configure how the component should render
   * when the viewport width equals the xxl breakpoint
   *
   * value of xxl breakpoint is (min-width: 1536px)
   * but can be user defined
   */
  xxl?: Sizes | string;
}
/**
 * Props that are common to more than 1 component.
 */
export interface CommonProps {
  /**
   * The border radius
   *
   * accepts
   *
   * string with value of a valid size
   * e.g.
   *	borderRadius="lg"
   *
   * or
   *
   * valid css border-radius value
   * e.g.
   *	borderRadius="1px solid green"
   */
  borderRadius?: Sizes | string;
  /**
   * The box shadow
   *
   * accepts
   *
   * string with value of a valid size
   * e.g.
   *	boxShadow="lg"
   *
   * or
   *
   * valid css box-shadow value
   * e.g.
   *	boxShadow="0 0 1px black"
   */
  boxShadow?: Sizes | string;
  /**
   * React children
   */
  children: ReactNode;
  /**
   * Custom background color when a hover event is triggered
   */
  hoverBackgroundColor?: string;
  /**
   * Custom color when a hover event is triggered
   */
  hoverColor?: string;
  /**
   * Disable interactivity
   */
  isDisabled?: boolean;
  /**
   * Indicates to the user that something is happening
   */
  isLoading?: boolean;
  /**
   * Icon to the left of the text
   */
  leftIcon?: CommonProps['children'];
  /**
   * Icon to the right of the text
   */
  rightIcon?: CommonProps['children'];
  /**
   * The size of the icon
   *
   * accepts
   *
   * 1. Breakpoints object to configure the size based on viewport width
   * e.g.
   *	size: {xs: ''<value>', ... ,  xxl: '<value>'}
   *
   * 2. string with value of a valid size
   * e.g.
   *	size="lg"
   *
   * or
   *
   * css height and width valid value
   * e.g.
   *	size="3rem"
   */
  size?: Breakpoints | string;
}

/**
 * Props for AlertDialog, Drawer, and Modal.
 */
export interface DialogLikeProps
  extends Pick<CommonProps, 'boxShadow' | 'size'>,
    SupernovaUIBaseProps,
    Omit<TypographyProps, 'align'> {
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
   * Configure whether focus should be locked inside the Modal
   *
   * @default true
   */
  trapFocus?: boolean;
}

/**
 * Props used in form control components.
 */
export interface FormControlProps {
  /**
   * Configure the label transform position after transition ends
   */
  finalLabelTransform?: string;
  /**
   * The label should float to the top when in focus
   */
  floatLabel?: boolean;
  /**
   * Configure the initial transform position before the transition begins
   */
  initialLabelTransform?: string;
  /**
   * The label for the interactive component
   *
   * used to set the value of 'aria-label' and 'placeholder' props
   * when 'floatLabel' is 'false'
   */
  label: string;
  /**
   * Name for the form control component
   */
  name?: string;
  /**
   * Function to be executed for onBlur event
   */
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  /**
   * Function to be executed for onChange event
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Value of the form control component
   */
  value?: string;
  /**
   * The look of the button
   *
   * @default 'outline'
   */
  variant?: 'filled' | 'flushed' | 'outline';
}

/**
 * Component font families.
 */
export type Fonts = 'heading' | 'body' | 'mono';

/**
 * Component sizes.
 */
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * All CSS properties
 *
 * includes shorthand properties like 'background'
 * and longhand properties like 'backgroundColor'.
 */
export type CSSProps = StandardLonghandProperties & StandardShorthandProperties;

/**
 * All hyphenated prefix CSS properties
 *
 * includes shorthand properties like 'animation'
 * and longhand properties like 'animation-delay'.
 */
export type CSSPropsHyphen = StandardLonghandPropertiesHyphen &
  StandardShorthandPropertiesHyphen;

/**
 * Props for pseudo class.
 */
export interface PseudoClassProps {
  _focus?: CSSProps;
  _hover?: CSSProps;
}

/**
 * Props shared by all supernova-ui components.
 */
export type SupernovaProps<String = ''> = String extends HTMLElements
  ? WithResponsiveProps<CSSProps> & PseudoClassProps & HTMLAttributes<String>
  : FC<WithResponsiveProps<CSSProps> & PseudoClassProps>;
