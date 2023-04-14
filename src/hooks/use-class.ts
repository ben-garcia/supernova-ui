import { useCallback, useContext, useMemo, useRef } from 'react';

import { ClassContext } from '@contexts';
import { useSafeEffect, useTheme, useUniqueStringId } from '@hooks';
import {
  addCSSPrefixes,
  addStyleToDOM,
  cssCamelCaseToHyphenated,
  isArray,
  isElementInDOM,
  isNumber,
  isObject,
  isString,
  removeStyleFromDOM,
} from '@utils';
import { CSSProps, CSSPropsHyphen } from '@types';

/**
 * Hook that returns the ClassProvider context.
 */
export const useClass = () => {
  const context = useContext(ClassContext);

  if (!context) {
    throw new Error(
      'useClass: context is undefined, did you remember to wrap your component in a pair <Supernova>'
    );
  }
  return context;
};

/**
 *  Hook that injects classes in the DOM based on CSS props.
 *
 *  @param mainProps CSS object.
 *
 *  @returns className/s with the corresponding styles.
 */
export const useClassStyles = (mainProps: any) => {
  if (!isObject(mainProps)) {
    return '';
  }
  const id = useUniqueStringId();
  const classesRef = useClass();
  const className = useRef(id);
  const styles = useRef(['', '', '', '', '']);
  const updatedArrayProps = useRef([]);
  const newStyles: any = useRef({});
  const styleElements = useRef<HTMLStyleElement[]>([]);
  const { breakpoints } = useTheme();

  const filterProps = useCallback((filterTheseProps: CSSProps) => {
    const normalProps = {};
    const arrayProps = {};
    const keys = Object.keys(filterTheseProps);
    Object.values(filterTheseProps).forEach((val: any, i: number) => {
      if (isArray(val)) {
        // @ts-ignore
        arrayProps[keys[i]] = val;
      } else if (val) {
        // @ts-ignore
        normalProps[keys[i]] = val;
      }
    });
    return {
      normalProps: cssCamelCaseToHyphenated(normalProps),
      arrayProps: cssCamelCaseToHyphenated(arrayProps),
    };
  }, []);

  const injectCSSClass = useCallback((cssProps: CSSPropsHyphen) => {
    let str = '';
    let formattedStr = '';
    const keys = Object.keys(cssProps);

    Object.values(cssProps).forEach((value, i) => {
      let formattedValue = '';
      if (isNumber(value)) {
        if (value > 0 && value < 1) {
          formattedValue = `${value * 100}%`;
        } else {
          formattedValue = `${value}px`;
        }
      } else if (isString(value)) {
        formattedValue = value;
      }

      str = `${str}${keys[i]}:${formattedValue};`;
    });
    formattedStr = `.snui.${className.current}{${str}}`;
    formattedStr = addCSSPrefixes(formattedStr);

    if (!isElementInDOM(className.current)) {
      styleElements.current.push(
        addStyleToDOM(className.current, formattedStr)
      );
    }
  }, []);

  const injectCSSMediaQueries = useCallback(
    (arrayProps: any, normalProps: any) => {
      const arrKeys = Object.keys(arrayProps);
      newStyles.current = { ...normalProps };

      const stringifyStyles = JSON.stringify({ ...normalProps, ...arrayProps });
      const classObj = classesRef.current.find(
        c => c.styles === stringifyStyles
      );

      if (classObj) {
        className.current = classObj.className;

        const filteredClasses = classesRef.current.filter(
          c => c.styles !== stringifyStyles
        );
        classObj.count += 1;
        classesRef.current = [...filteredClasses, classObj];

        return;
      }
      classesRef.current = [
        ...classesRef.current,
        {
          count: 1,
          className: className.current,
          styles: stringifyStyles,
        },
      ];

      for (let i = 0; i < arrKeys.length; i += 1) {
        // eslint-disable-next-line
        newStyles.current[arrKeys[i]] = arrayProps[arrKeys[i]][0];
        // @ts-ignore
        updatedArrayProps.current[i] = arrayProps[arrKeys[i]].slice(
          1,
          arrayProps[arrKeys[i]].length
        );
      }

      Object.values(updatedArrayProps.current).forEach(
        (arr: any, i: number) => {
          // eslint-disable-next-line
          for (let idx in breakpoints) {
            if (arr[idx]) {
              if (isNumber(arr[idx])) {
                if (arr[idx] > 0 && arr[idx] < 1) {
                  styles.current[idx] = `${styles.current[idx]}${
                    arrKeys[i]
                  }:${Math.floor(arr[idx] * 100)}%;`;
                } else {
                  styles.current[
                    idx
                  ] = `${styles.current[idx]}${arrKeys[i]}:${arr[idx]}px;`;
                }
              } else if (isString(arr[idx])) {
                styles.current[
                  idx
                ] = `${styles.current[idx]}${arrKeys[i]}:${arr[idx]};`;
              }
            }
          }
        }
      );

      injectCSSClass(newStyles.current);

      // eslint-disable-next-line
      for (let index in breakpoints) {
        if (styles.current[index]) {
          let str = `@media screen and (min-width:${breakpoints[index]}){.snui.${className.current}{${styles.current[index]}}}`;
          const classNameStr = `${className.current}-${breakpoints[index]}`;

          str = addCSSPrefixes(str);

          if (!isElementInDOM(classNameStr)) {
            styleElements.current.push(addStyleToDOM(classNameStr, str));
          }
        }
      }
    },
    []
  );

  const { arrayProps, normalProps } = useMemo(() => filterProps(mainProps), []);

  useSafeEffect(() => {
    injectCSSMediaQueries(arrayProps, normalProps);

    return () => {
      if (styleElements.current.length) {
        const classObj = classesRef.current.find(
          c => c.className === className.current
        );
        if (classObj!.count === 1) {
          const filteredClasses = classesRef.current.filter(
            c => c.className !== classObj!.className
          );
          removeStyleFromDOM(styleElements.current);
          classesRef.current = [...filteredClasses];
        } else {
          const filteredClasses = classesRef.current.filter(
            c => c.className !== className.current
          );
          classObj!.count -= 1;
          classesRef.current = [...filteredClasses, classObj!];
        }
      } else {
        const classObj = classesRef.current.find(
          c => c.className === className.current
        );
        if (classObj!.count === 1) {
          const filteredClasses = classesRef.current.filter(
            c => c.className !== classObj!.className
          );
          removeStyleFromDOM(className.current);

          breakpoints.forEach(b => {
            removeStyleFromDOM(`${className.current}-${b}`);
          });
          classesRef.current = [...filteredClasses];
        } else {
          const filteredClasses = classesRef.current.filter(
            c => c.className !== className.current
          );
          classObj!.count -= 1;
          classesRef.current = [...filteredClasses, classObj!];
        }
      }
    };
  }, []);

  return className.current;
};
