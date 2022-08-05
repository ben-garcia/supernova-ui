import React, { useContext } from 'react';
import { compile, serialize, stringify, middleware, prefixer } from 'stylis';

import { ClassContext } from '@contexts';
import { useUniqueStringId } from '@hooks';
import { isArray, isNumber, isString } from '@utils';
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
  const id = useUniqueStringId();
  const classesRef = useClass();
  const className = React.useRef(id);
  const styles = React.useRef(['', '', '', '', '']);

  const filterProps = React.useCallback((filterTheseProps: any) => {
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
  const updatedArrayProps = React.useRef([]);
  const newStyles: any = React.useRef({});

  const injectCSSClass = React.useCallback((cssProps: CSSPropsHyphen) => {
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
      document.head.appendChild(style);
    }
  }, []);

  const injectCSSMediaQueries = React.useCallback(
    (arrayProps: any, normalProps: any) => {
      const breakpoints = ['20em', '38em', '52em', '65em', '76em'];
      const arrKeys = Object.keys(arrayProps);
      newStyles.current = { ...normalProps };

      const stringifyStyles = JSON.stringify({ ...normalProps, ...arrayProps });

      const classFound = classesRef.current.find(
        c => c.styles === stringifyStyles
      );

      if (classFound) {
        className.current = classFound.className;
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
            document.head.appendChild(style);
          }
        }
      }
    },
    []
  );

  const [{ arrayProps, normalProps }] = React.useState(filterProps(mainProps));
  React.useEffect(() => {
    injectCSSMediaQueries(arrayProps, normalProps);
  }, [injectCSSMediaQueries, arrayProps, normalProps]);
  return { className: className.current };
};
