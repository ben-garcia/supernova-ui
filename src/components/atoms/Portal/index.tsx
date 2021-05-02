import { ReactNode, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { isString } from '../../../utils';

interface PortalProps {
  children: ReactNode;
  /**
   * A unique id for the portal
   */
  id?: string;
}

/**
 * Component that renders it's children in a React Portal
 */
const Portal = (props: PortalProps) => {
  const { children, id } = props;

  const [portalId] = useState(
    isString(id) ? `${id}-${Math.random()}-portal` : `portal-${Math.random()}`
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const div = document.createElement('div');

    div.id = portalId;
    document.body.appendChild(div);

    setMounted(true);

    return () => {
      if (div) {
        document.body.removeChild(div);
      }
    };
  }, []);

  return mounted
    ? createPortal(children, document.getElementById(portalId) as Element)
    : null;
};

export default Portal;
