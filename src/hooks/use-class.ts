import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { compile, serialize, stringify, middleware, prefixer } from 'stylis';

import { ClassContext } from '@contexts';
import { useTheme, useUniqueStringId } from '@hooks';
import { isArray, isNumber, isObject, isString } from '@utils';
import { CSSPropsHyphen } from '@types';

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

const cssify = (props: any) => {
  const newObj = {};
  const values = Object.values(props);

  let idx;
  Object.keys(props).forEach((k, i) => {
    idx = i;
    let str = '';
    // eslint-disable-next-line
    for (const letter of k) {
      if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
        str = `${str}-${String.fromCharCode(letter.charCodeAt(0) + 32)}`;
      } else {
        str = `${str}${letter}`;
      }
    }
    // @ts-ignore
    newObj[str] = values[idx];
  });

  return newObj;
};

const createMediaQueryString = (
  breakpoint: string,
  styles: string,
  className: string
) => `@media screen and (min-width:${breakpoint}){.${className}{${styles}}}`;

export const useAddStyles = (mainProps: any) => {
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

  const filterProps = useCallback((filterTheseProps: any) => {
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
      normalProps: cssify(normalProps),
      arrayProps: cssify(arrayProps),
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

      // @ts-ignore
      str = `${str}${keys[i]}:${formattedValue};`;
    });
    formattedStr = `.${className.current}{${str}}`;
    formattedStr = serialize(
      compile(formattedStr),
      middleware([prefixer, stringify])
    );

    if (!document.getElementById(className.current)) {
      const style = document.createElement('style');
      style.setAttribute('id', className.current);
      const textNode = document.createTextNode(formattedStr);
      style.appendChild(textNode);
      styleElements.current.push(style);
      document.head.appendChild(style);
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

      // @ts-ignore
      // eslint-disable-next-line
      for (let i = 0; i < arrKeys.length; i++) {
        // @ts-ignore
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
          // @ts-ignore
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

      // @ts-ignore
      // eslint-disable-next-line
      for (let index in breakpoints) {
        if (styles.current[index]) {
          let str = createMediaQueryString(
            breakpoints[index],
            styles.current[index],
            className.current
          );
          str = serialize(compile(str), middleware([prefixer, stringify]));
          if (
            !document.getElementById(
              `${className.current}-${breakpoints[index]}`
            )
          ) {
            const style = document.createElement('style');
            style.setAttribute(
              'id',
              `${className.current}-${breakpoints[index]}`
            );
            style.appendChild(document.createTextNode(str));
            styleElements.current.push(style);
            document.head.appendChild(style);
          }
        }
      }
    },
    []
  );

  const [{ arrayProps, normalProps }] = useState(filterProps(mainProps));
  useEffect(() => {
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
          styleElements.current.forEach(c => document.head.removeChild(c));
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
          document.head.removeChild(
            document.getElementById(className.current)!
          );
          breakpoints.forEach(b => {
            document.head.removeChild(
              document.getElementById(`${className.current}-${b}`)!
            );
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
  }, [injectCSSMediaQueries, arrayProps, normalProps]);

  return className.current;
};
