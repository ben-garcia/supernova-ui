import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Floating from '@atoms/Floating';
import { MenuListProvider } from '@contexts';
import {
  useCreateClassString,
  useClassStyles,
  useMenu,
  usePseudoClasses,
  useValidateProps,
} from '@hooks';
import { forwardRef, isString } from '@utils';

import { FloatingProps, SupernovaProps } from '@types';
import './styles.scss';

export interface MenuListProps
  extends SupernovaProps,
    Pick<FloatingProps, 'arrowSize' | 'spacing'> {
  children: ReactNode;
  /**
   * Where the content of the Menu should be positioned
   * relative to the bottom of the trigger.
   *
   * @default 'start'
   */
  placement?: 'start' | 'center' | 'end';
  /**
   * Configure whether to render with an arrow pointing to the trigger element.
   *
   * NOTE: By default the color of the arrow is white.
   *       You can set a custom color by adding a
   *       'background' or 'backgroundColor' prop.
   *       If both are added, 'backgroundColor' takes precedence.
   *
   * @default false
   */
  withArrow?: boolean;
}

/**
 * Wrapper for all MenuItem
 */
// @ts-ignore
const MenuList = forwardRef<MenuListProps, HTMLDivElement>((props, ref) => {
  const {
    arrowSize,
    backgroundColor,
    background,
    children,
    className,
    placement = 'center',
    spacing,
    withArrow,
    ...rest
  } = props;
  const {
    remainingProps,
    validatedCSSProps,
    validatedPseudoClassProps,
  } = useValidateProps({ ...rest, background, backgroundColor });
  const pseudoClassName = usePseudoClasses(validatedPseudoClassProps);
  const stylesClassName = useClassStyles(validatedCSSProps);
  const {
    menuId,
    isOpen,
    onClose,
    getMenuListProps,
    // menuListRef,
    focusedIndex,
    menuButtonRef,
    setFocusedIndex,
  } = useMenu();
  const addClasses = useCreateClassString('snui snui-menu', {
    [`${className}`]: isString(className),
    [`${pseudoClassName}`]: isString(pseudoClassName),
    [`${stylesClassName}`]: isString(stylesClassName),
  });
  const placementValue = useMemo(() => {
    if (placement === 'end') {
      return 'bottom-end';
    }
    if (placement === 'center') {
      return 'bottom';
    }
    return 'bottom-start';
  }, [placement]);
  const arrColor: any = useMemo(() => {
    if (isString(backgroundColor)) {
      return backgroundColor;
    }
    if (isString(background)) {
      return (background as string).split(' ')[0];
    }
    return 'var(--snui-color-white)';
  }, [background, backgroundColor]);
  const menuButtonItemsRef = useRef<HTMLButtonElement[]>([]);
  // obj that stores the first letters of menu items
  // and the array index of those that match.
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

  // manually interact with the DOM  rather than through React ref objects.
  // my attempt at using refs didn't work.
  // NOTE: just focused on it working for now
  //       will refactor in the future.
  useEffect(() => {
    if (isOpen && menuId) {
      const id = `${menuId}__list`;
      setTimeout(() => {
        const menuList = document.getElementById(id);
        if (menuList) {
          const items = menuList.querySelectorAll('button[role="menuitem"]');
          const tempObj: any = {};
          menuButtonItemsRef.current = items as any;

          items.forEach((element, index) => {
            element.setAttribute('data-snui-menu-item-index', `${index}`);
            const firstLetter = element.textContent![0].toLowerCase();

            if (tempObj[firstLetter]) {
              tempObj[firstLetter].push(index);
            } else {
              tempObj[firstLetter] = [index];
            }
          });
          setMenuItemsContent(tempObj);
        }

        menuButtonItemsRef.current[0].focus();
      }, 30); // wait 10 ms longer the the Floating component takes to render.
    }
  }, [isOpen, menuId]);

  // set focused index to 0 after rendering.
  useEffect(() => {
    if (isOpen && menuButtonItemsRef?.current?.length) {
      // NOTE: setTimeout solves the  problem with positioning
      //       window.scrollY = 0 without setTimeout
      setTimeout(() => {
        // set the intial focus index ONLY if there is at least 1 menu item
        setFocusedIndex(0);
      }, 40); // 20 ms after Floating component take to render.
    }
    return () => {
      if (!isOpen && focusedIndex !== -1) {
        // reset focused index when unmounting
        // fix: all menu items would have focused backgroundColor
        setFocusedIndex(-1);
      }
    };
  }, [isOpen, menuButtonItemsRef?.current]);

  // Return focus to the menu button that triggered the opening.
  const returnFocus = useCallback(() => {
    if (isOpen && menuButtonRef?.current) {
      menuButtonRef?.current?.focus();
    }
  }, [isOpen, menuButtonRef?.current]);

  // cleanup effect that returns focus to menu button
  useEffect(() => () => returnFocus());

  // close menu when user clicks outside the menu list element
  // add/remove window click listeners
  useEffect(() => {
    const handleClick = (e: any) => {
      const { target } = e;

      if (target?.parentElement?.id !== `${menuId}__list`) {
        onClose();
        returnFocus();
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

  return (
    <Floating
      arrowColor={arrColor}
      arrowSize={arrowSize}
      placement={placementValue}
      show={isOpen}
      spacing={spacing}
      triggerRef={menuButtonRef as any}
      withArrow={withArrow}
    >
      <MenuListProvider value={contextValue as any}>
        <div
          {...getMenuListProps(
            { ...remainingProps, ...addClasses() },
            ref as any
          )}
          id={`${menuId}__list`}
          role="menu"
          tabIndex={-1}
        >
          {children}
        </div>
      </MenuListProvider>
    </Floating>
  );
});

export default MenuList;
