/* eslint react/jsx-wrap-multilines: 0 */
/* eslint react/button-has-type: 0 */
import React from 'react';

import AlertDialog from '.';
import AlertDialogBody from './AlertDialogBody';
import AlertDialogFooter from './AlertDialogFooter';
import AlertDialogHeader from './AlertDialogHeader';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  userEvent,
  waitFor, // wait for the set timeout function to be called
} from '../../../test-utils';

describe('<AlertDialog />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    const ModalTest = () => {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={jest.fn()}
        >
          <AlertDialogHeader>header</AlertDialogHeader>
          <AlertDialogBody>body</AlertDialogBody>
          <AlertDialogFooter>
            <button data-testid="cancel-button" ref={leastDestructiveRef}>
              cancel
            </button>
            <button data-testid="delete-button">delete</button>
          </AlertDialogFooter>
        </AlertDialog>
      );
    };

    await a11yTest(<ModalTest />);
  });

  it('should contain the proper aria attributes', () => {
    const ModalTest = () => {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={jest.fn()}
        >
          <AlertDialogHeader>header</AlertDialogHeader>
          <AlertDialogBody>body</AlertDialogBody>
          <AlertDialogFooter>
            <button data-testid="cancel-button" ref={leastDestructiveRef}>
              cancel
            </button>
            <button data-testid="delete-button">delete</button>
          </AlertDialogFooter>
        </AlertDialog>
      );
    };

    const { getByText, getByRole } = render(<ModalTest />);

    const modal = getByRole('alertdialog');

    // should have 'aria-modal' set to 'true'
    expect(modal).toHaveAttribute('aria-modal', 'true');

    // the id of `body` should equal the `aria-describedby` of the modal
    expect(getByText('body').id).toEqual(
      modal.getAttribute('aria-describedby')
    );

    // the id of `header` should equal the `aria-labelledby` of the modal
    expect(getByText('header').id).toEqual(
      modal.getAttribute('aria-labelledby')
    );
  });

  it('should call the onClose function when the close button is clicked', async () => {
    const mockOnClose = jest.fn();
    const ModalTest = () => {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={mockOnClose}
        >
          <AlertDialogHeader>header</AlertDialogHeader>
          <AlertDialogBody>body</AlertDialogBody>
          <AlertDialogFooter>
            <button data-testid="cancel-button" ref={leastDestructiveRef}>
              cancel
            </button>

            <button data-testid="delete-button">delete</button>
          </AlertDialogFooter>
        </AlertDialog>
      );
    };

    const { getByLabelText } = render(<ModalTest />);
    const closeButton = getByLabelText('Close the modal');

    fireEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  describe('overlay click', () => {
    it('should call the onClose function when the overlay window is clicked', () => {
      const mockOnClose = jest.fn();
      const ModalTest = () => {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
          >
            <AlertDialogHeader>header</AlertDialogHeader>
            <AlertDialogBody>body</AlertDialogBody>
            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialog>
        );
      };

      const { getByRole } = render(<ModalTest />);

      const modal = getByRole('alertdialog');

      fireEvent.click(modal.parentElement!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClose function when closeOnOverlayClick is false', () => {
      const mockOnClose = jest.fn();
      const ModalTest = () => {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={jest.fn()}
          >
            <AlertDialogHeader>header</AlertDialogHeader>
            <AlertDialogBody>body</AlertDialogBody>
            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialog>
        );
      };

      const { getByRole } = render(<ModalTest />);

      const modal = getByRole('alertdialog');

      fireEvent.click(modal.parentElement!);

      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('esc key', () => {
    it('should call the onClose function when the esc key is pressed', () => {
      const mockOnClose = jest.fn();
      const ModalTest = () => {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
          >
            <AlertDialogHeader>header</AlertDialogHeader>
            <AlertDialogBody>body</AlertDialogBody>
            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialog>
        );
      };

      render(<ModalTest />);

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClose function when closeOnEsc is false', () => {
      const mockOnClose = jest.fn();
      const ModalTest = () => {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            closeOnEsc={false}
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
          >
            <AlertDialogHeader>header</AlertDialogHeader>
            <AlertDialogBody>
              <input />
            </AlertDialogBody>
            <AlertDialogFooter>
              <button ref={leastDestructiveRef}>cancel</button>
            </AlertDialogFooter>
          </AlertDialog>
        );
      };

      render(<ModalTest />);

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });

  it('should give focus to the leastDestructiveRef by default', () => {
    const ModalTest = () => {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={jest.fn()}
        >
          <AlertDialogHeader>header</AlertDialogHeader>
          <AlertDialogBody>body</AlertDialogBody>
          <AlertDialogFooter>
            <button data-testid="cancel-button" ref={leastDestructiveRef}>
              cancel
            </button>

            <button data-testid="delete-button">delete</button>
          </AlertDialogFooter>
        </AlertDialog>
      );
    };

    const { getByTestId } = render(<ModalTest />);
    const cancelButton = getByTestId('cancel-button');

    expect(cancelButton).toHaveFocus();
  });

  it('should return focus to the finalFocusRef element', async () => {
    const ModalTest = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const finalFocusRef = React.useRef(null);
      const leastDestructiveRef = React.useRef(null);

      return (
        <>
          <button
            type="button"
            data-testid="open-button"
            onClick={() => setIsOpen(true)}
          >
            Open
          </button>

          <button data-testid="final-button" ref={finalFocusRef} type="button">
            Receive focus
          </button>

          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            finalFocusRef={finalFocusRef}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialogHeader>header</AlertDialogHeader>
            <AlertDialogBody>body</AlertDialogBody>
            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialog>
        </>
      );
    };

    const { getByLabelText, getByTestId } = render(<ModalTest />);
    const openButton = getByTestId('open-button');
    const finalButton = getByTestId('final-button');

    // click the button
    fireEvent.click(openButton);

    const closeButton = getByLabelText('Close the modal');

    fireEvent.click(closeButton);

    // final button should be focused when Modal has closed
    // await waitFor(() => expect(finalButton).toHaveFocus());
    await waitFor(() => expect(finalButton).toHaveFocus());
  });

  describe('keyboard navigation', () => {
    describe('Tab', () => {
      it('should focus the next tabbable element and wrap around to the first by default', () => {
        const ModalTest = () => {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
            >
              <AlertDialogHeader>header</AlertDialogHeader>
              <AlertDialogBody>body</AlertDialogBody>
              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialog>
          );
        };

        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the modal');

        expect(cancelButton).toHaveFocus();

        userEvent.tab();
        expect(deleteButton).toHaveFocus();

        userEvent.tab();
        // focus the last tabbable element
        expect(closeButton).toHaveFocus();
      });

      it('should focus the next tabbable element and NOT wrap around to the first when trapFocus is false', () => {
        const ModalTest = () => {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <AlertDialogHeader>header</AlertDialogHeader>
              <AlertDialogBody>body</AlertDialogBody>
              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialog>
          );
        };
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the modal');

        expect(cancelButton).toHaveFocus();

        userEvent.tab();
        expect(deleteButton).toHaveFocus();

        userEvent.tab();
        // focus should not be inside the modal
        expect(closeButton).not.toHaveFocus();
        expect(cancelButton).not.toHaveFocus();
        expect(deleteButton).not.toHaveFocus();
      });
    });

    describe('Shift+Tab', () => {
      it('should focus the previous tabbable element and wrap around to the last by default', () => {
        const ModalTest = () => {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
            >
              <AlertDialogHeader>header</AlertDialogHeader>
              <AlertDialogBody>body</AlertDialogBody>
              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>

                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialog>
          );
        };
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the modal');

        expect(cancelButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // focus the last tabbable element
        expect(closeButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the last element
        expect(deleteButton).toHaveFocus();
      });

      it('should focus the previous tabbable element and NOT wrap around to the last when trapFocus is false', () => {
        const ModalTest = () => {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <AlertDialogHeader>header</AlertDialogHeader>
              <AlertDialogBody>body</AlertDialogBody>
              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialog>
          );
        };
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the modal');

        expect(cancelButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // focus the last tabbable element
        expect(closeButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the last element
        expect(deleteButton).not.toHaveFocus();
        expect(closeButton).not.toHaveFocus();
        expect(cancelButton).not.toHaveFocus();
      });
    });
  });
});
