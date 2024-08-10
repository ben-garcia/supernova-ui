import { FC } from 'react';
import { ButtonProps } from '@components/Button/types';
import './styles.scss';
interface AccordionHeaderButtonProps extends ButtonProps {
    /**
     * Configure the header level
     *
     * @default 2
     */
    headingLevel?: number;
}
/**
 * A button used to open/close the AccordionItem.
 */
declare const AccordionHeaderButton: FC<AccordionHeaderButtonProps>;
export default AccordionHeaderButton;
//# sourceMappingURL=index.d.ts.map