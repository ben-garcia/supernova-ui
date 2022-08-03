import { useCallback, useContext, useEffect, useRef } from 'react';
import { compile, middleware, prefixer, serialize, stringify } from 'stylis';

import { StyleClass, StyleContext } from '@contexts';
import { isString } from '@utils';

import type {
  HyphenCSSProperities,
  PseudoClassProps,
  StandardCSSProperties,
} from '@types';

/**
 * Hook that returns the StyleProvider context.
 */
const usePseudoClasses = () => {
  const context = useContext(StyleContext);

  if (!context) {
    throw new Error(
      'usePseudoClasses: context is undefined, did you remember to wrap your component in a pair <Supernova>'
    );
  }
  return context;
};

/**
 *  Hook that injects classes in the DOM based on _focus and _hover props.
 *
 *  @param props pseduo classes object.
 *
 *  @returns className/s with the corresponding styles.
 */
export const useStyle = (props: Partial<PseudoClassProps>) => {
  const { _focus, _hover } = props;
  const styleClassesRef = usePseudoClasses();

  const className = useRef(
    _focus || _hover ? `snui-${Math.random().toString(36).substring(2, 7)}` : ''
  );
  const newClassRef = useRef<string[]>(['', '']);

  /**
   * Get the style object from Style context.
   *
   * @param classObj the style context object.
   * @param stylesToFind string containing the styles
   * @param pseudoClass pseduo class type.
   *
   * @returns style object from the style context if found,
   * otherwise null is returned.
   */
  const getStyleObject = useCallback(
    (
      classObj: StyleClass[],
      stylesToFind: string,
      pseudoClass: 'focus' | 'hover'
    ) => {
      const obj = classObj.find(
        e => e.styles === stylesToFind && e.pseudoKind === pseudoClass
      );

      if (obj) {
        return obj;
      }

      return null;
    },
    []
  );

  /**
   * Convert JS CSS properties object into an object with valid CSS.
   *
   * Example
   *     input => {backgroundColor: 'red', color: 'white'}
   *     output => {'background-color': 'red', color: 'white'}
   *
   * @param obj Javascript CSS object
   *
   * @returns CSS valid object.
   */
  const cssCamelCaseToHyphenated = useCallback((obj: StandardCSSProperties) => {
    const newObj: HyphenCSSProperities = {};
    // keep track of the index to used when accessing values array.
    let index;
    const values = Object.values(obj);
    Object.keys(obj).forEach((k, idx) => {
      index = idx;
      let str = '';
      // loop through each letter of the key and
      // if it is a uppercase letter convert to lowercase and
      // add '-' between the words.

      // eslint-disable-next-line
      for (const i in k as any) {
        const asciiCode = k.charCodeAt(parseInt(i, 10));
        if (asciiCode >= 65 && asciiCode <= 90) {
          str = `${str}-${String.fromCharCode(
            k.charCodeAt(parseInt(i, 10)) + 32
          )}`;
        } else {
          str = `${str}${k.charAt(parseInt(i, 10))}`;
        }
      }
      (newObj as any)[str] = values[index];
    });

    return newObj;
  }, []);

  useEffect(() => {
    const styleEl: HTMLStyleElement[] = [];

    if (_focus || _hover) {
      const str: string[] = ['', ''];

      if (_focus) {
        // format the _focus object into valid CSS.
        str[0] = JSON.stringify(cssCamelCaseToHyphenated(_focus));
        str[0] = str[0].replace(/,/g, ';');
        str[0] = str[0].replace(/[{}"]/g, '');
        // look for styles string in the style context.
        const styleObj = getStyleObject(
          styleClassesRef.current,
          str[0],
          'focus'
        );
        // when no object is found,
        // inject HTML <style> with valid with the correct styles.
        if (!styleObj) {
          className.current = `${className.current}f`;
          styleEl[0] = document.createElement('style');
          styleEl[0].setAttribute('id', className.current);
          styleClassesRef.current = [
            {
              className: className.current,
              count: 1,
              pseudoKind: 'focus',
              styles: str[0],
            },
          ];
          str[0] = `.${className.current}:focus{${str[0]};}`;
          styleEl[0].appendChild(
            document.createTextNode(
              serialize(compile(str[0]), middleware([prefixer, stringify]))
            )
          );
          document.head.appendChild(styleEl[0]);
        } else {
          // when there is already an object that matches those styles,
          // increment count by one and update style context object.
          newClassRef.current[0] = styleObj.className;
          const filtered = styleClassesRef.current.filter(
            e =>
              e.styles !== styleObj.styles ||
              e.pseudoKind !== styleObj.pseudoKind
          );
          styleObj.count += 1;
          styleClassesRef.current = [...filtered, styleObj];
        }
      }

      if (_hover) {
        // format the _hover object into valid CSS.
        str[1] = JSON.stringify(cssCamelCaseToHyphenated(_hover));
        str[1] = str[1].replace(/,/g, ';');
        str[1] = str[1].replace(/[{}"]/g, '');
        // look for styles string in the style context.
        const styleObj = getStyleObject(
          styleClassesRef.current,
          str[1],
          'hover'
        );
        // when no object is found,
        // inject HTML <style> with valid with the correct styles.
        if (!styleObj) {
          const temp = className.current;
          if (_focus) {
            className.current = `${className.current.replace(/f$/, 'h')}`;
          } else {
            className.current = `${className.current}h`;
          }
          styleEl[1] = document.createElement('style');
          styleEl[1].setAttribute('id', className.current);

          styleClassesRef.current = [
            ...styleClassesRef.current,
            {
              className: className.current,
              count: 1,
              pseudoKind: 'hover',
              styles: str[1],
            },
          ];
          str[1] = `.${className.current}:hover{${str[1]};}`;
          styleEl[1].appendChild(
            document.createTextNode(
              serialize(compile(str[1]), middleware([prefixer, stringify]))
            )
          );
          if (_focus) {
            className.current = `${temp} ${className.current}`;
          }
          document.head.appendChild(styleEl[1]);
        } else {
          // when there is already an object that matches those styles,
          // increment count by one and update style context object.
          newClassRef.current[1] = styleObj.className;
          const filtered = styleClassesRef.current.filter(
            e =>
              e.styles !== styleObj.styles ||
              e.pseudoKind !== styleObj.pseudoKind
          );
          styleObj.count += 1;
          styleClassesRef.current = [...filtered, styleObj];
        }
      }
    }

    // cleanup function is used to remove the HTML <style> tags when
    // there is not other element that is using them.
    // otherwise it will decrement the style context count property.
    return () => {
      if (styleEl.length) {
        if (styleEl[0]) {
          const style = styleClassesRef.current.find(
            e => e.className === className.current.split(' ')[0]
          );
          if (style) {
            if (style.count === 1) {
              document.head.removeChild(styleEl[0]);
              const filtered = styleClassesRef.current.filter(
                e => e.className !== className.current.split(' ')[0]
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== className.current.split(' ')[0]
              );
              style.count -= 1;
              styleClassesRef.current = [...filtered, style];
            }
          }
        }
        if (styleEl[1]) {
          const style = styleClassesRef.current.find(
            e => e.className === className.current.split(' ')[1]
          );
          if (style) {
            if (style.count === 1) {
              document.head.removeChild(styleEl[1]);
              const filtered = styleClassesRef.current.filter(
                e => e.className !== className.current.split(' ')[1]
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== className.current.split(' ')[1]
              );
              style.count -= 1;
              styleClassesRef.current = [...filtered, style];
            }
          }
        }
      }

      if (isString(newClassRef.current.join(' '))) {
        if (isString(newClassRef.current[0])) {
          const style = styleClassesRef.current.find(
            e => e.className === newClassRef.current[0]
          );
          if (style) {
            if (style.count === 1) {
              document.head.removeChild(
                document.getElementById(newClassRef.current[0])!
              );
              const filtered = styleClassesRef.current.filter(
                e => e.className !== newClassRef.current[0]
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== newClassRef.current[0]
              );
              style.count -= 1;
              styleClassesRef.current = [...filtered, style];
            }
          }
        }
        if (isString(newClassRef.current[1])) {
          const style = styleClassesRef.current.find(
            e => e.className === newClassRef.current[1]
          );
          if (style) {
            if (style.count === 1) {
              document.head.removeChild(
                document.getElementById(newClassRef.current[1])!
              );
              const filtered = styleClassesRef.current.filter(
                e => e.className !== newClassRef.current[1]
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== newClassRef.current[1]
              );
              style.count -= 1;
              styleClassesRef.current = [...filtered, style];
            }
          }
        }
      }
    };
  }, []);

  return {
    className: isString(newClassRef.current.join(' '))
      ? newClassRef.current.join(' ')
      : className.current,
  };
};
