import React, { FC } from 'react';

import { Overlay } from '@components';
import { useModal } from '@hooks';

/**
 * The overlay for the Modal component.
 */
const ModalOverlay: FC<Parameters<typeof Overlay>[0]> = props => {
  const { isOpen } = useModal();

  return isOpen ? <Overlay {...props} /> : null;
};

export default ModalOverlay;
