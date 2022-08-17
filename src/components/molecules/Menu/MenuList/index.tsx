import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Portal } from '@atoms';
import { MenuListProvider } from '@contexts';
import {
  useCreateClassString,
  useClassStyles,
  useMenu,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { isString } from '@utils';

import { SupernovaProps } from '@types';
import './styles.scss';

export interface MenuListProps extends SupernovaProps {
  children: ReactNode;
}

/**
 * Wrapper for all MenuItem
 */
// @ts-ignore
const MenuList = forwardRef((props: MenuListProps, ref: any) => {
  const { children, className, ...rest } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps(rest);
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const {
    menuId,
    isOpen,
    onClose,
    getMenuListProps,
    menuListRef,
    menuButtonRef,
    setFocusedIndex,
  } = useMenu();
  const addClasses = useCreateClassString('snui snui-menu', {
    [`${className}`]: isString(className),
    'snui-menu--visible': isOpen,
    'snui-menu--invisible': !isOpen,
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const menuButtonItemsRef = useRef<HTMLButtonElement[]>([]);
  /**
   * obj that stores the first letters of menu items
   * and the array index of those that match.
   */
  const [menuItemsContent, setMenuItemsContent] = useState<{
    [k: string]: number[];
  }>({});
  const contextValue = useMemo(
    () => ({
      menuButtonItemsRef: menuButtonItemsRef.current,
      menuItemsContent,
    }),
    [menuButtonItemsRef, menuItemsContent]
  );
  const [pos, setPos] = useState({ left: 0, top: 0 });

  /**
   * set tabindex of each menu item to -1
   * set focused index to -1
   *
   * run on unmount
   */
  const resetMenuItems = useCallback(() => {
    menuButtonItemsRef?.current?.forEach(el => {
      el.setAttribute('tabIndex', '-1');
    });
    setFocusedIndex(-1);
  }, []);

  /**
   * set a reference to the list of button menu items
   */
  useEffect(() => {
    if (menuButtonRef?.current) {
      (menuButtonItemsRef.current as any) = menuListRef?.current?.querySelectorAll(
        'button[role="menuitem"]'
      );
    }
  }, [menuListRef?.current]);

  /**
   * add an index custom data prop to each menu item
   */
  useEffect(() => {
    if (isOpen) {
      if (menuButtonItemsRef?.current) {
        menuButtonItemsRef.current.forEach((element, index) => {
          element.setAttribute('data-snui-menu-item-index', `${index}`);
        });

        const tempObj: any = {};

        menuButtonItemsRef.current.forEach((element, index) => {
          const firstLetter = element.textContent![0].toLowerCase();

          if (tempObj[firstLetter]) {
            tempObj[firstLetter].push(index);
          } else {
            tempObj[firstLetter] = [index];
          }
        });

        setMenuItemsContent(tempObj);
      }

      if (menuButtonItemsRef?.current?.length) {
        // needed to correctly set focus
        setTimeout(() => {
          menuButtonItemsRef.current[0].focus();
        }, 15);
      }
    }
  }, [isOpen]);

  /**
   * set focused index to 0
   */
  useEffect(() => {
    // set the intial focus index ONLY if there is at least 1 menu item
    if (isOpen) {
      setFocusedIndex(0);
    }
  }, [isOpen]);

  /**
   * return focus to the menu button that tiggered the menu to open
   */
  useEffect(
    () => () => {
      if (isOpen && menuButtonRef?.current) {
        resetMenuItems();
        menuButtonRef?.current?.focus();
      }
    },
    [isOpen, menuButtonRef?.current]
  );

  /**
   *
   * close menu when user clicks outside the menu list element
   *
   * add/remove window click listeners
   */
  useEffect(() => {
    const handleClick = (e: any) => {
      const { target } = e;

      if (target?.parentElement?.id !== `${menuId}__list`) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClick);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (menuButtonRef?.current && menuListRef?.current) {
      const menuButtonPosition = menuButtonRef.current.getBoundingClientRect();
      const position = {
        left: menuButtonPosition.left,
        top: menuButtonPosition.bottom,
      };

      /**
       *
       * when the menu goes outside the right side of the viewport
       *
       * @example
       * --------------------
       * |                  |
       * |               -----------
       * |    viewport   |         |
       * |               |   menu  |
       * |               -----------
       * |                  |
       * --------------------
       *
       * place the manu inside the viewport
       */
      if (
        menuButtonPosition.right +
          (menuListRef.current.offsetWidth -
            menuButtonRef.current.offsetWidth) >
        window.innerWidth
      ) {
        position.left =
          menuButtonPosition.right - menuListRef.current.offsetWidth;
      } else if (menuButtonPosition.left < 0) {
        // when the trigger button is outside of the left side of the viewport
        position.left = 0;
      } else if (
        menuButtonPosition.bottom +
          (menuListRef.current.offsetHeight -
            menuButtonRef.current.offsetHeight) >
        window.innerHeight
      ) {
        // when the trigger button is outside of the bottom side of the viewport
        position.top =
          menuButtonPosition.top - menuListRef.current.offsetHeight;
      }

      setPos(position);
    }
  }, [menuButtonRef?.current, menuListRef?.current]);

  return (
    <Portal>
      <MenuListProvider value={contextValue as any}>
        <div
          {...getMenuListProps({ ...remainingProps, ...addClasses() }, ref)}
          id={`${menuId}__list`}
          role="menu"
          style={{
            left: `${pos.left}px`,
            top: `${pos.top}px`,
          }}
          tabIndex={-1}
        >
          {children}
        </div>
      </MenuListProvider>
    </Portal>
  );
});

export default MenuList;
