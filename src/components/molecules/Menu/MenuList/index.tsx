/* eslint no-param-reassign: 0 */
/* eslint prefer-destructuring: 0 */
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useMenu, useTheme } from '../../../../hooks';
import { createClasses } from '../../../../utils';

import './styles.scss';

export interface MenuListProps {
  children: ReactNode;
  /**
   * configure the position for the menu
   *
   * transform css property
   */
  customTransform?: string;
  maxWidth?: string;
  minWidth?: string;
  width?: string;
}

// @ts-ignore
const MenuList = forwardRef((props: MenuListProps, ref: any) => {
  const {
    children,
    customTransform = null,
    maxWidth = '',
    minWidth = '',
    width = '',
    ...rest
  } = props;
  const {
    changeActiveMenuItem,
    closeOnEsc,
    id,
    isOpen,
    onClose,
    getMenuListProps,
    menuListRef,
    menuButtonRef,
  } = useMenu();
  const [mounted, setMounted] = useState(false);
  const [menuPortalId] = useState(`${id}-portal`);
  const menuButtonItems = useRef<HTMLButtonElement[]>([]);
  const theme = useTheme();
  const previousEl = useRef<HTMLButtonElement>(null);
  const nextEl = useRef<HTMLButtonElement>(null);
  const activeEl = useRef<HTMLButtonElement>(null);

  const handleActive = useCallback((element: HTMLButtonElement) => {
    const index = Array.from(menuButtonItems.current)
      .map(el => el.textContent)
      .indexOf(element.textContent);
    if (index === 0) {
      (previousEl.current as any) = menuButtonItems.current[
        menuButtonItems.current.length - 1
      ];
      (nextEl.current as any) = menuButtonItems.current[1];
    } else if (index === menuButtonItems.current.length - 1) {
      (previousEl.current as any) = menuButtonItems.current[
        menuButtonItems.current.length - 2
      ];
      (nextEl.current as any) = menuButtonItems.current[0];
    } else {
      (previousEl.current as any) = menuButtonItems.current[index - 1];
      (nextEl.current as any) = menuButtonItems.current[index + 1];
    }

    previousEl!.current!.setAttribute('tabIndex', '-1');
    previousEl!.current!.style.backgroundColor = '';
    previousEl!.current!.style.color = theme.colors.black;

    nextEl!.current!.setAttribute('tabIndex', '-1');
    nextEl!.current!.style.backgroundColor = '';
    nextEl!.current!.style.color = theme.colors.black;

    changeActiveMenuItem!(menuButtonItems.current[index] as any);
    (activeEl.current as any) = menuButtonItems.current[index];
    activeEl.current!.focus();

    (activeEl.current as any).setAttribute('tabIndex', '0');
    (activeEl.current as any).style.backgroundColor = theme.colors.info600;
    (activeEl.current as any).style.color = theme.colors.white;
  }, []);
  const resetMenuItems = React.useCallback(() => {
    menuButtonItems.current.forEach(el => {
      el.setAttribute('tabIndex', '-1');
      el.style.backgroundColor = 'white';
      el.style.color = 'black';
      changeActiveMenuItem!(null);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      (menuButtonItems.current as any) = menuListRef?.current?.querySelectorAll(
        'button[role="menuitem"]'
      );

      if (menuButtonItems?.current?.length) {
        // needed to correctly set focus
        setTimeout(() => {
          (previousEl.current as any) = menuButtonItems.current[
            menuButtonItems.current.length - 1
          ];
          (nextEl.current as any) = menuButtonItems.current[1];
          handleActive(menuButtonItems.current[0]);
        }, 20);
      }
    }

    return () => {
      resetMenuItems();
      // when the menu is closed
      // focus should be returned to the menu button that triggered it
      menuButtonRef?.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    let handleKeyDown: any;
    if (isOpen) {
      handleKeyDown = (e: KeyboardEvent) => {
        const { key } = e;

        const menuItemContent = Array.from(menuButtonItems.current).map(el =>
          el.textContent![0].toLowerCase()
        );

        if (key === 'Escape' && closeOnEsc) {
          onClose();
        } else if (key === 'ArrowDown' || key === 'ArrowRight') {
          handleActive(nextEl.current!);
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
          handleActive(previousEl.current!);
        } else if (key === 'End') {
          handleActive(
            menuButtonItems.current[menuButtonItems.current.length - 1]
          );
        } else if (key === 'Home') {
          handleActive(menuButtonItems.current[0]);
        } else if (menuItemContent.includes(key.toLowerCase())) {
          const index = menuItemContent.indexOf(key.toLowerCase());
          handleActive(menuButtonItems.current[index]);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
    '_snui-menu _snui-flex _snui-flex-column _snui-margin-top-xs _snui-padding-y-sm _snui-border-radius-xs _snui-color-white',
    {
      '_snui-menu--visible': isOpen,
      '_snui-menu--invisible': !isOpen,
    }
  );

  const [xPos, setX] = useState('');
  const [yPos, setY] = useState('');

  useEffect(() => {
    if (menuButtonRef?.current) {
      const { x, y } = menuButtonRef.current.getBoundingClientRect();
      setX(`${x - 15}px`);
      setY(`${y - 15}px`);
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
        transform: customTransform ?? `translate(${xPos}, ${yPos})`,
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
