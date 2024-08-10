import { FC } from 'react';
import { SupernovaProps } from '@types';
declare type Tag = 'article' | 'div' | 'footer' | 'header' | 'section';
export interface BoxProps extends SupernovaProps {
    tag?: Tag;
}
/**
 * Container component used as a wrapper for other components.
 */
declare const Box: FC<BoxProps>;
export default Box;
//# sourceMappingURL=index.d.ts.map