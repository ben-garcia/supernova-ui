import type {
  StandardLonghandPropertiesHyphen,
  StandardLonghandProperties,
  StandardShorthandPropertiesHyphen,
  StandardShorthandProperties,
} from 'csstype';

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

export type PseudoProps = PseudoClassProps & PseudoElementProps;

/**
 * Props for pseudo-classes.
 */
interface PseudoClassProps {
  /**
   * This pseudo-class requires some interaction by the user in order
   * for them to apply, such as holding a mouse pointer over an element.
   *
   * Matches when an item is being activated by the user.
   * For example, when the item is clicked on.
   */
  _active?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches an element if the element would match either :link or :visited.
   */
  _anyLink?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches when an <input> has been autofilled by the browser.
   */
  _autofill?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches a user-input element which is empty,
   * containing an empty string or other null input.
   */
  _blank?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches when elements such as checkboxes and radio buttons are toggled on.
   */
  _checked?: CSSProps;
  /**
   * This pseudo-class applies when viewing something which has timing,
   * such as a WebVTT caption track.
   *
   * Represents the element or ancestor of the element that is being displayed.
   */
  _current?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches one or more UI elements that are the default among a set of elements.
   */
  _default?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Represents a user interface element that is in a disabled state.
   */
  _disabled?: CSSProps;
  /**
   * This pseudo-class relates to the location
   * of an element within the document tree.
   *
   * Represents an element with no children other than white-space characters.
   */
  _empty?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Represents a user interface element that is in an enabled state.
   */
  _enabled?: CSSProps;
  /**
   * This pseudo-class relates to the location
   * of an element within the document tree.
   *
   * Matches an element that is the first of its siblings.
   *
   */
  _firstChild?: CSSProps;
  /**
   * These pseudo-classes relate to the location
   * of an element within the document tree.
   *
   * Matches an element that is the first of its siblings,
   * and also matches a certain type selector.
   */
  _firstOfChild?: CSSProps;
  /**
   * This pseudo-class requires some interaction by the user in order
   * for them to apply, such as holding a mouse pointer over an element.
   *
   * Matches when an element has focus.
   */
  _focus?: CSSProps;
  /**
   * This pseudo-class requires some interaction by the user in order
   * for them to apply, such as holding a mouse pointer over an element.
   *
   * Matches an element to which :focus applies,
   * plus any element that has a descendant to which :focus applies.
   */
  _focusWithin?: CSSProps;
  /**
   * This pseudo-class requires some interaction by the user in order
   * for them to apply, such as holding a mouse pointer over an element.
   *
   * Matches when an element has focus and the user agent identifies
   * that the element should be visibly focused.
   */
  _focusVisible?: CSSProps;
  /**
   * This pseudo-class enable the selection of
   * elements based on their display states.
   *
   * Matches an element that is currently in fullscreen mode.
   */
  _fullscreen?: CSSProps;
  /**
   * This pseudo-class applies when viewing something which has timing,
   * such as a WebVTT caption track.
   *
   * Represents an element that occurs entirely after the :current element.
   */
  _future?: CSSProps;
  /**
   * This pseudo-class requires some interaction by the user in order
   * for them to apply, such as holding a mouse pointer over an element.
   *
   * Matches when a user designates an item with a pointing device,
   * such as holding the mouse pointer over the item.
   */
  _hover?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches UI elements when they are in an indeterminate state.
   */
  _indeterminate?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Applies to elements with range limitations. For example, a slider control
   * when the selected value is in the allowed range.
   */
  _inRange?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches an element with invalid contents. For example, an input element
   * with type 'email' with a name entered.
   */
  _invalid?: CSSProps;
  /**
   * These pseudo-classes relate to the location
   * of an element within the document tree.
   *
   * Matches an element that is the last of its siblings.
   */
  _lastChild?: CSSProps;
  /**
   * These pseudo-classes relate to the location
   * of an element within the document tree.
   *
   * Matches an element that is the last of its siblings,
   * and also matches a certain type selector.
   */
  _lastOfType?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches links that have not yet been visited.
   */
  _link?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches links whose absolute URL is the same as the target URL. For example, anchor links to the same page.
   */
  _localLink?: CSSProps;
  /**
   * This pseudo-class enable the selection of elements based on their display states.
   *
   * Matches an element that is in a state in which it excludes all interaction with elements outside it until the interaction has been dismissed.
   */
  _modal?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches when a form element is optional.
   */
  _optional?: CSSProps;
  /**
   * These pseudo-classes relate to the location
   * of an element within the document tree.
   *
   * Matches an element that has no siblings. For example, a list item with no other list items in that list.
   */
  _onlyChild?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Applies to elements with range limitations. For example, a slider control
   * when the selected value is outside the allowed range.
   */
  _outOfRange?: CSSProps;
  /**
   * These pseudo-classes relate to the location
   * of an element within the document tree.
   *
   * Matches an element that has no siblings of the chosen type selector.
   */
  _onlyOfType?: CSSProps;
  /**
   * This pseudo-class applies when viewing something which has timing,
   * such as a WebVTT caption track.
   *
   * Represents an element that occurs entirely before the :current element.
   */
  _past?: CSSProps;
  /**
   * This pseudo-class applies to media that is capable of being in a state
   * where it would be described as playing, such as a video.
   *
   * Represents a media element that is capable of
   * playing when that element is paused.
   */
  _paused?: CSSProps;
  /**
   * This pseudo-class enable the selection of elements based on their display states.
   *
   * Matches an element that is currently in picture-in-picture mode.
   */
  _pictureInPicture?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches an input element that is displaying placeholder text.
   * For example, it will match the placeholder attribute in the
   * <input> and <textarea> elements.
   */
  _placeholderShown?: CSSProps;
  /**
   * This pseudo-class applies to media that is capable of being
   * in a state where it would be described as playing, such as a video.
   *
   * Represents a media element that is capable of
   * playing when that element is playing.
   */
  _playing?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Represents any element that cannot be changed by the user.
   */
  _readOnly?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Represents any element that is user-editable.
   */
  _readWrite?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches when a form element is required.
   */
  _required?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Represents elements that are a reference point
   * for selectors to match against.
   */
  _scope?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches the element which is the target of the document URL.
   */
  _target?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches elements which are the target of the document URL, but also
   * elements which have a descendant which is the target of the document URL.
   */
  _targetWithin?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Represents an element with incorrect input, but only when the user
   * has interacted with it.
   */
  _userInvalid?: CSSProps;
  /**
   * This pseudo-class relates to form elements,
   * and enable selecting elements based on HTML attributes
   * and the state that the field is in before and after interaction.
   *
   * Matches an element with valid contents.For example, an input element
   * with the type 'email' that contains a validly formed email address or
   * an empty value if the control is not required.
   */
  _valid?: CSSProps;
  /**
   * This pseudo-class relates to links, and to targeted elements within
   * the current document.
   *
   * Matches links that have been visited.
   */
  _visited?: CSSProps;
}

/*
 * Props for pseudo-elements.
 */
interface PseudoElementProps {
  /**
   * The ::after CSS pseudo-element creates a pseudo-element that is the last child of the selected element.
   * It is often used to add cosmetic content to an element with
   * the content property. It is inline by default.
   */
  _after?: CSSProps;
  /**
   * The ::before CSS pseudo-element creates a pseudo-element that is the
   * first child of the selected element.
   * It is often used to add cosmetic content to an element with
   * the content property. It is inline by default.
   */
  _before?: CSSProps;
  /**
   * The ::first-letter CSS pseudo-element applies styles to the first letter
   * of the first line
   * of a block-level element, but only when not preceded by other content *
   * (such as images or inline tables).
   */
  _firstLetter?: CSSProps;
  /**
   * The ::first-line CSS pseudo-element applies styles to the first line
   * of a block-level element.
   */
  _firstLine?: CSSProps;
  /**
   * The ::placeholder CSS pseudo-element represents the placeholder text in
   * an <input> or <textarea> element.
   */
  _placeholder?: CSSProps;
  /**
   * The ::selection CSS pseudo-element applies styles to the part of a
   * document that has been highlighted by the user (such as clicking and
   * dragging the mouse across text).
   */
  _selection?: CSSProps;
}
