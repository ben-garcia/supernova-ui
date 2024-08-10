/**
 * Add a <style> element to the end of the <head> element.
 *
 * @param 'className' class to be associated with the styles.
 * @param 'textNodeContent' the CSS styles
 *
 * @return the newly added <style> element
 *
 */
export declare const addStyleToDOM: (className: string, textNodeContent: string) => HTMLStyleElement;
/**
 * Return an element in the DOM.
 *
 * @param id identification to use in the lookup.
 *
 */
export declare const getElementFromDOM: (id: string) => HTMLElement | null;
/**
 * Check for the window object.
 */
export declare const isBrowser: () => boolean;
/**
 * Query the DOM for an element with the given id.
 *
 * @param id the id of the element to query.
 *
 * @return whether there is an element in the DOM with the given id.
 */
export declare const isElementInDOM: (id: string) => boolean;
/**
 * Remove <style> element from the DOM.
 *
 * @param 'element' can be <style> element,
 * array of <style> elements or id of <style> element.
 *
 */
export declare const removeStyleFromDOM: (element: HTMLStyleElement[] | HTMLStyleElement | string) => void;
//# sourceMappingURL=dom.d.ts.map