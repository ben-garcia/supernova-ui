import { AriaAttributes, ReactNode, SyntheticEvent } from 'react';

/**
 * The WAI ARIA supported attributes
 */
export type AriaProps = AriaAttributes;

/**
 * Available breakpoints defined in the theme
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
 * Props that are common to more than 1 component
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
   * The label should float to the top when in focus
   */
  floatLabel?: boolean;
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
 * Props used in form control components
 */
export interface FormControlProps {
  /**
   * Configure the label transform position after transition ends
   */
  finalLabelTransform?: string;
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
   * Function to be executed for onChange event
   */
  onChange?: (e: SyntheticEvent) => void;
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
 * Available fonts to choose from
 */
export type Fonts = 'heading' | 'body' | 'mono';

/**
 * Available sizes to choose from
 */
export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
