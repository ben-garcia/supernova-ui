/* eslint no-param-reassign: 0 */
/* eslint prefer-destructuring: 0 */
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { MenuListProvider } from '../../../../contexts/menu';
import { useMenu } from '../../../../hooks';
import { createClasses, isString } from '../../../../utils';
import './styles.scss';

export interface MenuListProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  minWidth?: string;
  position?: 'left' | 'right';
  width?: string;
}

/**
 * Wrapper for all MenuItem
 */
// @ts-ignore
const MenuList = forwardRef((props: MenuListProps, ref: any) => {
  const {
    children,
    className,
    maxWidth = '',
    minWidth = '',
    position = 'left',
    width = '',
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
  const [mounted, setMounted] = useState(false);
  const menuPortalId = useMemo(() => `${menuId}-portal`, []);
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
  const [pos, setPos] = useState({ left: '', top: '' });

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

  // add React portal
  useEffect(() => {
    const div: HTMLDivElement = document.createElement('div');
    const menuPortal = document.getElementById(menuPortalId);

    // make to not to append more than one menu portal with a unique id
    if (!menuPortal) {
      div.id = menuPortalId;
      div.style.width = width;
      div.style.minWidth = minWidth;
      div.style.maxWidth = maxWidth;

      document.body.appendChild(div);

      setMounted(true);
    }
  }, [isOpen]);

  const classes = createClasses(
    'snui-menu snui-flex snui-flex-column snui-margin-top-xs snui-padding-y-sm snui-border-radius-xs snui-color-white',
    {
      [`${className}`]: isString(className),
      'snui-menu--visible': isOpen,
      'snui-menu--invisible': !isOpen,
    }
  );

  useEffect(() => {
    if (menuButtonRef?.current) {
      const menuButtonPosition = menuButtonRef.current.getBoundingClientRect();

      setTimeout(() => {
        const menuListWidth = menuListRef!.current?.getBoundingClientRect()
          .width;

        if (position === 'left') {
          setPos({
            left: `${
              menuButtonPosition.left +
              menuButtonPosition.width / 2 +
              window.pageXOffset
            }px`,
            top: `${menuButtonPosition.bottom + window.pageYOffset}px`,
          });
        } else if (position === 'right') {
          setPos({
            left: `${
              menuButtonPosition.right +
              menuButtonPosition.width / 2 -
              menuListWidth! +
              window.pageXOffset
            }px`,
            top: `${menuButtonPosition.bottom + window.pageYOffset}px`,
          });
        }
      }, 10);
    }
  }, [menuButtonRef]);

  const jsx = (
    <MenuListProvider value={contextValue as any}>
      <div
        {...getMenuListProps(rest, ref)}
        className={classes}
        id={`${menuId}__list`}
        role="menu"
        style={{
          minWidth,
          maxWidth,
          width,
          left: pos.left,
          top: pos.top,
          transform: `translateX(-20%)`,
        }}
        tabIndex={-1}
      >
        {children}
      </div>
    </MenuListProvider>
  );

  return (
    mounted &&
    createPortal(jsx, document.getElementById(menuPortalId) as Element)
  );
});

export default MenuList;
