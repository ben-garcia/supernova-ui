import React, { FC } from 'react';

import Overlay from '@components/Overlay';
import { useAlertDialog } from '@hooks/use-alert-dialog';

/**
 * The overlay for the AlertDialog component.
 */
const AlertDialogOverlay: FC<Parameters<typeof Overlay>[0]> = props => {
  const { isOpen } = useAlertDialog();

  return isOpen ? <Overlay {...props} /> : null;
};

export default AlertDialogOverlay;
