import React from 'react';

import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  screen,
  userEvent,
} from '@testUtils';
import {
  Accordion,
  AccordionHeaderButton,
  AccordionItem,
  AccordionPanel,
} from '.';

import { AccordionProps } from './types';

describe('<Accordion />', () => {
  beforeAll(() => mockMatchMedia());

  const buttonOneContent = 'Section 1';
  const panelOneContent = 'section 1 panel';
  const buttonTwoContent = 'Section 2';
  const panelTwoContent = 'section 2 panel';
  const buttonThreeContent = 'Section 3';
  const panelThreeContent = 'section 3 panel';

  const AccordionTest = (props: Omit<AccordionProps, 'children'>) => {
    return (
      <div data-testid="accordion">
        <Accordion {...props}>
          <AccordionItem>
            <AccordionHeaderButton>{buttonOneContent}</AccordionHeaderButton>
            <AccordionPanel>{panelOneContent}</AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeaderButton>{buttonTwoContent}</AccordionHeaderButton>
            <AccordionPanel>{panelTwoContent}</AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeaderButton>{buttonThreeContent}</AccordionHeaderButton>
            <AccordionPanel>{panelThreeContent}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<AccordionTest />);
  });

  it('should wrap header button in an h2 by default', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionHeaderButton>button</AccordionHeaderButton>
        </AccordionItem>
      </Accordion>
    );
    const headerButton = screen.getByRole('button');

    expect(headerButton.parentElement?.nodeName).toBe('H2');
  });

  it('should contain the proper aria attributes', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionHeaderButton>Section 1</AccordionHeaderButton>
          <AccordionPanel>section 1 panel</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const headerButton = screen.getByRole('button');
    const accordionPanel = screen.getByRole('region');

    expect(headerButton).toHaveAttribute('aria-expanded', 'false');
    // 'aria-controls' must match the id of the button.
    expect(headerButton).toHaveAttribute(
      'aria-controls',
      accordionPanel?.getAttribute('id')
    );

    fireEvent.click(headerButton);

    // 'aria-expanded' should indicate that the button was clicked.
    expect(headerButton).toHaveAttribute('aria-expanded', 'true');

    expect(accordionPanel).toHaveAttribute('role', 'region');
    // 'aria-labelledby' must match id of the panel.
    expect(accordionPanel).toHaveAttribute(
      'aria-labelledby',
      headerButton?.getAttribute('id')
    );
  });

  describe('keyboard navigation', () => {
    let headerButtons: HTMLElement[];

    beforeEach(() => {
      render(<AccordionTest />);

      headerButtons = screen.getAllByRole('button');
    });

    describe('tab and shift+tab', () => {
      it('should traverse back and forth through the buttons', () => {
        userEvent.tab();
        expect(headerButtons[0]).toHaveFocus();

        userEvent.tab();
        expect(headerButtons[1]).toHaveFocus();

        userEvent.tab();
        expect(headerButtons[2]).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(headerButtons[1]).toHaveFocus();

        userEvent.tab({ shift: true });
        expect(headerButtons[0]).toHaveFocus();
      });
    });

    describe('function keys', () => {
      describe('End', () => {
        it('should set focus to the last header button', () => {
          // focus set to the first button
          fireEvent.focus(headerButtons[0]);

          fireEvent.keyDown(headerButtons[0], { key: 'End' });

          expect(headerButtons[2]).toHaveFocus();
        });
      });

      describe('Home', () => {
        it('should set focus to the first header button', () => {
          // focus set to the last button
          fireEvent.focus(headerButtons[2]);

          fireEvent.keyDown(headerButtons[2], { key: 'Home' });

          expect(headerButtons[0]).toHaveFocus();
        });
      });
    });

    describe('arrow keys', () => {
      describe('ArrowDown', () => {
        it('should set focus to the next header button', () => {
          // focus set to the first button
          fireEvent.focus(headerButtons[0]);

          fireEvent.keyDown(headerButtons[0], { key: 'ArrowDown' });

          expect(headerButtons[1]).toHaveFocus();

          fireEvent.keyDown(headerButtons[1], { key: 'ArrowDown' });

          expect(headerButtons[2]).toHaveFocus();
        });

        it('should set focus to the first button when current focus is on the last button,', () => {
          // focus set to the first button
          fireEvent.focus(headerButtons[2]);

          fireEvent.keyDown(headerButtons[2], { key: 'ArrowDown' });

          expect(headerButtons[0]).toHaveFocus();
        });
      });

      describe('ArrowUp', () => {
        it('should set focus to the previous header button', () => {
          // focus set to the first button
          fireEvent.focus(headerButtons[2]);

          fireEvent.keyDown(headerButtons[2], { key: 'ArrowUp' });

          expect(headerButtons[1]).toHaveFocus();

          fireEvent.keyDown(headerButtons[1], { key: 'ArrowUp' });

          expect(headerButtons[0]).toHaveFocus();
        });

        it('should set focus to the first button when current focus is on the last button, ', () => {
          // focus set to the first button
          fireEvent.focus(headerButtons[0]);

          fireEvent.keyDown(headerButtons[0], { key: 'ArrowUp' });

          expect(headerButtons[2]).toHaveFocus();
        });
      });
    });
  });

  describe('props', () => {
    describe('none', () => {
      it('should only have a single panel collapsed at a time and unable to collapse the opened panel', () => {
        render(<AccordionTest />);

        const headerButtons = screen.getAllByRole('button');

        /**
         * 'aria-expanded' set to true indicates that panel associated with
         * the button is open.
         */

        // panels are all closed by default
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the first header button
        fireEvent.click(headerButtons[0]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the second header button
        fireEvent.click(headerButtons[1]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the third header button
        fireEvent.click(headerButtons[2]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');
      });
    });

    describe('allowToggle', () => {
      it('should only have a single panel collapsed at a time and able to collapse the opened panel', () => {
        render(<AccordionTest allowToggle />);

        const headerButtons = screen.getAllByRole('button');

        /**
         * 'aria-expanded' set to true indicates that panel associtaed with
         * the button is open.
         */

        // panels are all closed by default
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the first header button
        fireEvent.click(headerButtons[0]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the second header button
        fireEvent.click(headerButtons[1]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the third header button
        fireEvent.click(headerButtons[1]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');
      });
    });

    describe('allowMultiple', () => {
      it('should be able to close and open all', () => {
        render(<AccordionTest allowMultiple />);

        const headerButtons = screen.getAllByRole('button');

        /**
         * 'aria-expanded' set to true indicates that panel associated with
         * the button is open.
         */

        // panels are all closed by default
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the first header button, which opens the associated panel.
        fireEvent.click(headerButtons[0]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the second header button, which opens the associated panel.
        fireEvent.click(headerButtons[1]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

        // click the third header button, which opens the associated panel.
        fireEvent.click(headerButtons[2]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');

        // click the all butons, which closes the all their associated panel.
        fireEvent.click(headerButtons[2]);
        fireEvent.click(headerButtons[1]);
        fireEvent.click(headerButtons[0]);
        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');
      });
    });

    describe('defaultIndices', () => {
      it('should render with open panels matching prop', () => {
        render(<AccordionTest defaultIndices={[0, 2]} />);

        const headerButtons = screen.getAllByRole('button', {
          expanded: true,
        });

        expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
      });

      describe('with allowMultiple', () => {
        it('should be able to close and open all', () => {
          render(<AccordionTest defaultIndices={[0, 2]} allowMultiple />);

          const headerButtons = screen.getAllByRole('button');

          /**
           * 'aria-expanded' set to true indicates that panel associated with
           * the button is open.
           */

          // panels on and third and open
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');

          // click the first header button, which opens the associated panel.
          fireEvent.click(headerButtons[0]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');

          // click the second header button, which opens the associated panel.
          fireEvent.click(headerButtons[1]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');

          // click the third header button, which opens the associated panel.
          fireEvent.click(headerButtons[2]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

          // click the all butons, which closes the all their associated panel.
          fireEvent.click(headerButtons[2]);
          fireEvent.click(headerButtons[1]);
          fireEvent.click(headerButtons[0]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');
        });
      });

      describe('with allowToggle', () => {
        it('should only have a single panel collapsed at a time and able to collapse the opened panel', () => {
          render(<AccordionTest defaultIndices={[1, 2]} allowToggle />);

          const headerButtons = screen.getAllByRole('button');

          /**
           * 'aria-expanded' set to true indicates that panel associtaed with
           * the button is open.
           */

          // panels one and two are opened
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'true');

          // click the first header button
          fireEvent.click(headerButtons[0]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');

          // click the second header button
          fireEvent.click(headerButtons[1]);
          expect(headerButtons[0]).toHaveAttribute('aria-expanded', 'false');
          expect(headerButtons[1]).toHaveAttribute('aria-expanded', 'true');
          expect(headerButtons[2]).toHaveAttribute('aria-expanded', 'false');
        });
      });
    });
  });
});
