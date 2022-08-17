import { FC, ReactNode, useEffect, useState } from 'react';

import { useUniqueId } from '@hooks';
import { createPortal, isString } from '@utils';

export interface PortalProps {
  children: ReactNode;
  /**
   * A unique id for the portal.
   */
  id?: string;
  /**
   * Used to control when the Portal should be rendered.
   *
   * @default true
   */
  isMounted?: boolean;
}

/**
 * Component that renders it's children in a React Portal
 */
const Portal: FC<PortalProps> = props => {
  const { children, id, isMounted = true } = props;

  const portalId = isString(id) ? id : useUniqueId('snui-portal');
  const [render, setRender] = useState(false);

  useEffect(() => {
    let div: HTMLDivElement;

    if (isMounted) {
      div = document.createElement('div');
      div.id = portalId as string;
      document.body.appendChild(div);
      setRender(true);
    }

    return () => {
      if (div) {
        setRender(false);
        document.body.removeChild(div);
      }
    };
  }, [isMounted]);

  return render && isMounted
    ? createPortal(
        children,
        document.getElementById(portalId as string) as Element
      )
    : null;
};

export default Portal;
