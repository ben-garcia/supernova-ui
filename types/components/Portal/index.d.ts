import { FC, ReactNode } from 'react';
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
declare const Portal: FC<PortalProps>;
export default Portal;
//# sourceMappingURL=index.d.ts.map