import React, { ReactNode, useEffect, useRef } from 'react';

import {
  useCreateClassString,
  useClassStyles,
  useMenu,
  useMenuList,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { forwardRef, isFunction, isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface MenuItemProps extends SupernovaProps {
  children: ReactNode;
  onClick?: () => void;
}

/**
 * Menu option to select from.
 */
const MenuItem = forwardRef<MenuItemProps, HTMLButtonElement>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const {
    closeOnEsc,
    focusedIndex,
    isOpen,
    onClose,
    getMenuItemProps,
    setFocusedIndex,
  } = useMenu();
  const { menuButtonItemsRef, menuItemsContent } = useMenuList();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const addClasses = useCreateClassString(
    'snui snui-menu__item snui-flex snui-items-center snui-padding-inline-left',
    {
      [`${className}`]: isString(className),
      [`${pseudoClassName}`]: isString(pseudoClassName),
      [`${stylesClassName}`]: isString(stylesClassName),
    }
  );

  useEffect(() => {
    if (isOpen && buttonRef?.current) {
      const index = Number(
        buttonRef.current.getAttribute('data-snui-menu-item-index')
      );

      if (focusedIndex === index) {
        buttonRef.current.focus();
        buttonRef.current.setAttribute('tabIndex', '0');
      } else {
        buttonRef.current.setAttribute('tabIndex', '-1');
      }
    }
  }, [isOpen, focusedIndex, buttonRef?.current]);

  const handleMouseEnter = () => {
    const index = Number(
      buttonRef?.current?.getAttribute('data-snui-menu-item-index')
    );

    setFocusedIndex(index);
  };

  const handleMouseLeave = () => {
    setFocusedIndex(-1);
  };

  const handleClick = () => {
    if (isFunction(onClick)) {
      onClick!();
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key, shiftKey } = e;
    const menuItemsLength = (menuButtonItemsRef as any).length;

    if (key === 'Escape' && closeOnEsc) {
      onClose();
    } else if (key === 'Tab' || (shiftKey && key === 'Tab')) {
      // prevent user from using 'Tab' or 'Shift + Tab' to set focus to another element
      e.preventDefault();
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      if (focusedIndex !== menuItemsLength - 1) {
        setFocusedIndex(focusedIndex + 1);
      } else {
        setFocusedIndex(0);
      }
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      if (focusedIndex !== 0) {
        setFocusedIndex(focusedIndex - 1);
      } else {
        setFocusedIndex(menuItemsLength - 1);
      }
    } else if (key === 'End') {
      if (focusedIndex !== menuItemsLength - 1) {
        setFocusedIndex(menuItemsLength - 1);
      }
    } else if (key === 'Home') {
      if (focusedIndex !== 0) {
        setFocusedIndex(0);
      }
    } else if (
      // if the key matches a property in the menuItemContent object
      Object.keys(menuItemsContent).includes(key.toLowerCase())
    ) {
      const lowerCaseKey = key.toLowerCase();

      // when the array length is equal to one
      // @ts-ignore
      if (menuItemsContent[lowerCaseKey].length === 1) {
        setFocusedIndex(menuItemsContent[lowerCaseKey][0]);
        // when greater than one
        // @ts-ignore
      } else if (menuItemsContent[lowerCaseKey].length > 1) {
        // number of items in the array.
        // @ts-ignore
        const numberOfIndices = menuItemsContent[lowerCaseKey].length;

        // when the focused index is not found in the menuItemContent array.
        // @ts-ignore
        if (!menuItemsContent[lowerCaseKey].includes(focusedIndex)) {
          setFocusedIndex(menuItemsContent[lowerCaseKey][0]);
        } else {
          // the position of the focused index in the menuItemsContent[lowerCaseKey] array
          const positionInTheArray = menuItemsContent[lowerCaseKey].indexOf(
            focusedIndex
          );

          // if it's the last index in the array
          if (
            positionInTheArray ===
            // @ts-ignore
            menuItemsContent[lowerCaseKey].indexOf(
              menuItemsContent[lowerCaseKey][numberOfIndices - 1]
            )
          ) {
            // cycle back to the first
            setFocusedIndex(menuItemsContent[lowerCaseKey][0]);
          } else {
            // go to the next indice in the array.
            setFocusedIndex(
              menuItemsContent[lowerCaseKey][positionInTheArray + 1]
            );
          }
        }
      }
    }
  };

  return (
    <button
      {...getMenuItemProps(
        { ...(remainingProps as any), ...addClasses() },
        ref as any
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={buttonRef}
      role="menuitem"
      tabIndex={-1}
      type="button"
    >
      {children}
    </button>
  );
});

export default MenuItem;
