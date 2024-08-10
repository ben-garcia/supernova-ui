import { FC } from 'react';
import { SharedAnchorPositioningProps, SupernovaProps } from '@types';
import './styles.scss';
interface PropoverContentProps extends Omit<SupernovaProps, 'id'>, Omit<SharedAnchorPositioningProps, 'children'> {
}
/**
 * The container for Popover related components.
 */
declare const PopoverContent: FC<PropoverContentProps>;
export default PopoverContent;
//# sourceMappingURL=index.d.ts.map