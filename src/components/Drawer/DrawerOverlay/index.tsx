import React, { FC } from 'react';

import Overlay from '@components/Overlay';
import { useDrawer } from '@hooks/use-drawer';

/**
 * The overlay for the Drawer component.
 */
const ModalOverlay: FC<Parameters<typeof Overlay>[0]> = props => {
  const { isOpen } = useDrawer();

  return isOpen ? <Overlay {...props} /> : null;
};

export default ModalOverlay;
