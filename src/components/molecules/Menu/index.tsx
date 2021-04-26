import React, { useMemo, useState } from 'react';

import { MenuProvider } from '../../../contexts/menu';
import { MenuProps } from './types';
import { isString } from '../../../utils';
import { useMenuProvider } from '../../../hooks/use-menu';

const Menu: React.FC<MenuProps> = props => {
  const { children, closeOnEsc = true, id, isOpen, onClose } = props;
  const [idToUse] = useState(
    isString(id) ? `${id}-${Math.random()}` : `menu-${Math.random()}`
  );

  const context = useMenuProvider(props);
  const contextValue = useMemo(
    () => ({
      ...context,
      closeOnEsc,
      id: idToUse,
      isOpen,
      onClose,
    }),
    [context]
  );

  return <MenuProvider value={contextValue as any}>{children}</MenuProvider>;
};

export default Menu;
