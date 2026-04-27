import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { MenuProvider } from '@contexts';
import { useMenuProvider, useUniqueId } from '@hooks';

import { MenuRootProps } from './types';

/**
 * The container for all Menu related components
 * that provides context to its children.
 */
const Menu: FC<PropsWithChildren<MenuRootProps>> = props => {
  const { children, closeOnEsc = true, isOpen, onClose } = props;

  const menuId = useUniqueId('snui-menu');
  const [focusedIndex, setFocusedIndexFunction] = useState(-1);

  const setFocusedIndex = useCallback((newIndex: number) => {
    setFocusedIndexFunction(newIndex);
  }, []);

  const context = useMenuProvider(props);
  const contextValue = useMemo(
    () => ({
      ...context,
      closeOnEsc,
      focusedIndex,
      menuId,
      isOpen,
      onClose,
      setFocusedIndex,
    }),
    [
      context,
      closeOnEsc,
      focusedIndex,
      menuId,
      isOpen,
      onClose,
      setFocusedIndex,
    ]
  );

  return <MenuProvider value={contextValue}>{children}</MenuProvider>;
};

export default Menu;
