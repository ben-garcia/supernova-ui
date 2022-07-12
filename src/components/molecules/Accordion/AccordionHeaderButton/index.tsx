import React, { useCallback } from 'react';

import { Button, ChevronDownIcon, Heading } from '@atoms';
import {
  useAccordionItemProvider,
  useAccordion,
  useAccordionItem,
} from '@hooks';
import { ButtonProps } from '@atoms/Button/types';
import { createClasses, isString } from '@utils';
import './styles.scss';

interface AccordionHeaderButtonProps extends ButtonProps {
  className?: string;
  /**
   * Configure the header level
   *
   * @default 2
   */
  headingLevel?: number;
}

type HeadingLevelType = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * A button used to open/close the AccordionItem.
 */
const AccordionHeaderButton: React.FC<AccordionHeaderButtonProps> = props => {
  const { children, className, headingLevel = 2, ...rest } = props;
  const { getAccordionButtonProps } = useAccordionItemProvider();
  const {
    activeIndices,
    allowMultiple,
    allowToggle,
    buttonsRef,
    defaultIndices,
    focusedIndex,
    setActiveIndices,
    setFocusedIndex,
  } = useAccordion();
  const {
    accordionButtonId,
    accordionPanelId,
    isOpen,
    onOpen,
    onClose,
  } = useAccordionItem();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const classes = createClasses('snui-accordion__button', {
    [`${className}`]: isString(className),
  });

  const handleFocus = useCallback(() => {
    const index = Number(
      buttonRef.current!.getAttribute('data-snui-accordion-button-index')
    );
    setFocusedIndex(index);
  }, []);

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
        if (isOpen) {
          if (!activeIndices.includes(accordionButtonIndex) && defaultIndices) {
            setActiveIndices(
              activeIndices.filter(n => n !== accordionButtonIndex)
            );
            onClose();
          }
        } else {
          if (
            defaultIndices.includes(accordionButtonIndex) &&
            activeIndices.includes(accordionButtonIndex)
          ) {
            // setActiveIndices([accordionButtonIndex]);
          } else {
            setActiveIndices([accordionButtonIndex]);
          }
          onOpen();
        }
      }

      if (allowToggle) {
        if (isOpen) {
          if (
            defaultIndices.includes(accordionButtonIndex) &&
            activeIndices.includes(accordionButtonIndex)
          ) {
            setActiveIndices([accordionButtonIndex]);
          } else {
            setActiveIndices(
              activeIndices.filter(n => n !== accordionButtonIndex)
            );
          }
          onClose();
        } else {
          if (
            defaultIndices.includes(accordionButtonIndex) &&
            activeIndices.includes(accordionButtonIndex)
          ) {
            // setActiveIndices([accordionButtonIndex]);
          } else {
            setActiveIndices([accordionButtonIndex]);
          }
          onOpen();
        }
      }

      if (allowMultiple) {
        if (isOpen) {
          setActiveIndices(
            activeIndices.filter(n => n !== accordionButtonIndex)
          );
          onClose();
        } else {
          setActiveIndices([...activeIndices, accordionButtonIndex]);
          onOpen();
        }
      }
    },
    [isOpen, activeIndices]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e;
      if (buttonsRef) {
        if (key === 'ArrowUp') {
          if (focusedIndex === 0) {
            buttonsRef[buttonsRef.length - 1].focus();
          } else {
            buttonsRef[focusedIndex - 1].focus();
          }
        } else if (key === 'ArrowDown') {
          const lastButtonIndex = buttonsRef.length - 1;

          if (focusedIndex === lastButtonIndex) {
            buttonsRef[0].focus();
          } else {
            buttonsRef[focusedIndex + 1].focus();
          }
        } else if (key === 'Home') {
          if (focusedIndex !== 0) {
            buttonsRef[0].focus();
          }
        } else if (key === 'End') {
          const lastButtonIndex = buttonsRef.length - 1;

          if (focusedIndex !== lastButtonIndex) {
            buttonsRef[lastButtonIndex].focus();
          }
        }
      }
    },
    [buttonsRef, focusedIndex]
  );

  return (
    <Heading level={headingLevel as HeadingLevelType}>
      <Button
        {...rest}
        {...getAccordionButtonProps(rest)}
        aria-controls={accordionPanelId}
        aria-disabled={!allowToggle && isOpen ? true : undefined}
        aria-expanded={isOpen}
        className={classes}
        hoverBackgroundColor="var(--snui-color-gray-100)"
        id={accordionButtonId}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
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

export default AccordionHeaderButton;
