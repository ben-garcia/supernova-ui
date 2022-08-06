// helper functions to interact with the DOM.

import { isArray, isString } from '@utils';

/**
 * Add a <style> element to the end of the <head> element.
 *
 * @param 'className' class to be associated with the styles.
 * @param 'textNodeContent' the CSS styles
 *
 * @return the newly added <style> element
 *
 */
export const addStyleToDOM = (className: string, textNodeContent: string) => {
  const styleElement = document.createElement('style');
  const textNode = document.createTextNode(textNodeContent);

  styleElement.setAttribute('id', className);
  styleElement.appendChild(textNode);

  document.head.appendChild(styleElement);

  return styleElement;
};

/**
 *
 */
export const getElementFromDOM = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    return element;
  }
  return null;
};

/**
 * Query the DOM for an element with the given id.
 *
 * @param id the id of the element to query.
 *
 * @return whether there is an element in the DOM with the given id.
 */
export const isElementInDOM = (id: string) => {
  const element = getElementFromDOM(id);
  if (element) {
    return true;
  }
  return false;
};

/**
 * Remove <style> element from the DOM.
 *
 * @param 'element' can be <style> element,
 * array of <style> elements or id of <style> element.
 *
 */
export const removeStyleFromDOM = (
  element: HTMLStyleElement[] | HTMLStyleElement | string
) => {
  if (isArray(element)) {
    (element as HTMLStyleElement[]).forEach(e => document.head.removeChild(e));
  } else if (isString(element)) {
    const styleElement = getElementFromDOM(element as string);
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  } else {
    document.head.removeChild(element as HTMLStyleElement);
  }
};
