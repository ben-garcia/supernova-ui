import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useUniqueStringId } from '@hooks';
import { PseudoClassesAndElements, StyleClass, StyleContext } from '@contexts';
import {
  addStyleToDOM,
  addCSSPrefixes,
  cssCamelCaseToHyphenated,
  isObject,
  isString,
  removeStyleFromDOM,
} from '@utils';

import type { CSSProps, PseudoProps } from '@types';

/**
 * Force an update.
 */
const forceUpdate = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
};

/**
 * Hook that returns the StyleProvider context.
 */
const useStyle = () => {
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
 *  @param props pseudo classes object.
 *
 *  @returns className/s with the corresponding styles.
 */
export const usePseudoClasses = (props: Partial<PseudoProps>) => {
  const styleClassesRef = useStyle();

  const uniqueId = useUniqueStringId(3);
  const className = useRef(isObject(props) ? uniqueId : '');
  const classNames = useRef<string[]>([]);
  const newClassRef = useRef<string[]>([]);
  const pseudoElements = [
    'after',
    'before',
    'first-letter',
    'first-line',
    'placeholder',
    'selection',
  ];

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
    (classObj: StyleClass[], stylesToFind: string, pseudoClass: string) => {
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

  useEffect(() => {
    const styleElements: HTMLStyleElement[] = [];

    if (isObject(props)) {
      const formattedStylesString: string[] = [];

      const keys = Object.keys(props).map(prop => {
        let str = '';
        const newStr = prop.substring(1, prop.length);
        // @ts-ignore
        // eslint-disable-next-line
        for (const i in newStr) {
          const asciiCode = newStr.charCodeAt(parseInt(i, 10));
          if (asciiCode >= 65 && asciiCode <= 90) {
            str = `${str}-${String.fromCharCode(
              newStr.charCodeAt(parseInt(i, 10)) + 32
            )}`;
          } else {
            str = `${str}${newStr.charAt(parseInt(i, 10))}`;
          }
        }
        return str;
      });

      Object.values(props).forEach((styles, index) => {
        if (styles?.content === '') {
          throw new Error(
            "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"\"'`"
          );
        }
        formattedStylesString.push(
          JSON.stringify(cssCamelCaseToHyphenated(styles as CSSProps))
        );
        formattedStylesString[index] = formattedStylesString[index].replace(
          /,/g,
          ';'
        );
        formattedStylesString[index] = formattedStylesString[index].replace(
          /[{}"]/g,
          ''
        );
        formattedStylesString[index] = formattedStylesString[index].replace(
          /[\\]/g,
          '"'
        );

        const styleObj = getStyleObject(
          styleClassesRef.current,
          formattedStylesString[index],
          keys[index] as any
        );

        if (!styleObj) {
          const first = keys[index][0];
          const middle = keys[index][Math.round(keys[index].length / 2)];
          const last = keys[index][keys[index].length - 1];
          classNames.current.push(
            `${className.current}${first}${middle}${last}`
          );
          styleClassesRef.current = [
            ...styleClassesRef.current,
            {
              className: `${className.current}${first}${middle}${last}`,
              count: 1,
              pseudoKind: keys[index] as PseudoClassesAndElements,
              styles: formattedStylesString[index],
            },
          ];
          // add '::' before pseudo-elements.
          if (pseudoElements.includes(keys[index])) {
            formattedStylesString[
              index
            ] = `.snui.${classNames.current[index]}::${keys[index]}{${formattedStylesString[index]};}`;
          } else {
            formattedStylesString[
              index
            ] = `.snui.${classNames.current[index]}:${keys[index]}{${formattedStylesString[index]};}`;
          }
          styleElements.push(
            addStyleToDOM(
              classNames.current[index],
              addCSSPrefixes(formattedStylesString[index])
            )
          );
        } else {
          // when there is already an object that matches those styles,
          // increment count by one and update style context object.
          newClassRef.current.push(styleObj.className);
          const filtered = styleClassesRef.current.filter(
            e =>
              e.styles !== styleObj.styles ||
              e.pseudoKind !== styleObj.pseudoKind
          );
          styleObj.count += 1;
          styleClassesRef.current = [...filtered, styleObj];
        }
      });
    }

    // cleanup function is used to remove the HTML <style> tags when
    // there is not other element that is using them.
    // otherwise it will decrement the style context count property.
    return () => {
      if (isString(classNames.current.join(' '))) {
        classNames.current.forEach(classs => {
          const styleObj = styleClassesRef.current.find(
            e => e.className === classs
          );
          if (styleObj) {
            if (styleObj.count === 1) {
              removeStyleFromDOM(classs);
              const filtered = styleClassesRef.current.filter(
                e => e.className !== classs
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== classs
              );
              styleObj.count -= 1;
              styleClassesRef.current = [...filtered, styleObj];
            }
          }
        });
      }

      if (isString(newClassRef.current.join(' '))) {
        newClassRef.current.forEach(classs => {
          const styleObj = styleClassesRef.current.find(
            e => e.className === classs
          );
          if (styleObj) {
            if (styleObj.count === 1) {
              removeStyleFromDOM(classs);
              const filtered = styleClassesRef.current.filter(
                e => e.className !== classs
              );
              styleClassesRef.current = [...filtered];
            } else {
              const filtered = styleClassesRef.current.filter(
                e => e.className !== classs
              );
              styleObj.count -= 1;
              styleClassesRef.current = [...filtered, styleObj];
            }
          }
        });
      }
    };
  }, []);

  forceUpdate();

  return newClassRef.current
    .join(' ')
    .concat(` ${classNames.current.join(' ')}`);
};
