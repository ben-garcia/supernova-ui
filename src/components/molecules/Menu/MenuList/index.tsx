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
    focusedIndex,
    closeOnEsc,
    id,
    isOpen,
    onClose,
    getMenuListProps,
    menuListRef,
    menuButtonRef,
    setFocusedIndex,
  } = useMenu();
  const [mounted, setMounted] = useState(false);
  const menuPortalId = useMemo(() => `${id}-portal`, []);
  const menuButtonItems = useRef<HTMLButtonElement[]>([]);
  const [pos, setPos] = useState({ left: '', top: '' });

  /**
   * set tabindex of each menu item to -1
   * set focused index to -1
   *
   * run on unmount
   */
  const resetMenuItems = useCallback(() => {
    menuButtonItems?.current?.forEach(el => {
      el.setAttribute('tabIndex', '-1');
    });
    setFocusedIndex(-1);
  }, []);

  /**
   * set a reference to the list of button menu items
   */
  useEffect(() => {
    if (menuButtonRef?.current) {
      (menuButtonItems.current as any) = menuListRef?.current?.querySelectorAll(
        'button[role="menuitem"]'
      );
    }
  }, [menuListRef?.current]);

  /**
   * obj that stores the first letters of menu items
   * and the array index of those that match.
   */
  const [menuItemsContent, setMenuItemsCotent] = useState<{
    [k: string]: number[];
  }>({});

  /**
   * add an index custom data prop to each menu item
   */
  useEffect(() => {
    if (isOpen) {
      if (menuButtonItems?.current) {
        menuButtonItems.current.forEach((element, index) => {
          element.setAttribute('data-snui-menu-item-index', `${index}`);
        });

        const tempObj: any = {};

        menuButtonItems.current.forEach((element, index) => {
          const firstLetter = element.textContent![0].toLowerCase();

          if (tempObj[firstLetter]) {
            tempObj[firstLetter].push(index);
          } else {
            tempObj[firstLetter] = [index];
          }
        });

        setMenuItemsCotent(tempObj);
      }

      if (menuButtonItems?.current?.length) {
        // needed to correctly set focus
        setTimeout(() => {
          menuButtonItems.current[0].focus();
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
   * add/remove the winodw key down listeners
   */
  useEffect(() => {
    let handleKeyDown: (e: KeyboardEvent) => void;

    if (isOpen) {
      handleKeyDown = e => {
        if (menuButtonItems?.current) {
          const { key, shiftKey } = e;
          const menuItemsLength = menuButtonItems.current.length;

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
            if (menuItemsContent[lowerCaseKey].length === 1) {
              setFocusedIndex(menuItemsContent[lowerCaseKey][0]);
              // when greater than one
            } else if (menuItemsContent[lowerCaseKey].length > 1) {
              // number of items in the array.
              const numberOfIndices = menuItemsContent[lowerCaseKey].length;

              // when the focused index is not found in the menuItemContent array.
              if (!menuItemsContent[lowerCaseKey].includes(focusedIndex)) {
                setFocusedIndex(menuItemsContent[lowerCaseKey][0]);
              } else {
                // the position of the focused index in the menuItemsContent[lowerCaseKey] array
                const positionInTheArray = menuItemsContent[
                  lowerCaseKey
                ].indexOf(focusedIndex);

                // if it's the last index in the array
                if (
                  positionInTheArray ===
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
        }
      };

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, focusedIndex]);

  /**
   *
   * close menu when user clicks outside the menu list element
   *
   * add/remove window click listeners
   */
  useEffect(() => {
    const handleClick = (e: any) => {
      const { target } = e;

      if (target?.parentElement?.id !== `${id}-list`) {
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
    <div
      {...getMenuListProps(rest, ref)}
      className={classes}
      id={`${id}-list`}
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
  );

  return (
    mounted &&
    createPortal(jsx, document.getElementById(menuPortalId) as Element)
  );
});

export default MenuList;
