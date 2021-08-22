import React, { useCallback, useMemo, useState } from 'react';

import { MenuProvider } from '../../../contexts/menu';
import { MenuProps } from './types';
import { useMenuProvider } from '../../../hooks/use-menu';
import { useUniqueId } from '../../../hooks';

/**
 * The container for all Menu related components
 * that provides context to its children.
 */
const Menu: React.FC<MenuProps> = props => {
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
    [context]
  );

  return <MenuProvider value={contextValue}>{children}</MenuProvider>;
};

export default Menu;
