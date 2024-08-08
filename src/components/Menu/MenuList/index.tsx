import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MenuListProvider } from '@contexts';
import {
  useCalculatePosition,
  useCSSAndPseudoClassProps,
  useMenu,
  useResize,
} from '@hooks';
import { forwardRef, isString } from '@utils';
import { SharedAnchorPositioningProps, SupernovaProps } from '@types';
import './styles.scss';

export interface MenuListProps
  extends SupernovaProps,
    Omit<SharedAnchorPositioningProps, 'withArrow' | 'placement'> {
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
const MenuList = forwardRef<MenuListProps, HTMLDivElement>((props, ref) => {
  const {
    arrowSize = 15,
    backgroundColor,
    background,
    children,
    placement = 'start',
    spacing = 5,
    withArrow = false,
    ...rest
  } = props;
  const {
    menuId,
    isOpen,
    onClose,
    getMenuListProps,
    menuListRef,
    menuButtonRef,
    setFocusedIndex,
  } = useMenu();
  const toolRef = useRef<any>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const addCSSClassesAndProps = useCSSAndPseudoClassProps(
    { ...rest, background, backgroundColor },
    'snui snui-menu',
    {
      'snui-menu--show': isOpen,
    }
  );
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
  const {
    calculateTransformOrigin,
    calcPosition,
    addArrowStyles,
    addElementStyles,
  } = useCalculatePosition(
    placementValue,
    withArrow,
    arrowSize,
    spacing,
    menuButtonRef!.current as HTMLElement,
    toolRef,
    arrowRef,
    arrColor
  );
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

  // calculate position
  useEffect(() => {
    // wait until menu button is clicked, so that
    // especially for when the user has scrolled the document.
    if (isOpen) {
      calcPosition();
    }
  }, [isOpen, arrowSize, placementValue, spacing, withArrow]);

  useEffect(() => {
    calcPosition();
  }, []);

  // calculate position on viewport resize.
  useResize(calcPosition);

  // set a reference to the list of button menu items
  useEffect(() => {
    if (menuButtonRef?.current) {
      (menuButtonItemsRef.current as any) =
        menuListRef?.current?.querySelectorAll('button[role="menuitem"]');
    }
  }, [menuListRef?.current]);

  //  add an index custom data prop to each menu item
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

  // set focused index to 0
  useEffect(() => {
    // set the intial focus index ONLY if there is at least 1 menu item
    if (isOpen) {
      setFocusedIndex(0);
    }
  }, [isOpen]);

  // return focus to the menu button that tiggered the menu to open
  useEffect(
    () => () => {
      if (isOpen && menuButtonRef?.current) {
        resetMenuItems();
        menuButtonRef?.current?.focus();
      }
    },
    [isOpen, menuButtonRef?.current]
  );

  // close menu when user clicks outside the menu list element
  // add/remove window click listeners
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

  return (
    <div className="snui snui-floating" {...addElementStyles()}>
      <MenuListProvider value={contextValue as any}>
        <div
          {...getMenuListProps({ ...addCSSClassesAndProps() }, ref as any)}
          {...calculateTransformOrigin()}
          id={`${menuId}__list`}
          role="menu"
          tabIndex={-1}
        >
          {children}
        </div>
      </MenuListProvider>
      {withArrow && (
        <div {...addArrowStyles()}>
          <div
            className={`snui snui-floating__inner snui-menu__arrow${
              isOpen ? ' snui-menu__arrow--show' : ''
            }`}
            style={{
              background: arrColor,
            }}
          />
        </div>
      )}
    </div>
  );
});

export default MenuList;
