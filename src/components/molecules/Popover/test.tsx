import React from 'react';

import { Button } from '@atoms';
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@molecules';
import { PopoverProps } from '@molecules/Popover/Popover';
import { a11yTest, fireEvent, render, screen, userEvent } from '@testUtils';

describe('<Popover />', () => {
  const PopoverTest = (props: PopoverProps) => (
    <Popover {...props}>
      <PopoverTrigger>
        <Button>trigger</Button>
      </PopoverTrigger>
      <PopoverContent data-testid="popover">
        <PopoverHeader>header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>body</PopoverBody>
        <PopoverFooter>footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
  const VisibleTest = (props: Partial<PopoverProps>) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen(prev => !prev);
    return (
      <PopoverTest
        {...props}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
      />
    );
  };

  it('should pass a11y tests', async () => {
    await a11yTest(<PopoverTest isOpen onClose={() => {}} />);
  });

  it('should contain the proper aria attributes', () => {
    render(<PopoverTest isOpen onClose={() => {}} />);

    const modal = screen.getByRole('dialog');

    // should have 'aria-modal' set to 'true' and 'role' of 'dialog'
    expect(modal).toHaveAttribute('role', 'dialog');

    // the id of `body` should equal the `aria-describedby` of the modal
    expect(screen.getByText('body').id).toEqual(
      modal.getAttribute('aria-describedby')
    );

    // the id of `header` should equal the `aria-labelledby` of the modal
    expect(screen.getByText('header').id).toEqual(
      modal.getAttribute('aria-labelledby')
    );
  });

  it('should call the onClose function when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<PopoverTest isOpen onClose={mockOnClose} />);
    const closeButton = screen.getByLabelText('Close the Popover');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should NOT be visible when isOpen is false and visible when true', () => {
    render(<VisibleTest />);

    // TestingLibraryElementError:
    //    Unable to find an accessible element with the role "dialog"
    // const popover = screen.getByRole('dialog');
    const popover = screen.getByTestId('popover');
    const trigger = screen.getAllByRole('button')[0];

    expect(popover).not.toBeVisible();

    fireEvent.click(trigger);

    expect(popover).toBeVisible();
  });

  describe('keyboard navigation', () => {
    describe('close functions', () => {
      it('should call onBlur and onClose when passing onBlur function', () => {
        const mockOnBlur = jest.fn();
        const mockOnClose = jest.fn();

        render(
          <PopoverTest isOpen onBlur={mockOnBlur} onClose={mockOnClose} />
        );

        fireEvent.click(window);

        expect(mockOnBlur).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
      });

      it('should NOT call either onBlur or onClose when passing onBlur function when closeOnBlur in false', () => {
        const mockOnBlur = jest.fn();
        const mockOnClose = jest.fn();

        render(
          <PopoverTest
            closeOnBlur={false}
            isOpen
            onBlur={mockOnBlur}
            onClose={mockOnClose}
          />
        );

        fireEvent.click(window);

        expect(mockOnBlur).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    describe('esc key', () => {
      it('should call onEscPress and onClose when closeOnEsc is true and onEscPress is a function', () => {
        const mockOnEscPress = jest.fn();
        const mockOnClose = jest.fn();

        render(
          <PopoverTest
            isOpen
            onEscPress={mockOnEscPress}
            onClose={mockOnClose}
          />
        );

        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

        expect(mockOnEscPress).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
      });

      it('should NOT call either onEscPress or onClose when closeOnEsc is false and onEscPress is a function', () => {
        const mockOnEscPress = jest.fn();
        const mockOnClose = jest.fn();

        render(
          <PopoverTest
            closeOnEsc={false}
            isOpen
            onClose={mockOnClose}
            onEscPress={mockOnEscPress}
          />
        );

        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

        expect(mockOnEscPress).not.toHaveBeenCalled();
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    describe('focus', () => {
      it('should return focus to the trigger element by default', () => {
        render(<VisibleTest />);

        const trigger = screen.getByRole('button');

        fireEvent.click(trigger);

        const closeButton = screen.getAllByRole('button')[1];
        fireEvent.click(closeButton);

        expect(trigger).toHaveFocus();
      });

      it('should NOT return focus to the trigger element when shouldReturnFocusOnClose in false', () => {
        render(<VisibleTest shouldReturnFocusOnClose={false} />);

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);
        fireEvent.click(screen.getAllByRole('button')[1]);

        expect(trigger).not.toHaveFocus();
      });

      it('should NOT give focus to the popover content when triggered with mouse', () => {
        render(<VisibleTest />);

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        expect(screen.getByRole('dialog')).not.toHaveFocus();
      });

      it('should trap focus', () => {
        const TrapFocusTest = () => {
          const [isOpen, setIsOpen] = React.useState(false);
          const onClose = () => setIsOpen(false);
          const onToggle = () => setIsOpen(prev => !prev);
          return (
            <Popover
              isOpen={isOpen}
              onToggle={onToggle}
              onClose={onClose}
              trapFocus
            >
              <PopoverTrigger>
                <Button>trigger</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>body</PopoverBody>
                <PopoverFooter>
                  <Button data-testid="save">save</Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          );
        };

        render(<TrapFocusTest />);

        fireEvent.click(screen.getByRole('button'));

        const closeButton = screen.getAllByRole('button')[1];

        closeButton.focus();

        userEvent.tab({ shift: true });

        expect(screen.getByTestId('save')).toHaveFocus();

        userEvent.tab();

        expect(closeButton).toHaveFocus();
      });

      describe('closeOnBlur', () => {
        const TabTest = (props: Pick<PopoverProps, 'closeOnBlur'>) => {
          const { closeOnBlur = true } = props;
          const [isOpen, setIsOpen] = React.useState(false);
          const onClose = () => setIsOpen(false);
          const onToggle = () => setIsOpen(prev => !prev);
          return (
            <Popover
              closeOnBlur={closeOnBlur}
              isOpen={isOpen}
              onToggle={onToggle}
              onClose={onClose}
            >
              <PopoverTrigger>
                <Button>trigger</Button>
              </PopoverTrigger>
              <PopoverContent data-testid="popover">
                <PopoverHeader>header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <input data-testid="input" />
                </PopoverBody>
                <PopoverFooter>footer</PopoverFooter>
              </PopoverContent>
            </Popover>
          );
        };

        it('should close when tabbing out of focus by default', () => {
          render(<TabTest />);

          const trigger = screen.getByRole('button');

          expect(document.body).toHaveFocus();

          userEvent.tab();

          expect(trigger).toHaveFocus();

          userEvent.keyboard('[Enter]');

          const popover = screen.getByRole('dialog');
          userEvent.tab();

          expect(screen.getAllByRole('button')[1]).toHaveFocus();
          expect(popover).toBeVisible();

          userEvent.tab();

          expect(screen.getByTestId('input')).toHaveFocus();
          expect(popover).toBeVisible();

          userEvent.tab();

          expect(popover).not.toBeVisible();
        });

        it('should remain open when tabbing out of focus when closeOnBlur is false', () => {
          render(<TabTest closeOnBlur={false} />);

          const trigger = screen.getByRole('button');

          expect(document.body).toHaveFocus();

          userEvent.tab();

          expect(trigger).toHaveFocus();

          userEvent.keyboard('[Enter]');

          const popover = screen.getByRole('dialog');
          userEvent.tab();

          expect(screen.getAllByRole('button')[1]).toHaveFocus();
          expect(popover).toBeVisible();

          userEvent.tab();

          expect(screen.getByTestId('input')).toHaveFocus();
          expect(popover).toBeVisible();

          userEvent.tab();

          expect(popover).toBeVisible();
        });
      });

      describe('initialFocusRef', () => {
        const InitialFocusRefTest = () => {
          const [isOpen, setIsOpen] = React.useState(false);
          const onClose = () => setIsOpen(false);
          const onToggle = () => setIsOpen(prev => !prev);
          const initialFocusRef = React.useRef<HTMLInputElement | null>(null);
          return (
            <Popover
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onToggle={onToggle}
              onClose={onClose}
            >
              <PopoverTrigger>
                <Button>trigger</Button>
              </PopoverTrigger>
              <PopoverContent data-testid="popover">
                <PopoverHeader>header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <input data-testid="input" ref={initialFocusRef} />
                </PopoverBody>
                <PopoverFooter>footer</PopoverFooter>
              </PopoverContent>
            </Popover>
          );
        };

        it('should focus initialFocusRef', () => {
          jest.useFakeTimers();
          render(<InitialFocusRefTest />);

          fireEvent.click(screen.getByRole('button'));

          // fast forward past setTimeout
          jest.advanceTimersByTime(20);

          expect(screen.getByTestId('input')).toHaveFocus();

          jest.runOnlyPendingTimers();
          jest.useRealTimers();
        });
      });

      describe('finalFocusRef', () => {
        const FinalFocusRefTest = (
          props: Pick<PopoverProps, 'shouldReturnFocusOnClose'>
        ) => {
          const { shouldReturnFocusOnClose = true } = props;
          const finalFocusRef = React.useRef<HTMLButtonElement | null>(null);
          return (
            <>
              <Button ref={finalFocusRef}>final</Button>
              <VisibleTest
                finalFocusRef={finalFocusRef}
                shouldReturnFocusOnClose={shouldReturnFocusOnClose}
              />
            </>
          );
        };

        it('should return focus by default', () => {
          render(<FinalFocusRefTest />);

          const finalFocusRef = screen.getAllByRole('button')[0];

          fireEvent.click(screen.getByText('trigger'));
          fireEvent.click(screen.getAllByRole('button')[2]);

          expect(finalFocusRef).toHaveFocus();
        });

        it('should NOT return focus when shouldReturnFocusOnClose is false', () => {
          render(<FinalFocusRefTest shouldReturnFocusOnClose={false} />);

          const finalFocusRef = screen.getAllByRole('button')[0];

          fireEvent.click(screen.getByText('trigger'));
          fireEvent.click(screen.getAllByRole('button')[2]);

          expect(finalFocusRef).not.toHaveFocus();
        });
      });
    });
  });
});
