import React, { useCallback, useContext, useRef, useState } from 'react';

import { MenuContext } from '../contexts/menu';
import { MenuProps } from '../components/molecules/Menu/types';
import { isFunction } from '../utils';

/**
 * credit https://github.com/chakra-ui/chakra-ui/blob/53d0d0cfec7b4404fd2bc123991352f81bd39a82/packages/react-utils/src/refs.ts#L34
 */

type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>;

/**
 * Assigns a value to a ref function or object
 *
 * @param ref the ref to assign to
 * @param value the value
 */
function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (isFunction(ref)) {
    (ref as any)(value);
    return;
  }

  try {
    // @ts-ignore
    // eslint-disable-next-line
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
function mergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return (value: T) => {
    refs.forEach(ref => assignRef(ref, value));
  };
}

/**
 * Hooks that returns the Menu props
 */
const useMenuProvider = (props: MenuProps) => {
  const { id: propId, isOpen, onClose, closeOnEsc } = props;

  const [id] = useState(propId || `menu-${Math.random()}`);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = useRef<HTMLButtonElement>(null);

  const changeActiveMenuItem = useCallback(
    (newItem: React.RefObject<HTMLButtonElement>) => {
      // @ts-ignore
      activeMenuItem.current = newItem;
    },
    []
  );

  const getMenuButtonProps = useCallback(
    (menuButtonProps = {}, forwardedRef = null) => ({
      ...menuButtonProps,
      ref: mergeRefs(forwardedRef, menuButtonRef, () => {}),
    }),
    [id]
  );
  const getMenuItemProps = useCallback(
    (menuItemProps = {}, forwardedRef = null) => {
      return {
        ...menuItemProps,
        id: `${id}-button-${Math.random()}`,
        ref: mergeRefs(forwardedRef, () => {}),
      };
    },
    [id]
  );
  const getMenuListProps = useCallback(
    (menuListProps = {}, forwardedRef = null) => {
      return {
        ...menuListProps,
        ref: mergeRefs(forwardedRef, menuListRef, () => {}),
      };
    },
    [id]
  );

  return {
    activeMenuItem,
    changeActiveMenuItem,
    closeOnEsc,
    getMenuButtonProps,
    getMenuItemProps,
    getMenuListProps,
    id,
    isOpen,
    menuButtonRef,
    menuListRef,
    onClose,
  };
};

/**
 * Hooks that returns all menu props
 */
const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context.id) {
    throw new Error(
      'useMenu: context is undefined, did you remember to wrap your app in a <Menu />'
    );
  }
  return context;
};

export { useMenuProvider, useMenu };
