import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { Button, ChevronDownIcon, Heading } from '../../../atoms';
import {
  useAccordionItemProvider,
  useAccordion,
  useAccordionItem,
} from '../../../../hooks/use-accordion';
import { ButtonProps } from '../../../atoms/Button/types';
import { createClasses, isString } from '../../../../utils';
import './styles.scss';

interface AccordionButtonProps extends ButtonProps {
  className?: string;
  /**
   * Configure the header level
   *
   * @default 2
   */
  headingLevel?: number;
}

type HeadingLevelType = 1 | 2 | 3 | 4 | 5 | 6;

const AccordionButton: React.FC<AccordionButtonProps> = props => {
  const { children, className, headingLevel = 2, ...rest } = props;
  const { getAccordionButtonProps } = useAccordionItemProvider(props);
  const {
    activeIndices,
    allowMultiple,
    allowToggle,
    setActiveIndices,
  } = useAccordion();
  const { isOpen, onOpen, onClose } = useAccordionItem();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const classes = createClasses('snui-accordion__button', {
    [`${className}`]: isString(className),
  });
  const buttonIndex = useMemo(
    () =>
      Number(
        buttonRef?.current?.getAttribute('data-snui-accordion-button-index')
      ),
    [buttonRef?.current]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // get the index of the button that was clicked,
      // used to compare with the activeIndices array.
      const accordionButtonIndex = Number(
        e.currentTarget.attributes.getNamedItem(
          'data-snui-accordion-button-index'
        )?.nodeValue
      );

      if (!allowToggle && !allowMultiple) {
        if (isOpen && !activeIndices.includes(accordionButtonIndex)) {
          setActiveIndices(activeIndices.filter(n => n !== buttonIndex));
          onClose();
        } else {
          setActiveIndices([buttonIndex]);
          onOpen();
        }
      }
      if (allowToggle) {
        if (isOpen) {
          setActiveIndices(activeIndices.filter(n => n !== buttonIndex));
          onClose();
        } else {
          setActiveIndices([buttonIndex]);
          onOpen();
        }
      }
      if (allowMultiple) {
        if (isOpen) {
          setActiveIndices(activeIndices.filter(n => n !== buttonIndex));
          onClose();
        } else {
          setActiveIndices([...activeIndices, buttonIndex]);
          onOpen();
        }
      }
    },
    [isOpen, activeIndices, buttonIndex]
  );

  useEffect(() => {
    if (buttonRef?.current) {
      if (activeIndices.includes(buttonIndex)) {
        buttonRef?.current?.click();
      }
    }
  }, [buttonRef?.current]);

  return (
    <Heading level={headingLevel as HeadingLevelType}>
      <Button
        {...rest}
        {...getAccordionButtonProps(rest)}
        aria-expanded={isOpen}
        className={classes}
        backgroundColor="transparent"
        hoverBackgroundColor="var(--snui-color-gray-100)"
        onClick={handleClick}
        ref={buttonRef}
        width="100%"
      >
        <div className="snui-accordion__text" style={{ color: 'black' }}>
          {children}
        </div>
        <ChevronDownIcon
          className={`snui-accordion__icon${
            isOpen
              ? ' snui-accordion__icon--expanded'
              : ' snui-accordion__icon--collapsed'
          }`}
          size="0.7rem"
        />
      </Button>
    </Heading>
  );
};

export default AccordionButton;
