import React, {
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { Button, ChevronDownIcon, Heading } from '@components';
import { ButtonProps } from '@components/Button/types';
import {
  useAccordionItemProvider,
  useAccordion,
  useAccordionItem,
} from '@hooks';
import { createClasses, isString } from '@utils';
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
const AccordionHeaderButton: FC<AccordionHeaderButtonProps> = props => {
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonIndexRef = useRef<number>();
  const classes = createClasses('snui snui-accordion__button', {
    [`${className}`]: isString(className),
  });

  const handleFocus = useCallback(() => {
    const index = Number(
      buttonRef.current!.getAttribute('data-snui-accordion-button-index')
    );
    setFocusedIndex(index);
  }, []);

  // collapses buttons that are not active.
  useEffect(() => {
    if (!allowMultiple) {
      // @ts-ignore
      if (!activeIndices.includes(buttonIndexRef.current)) {
        onClose();
      }
    }
  }, [activeIndices]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      // get the index of the button that was clicked,
      // used to compare with the activeIndices array.
      // const accordionButtonIndex = Number(
      //   e.currentTarget.attributes.getNamedItem(
      //     'data-snui-accordion-button-index'
      //   )?.nodeValue
      // );

      buttonIndexRef.current = Number(
        e.currentTarget.attributes.getNamedItem(
          'data-snui-accordion-button-index'
        )?.nodeValue
      );

      if (!allowToggle && !allowMultiple) {
        if (isOpen) {
          if (
            !activeIndices.includes(buttonIndexRef.current) &&
            defaultIndices
          ) {
            setActiveIndices(
              activeIndices.filter(n => n !== buttonIndexRef.current)
            );
            onClose();
          }
        } else {
          if (
            defaultIndices.includes(buttonIndexRef.current) &&
            activeIndices.includes(buttonIndexRef.current)
          ) {
            // setActiveIndices([accordionButtonIndex]);
          } else {
            setActiveIndices([buttonIndexRef.current]);
          }
          onOpen();
        }
      }

      if (allowToggle) {
        if (isOpen) {
          if (
            defaultIndices.includes(buttonIndexRef.current) &&
            activeIndices.includes(buttonIndexRef.current)
          ) {
            setActiveIndices([buttonIndexRef.current]);
          } else {
            setActiveIndices(
              activeIndices.filter(n => n !== buttonIndexRef.current)
            );
          }
          onClose();
        } else {
          if (
            defaultIndices.includes(buttonIndexRef.current) &&
            activeIndices.includes(buttonIndexRef.current)
          ) {
            // setActiveIndices([accordionButtonIndex]);
          } else {
            setActiveIndices([buttonIndexRef.current]);
          }
          onOpen();
        }
      }

      if (allowMultiple) {
        if (isOpen) {
          setActiveIndices(
            activeIndices.filter(n => n !== buttonIndexRef.current)
          );
          onClose();
        } else {
          setActiveIndices([...activeIndices, buttonIndexRef.current]);
          onOpen();
        }
      }
    },
    [isOpen, activeIndices]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
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
    <Heading
      level={headingLevel as keyof AccordionHeaderButtonProps['headingLevel']}
    >
      <Button
        {...getAccordionButtonProps(rest)}
        aria-controls={accordionPanelId}
        aria-disabled={!allowToggle && isOpen ? true : undefined}
        aria-expanded={isOpen}
        className={classes}
        id={accordionButtonId}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
      >
        <div className="snui-accordion__text">{children}</div>

        <ChevronDownIcon
          className={`snui-accordion__icon${
            isOpen
              ? ' snui-accordion__icon--expanded'
              : ' snui-accordion__icon--collapsed'
          }`}
          height="0.6rem"
          width="0.6rem"
        />
      </Button>
    </Heading>
  );
};

export default AccordionHeaderButton;
