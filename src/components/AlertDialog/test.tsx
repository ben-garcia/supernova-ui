/* eslint react/jsx-wrap-multilines: 0 */
/* eslint react/button-has-type: 0 */
import React from 'react';

import {
  a11yTest,
  fireEvent,
  render,
  userEvent,
  waitFor, // wait for the set timeout function to be called
} from '@test-utils';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogButton,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@components';

describe('<AlertDialog />', () => {
  it('should pass a11y tests', async () => {
    function ModalTest() {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={jest.fn()}
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>header</AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>body</AlertDialogBody>

            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    await a11yTest(<ModalTest />);
  });

  it('should contain the proper aria attributes', () => {
    function ModalTest() {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={jest.fn()}
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>header</AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>body</AlertDialogBody>

            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>
              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

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
    function ModalTest() {
      const leastDestructiveRef = React.useRef(null);

      return (
        <AlertDialog
          leastDestructiveRef={leastDestructiveRef}
          isOpen
          onClose={mockOnClose}
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>header</AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>body</AlertDialogBody>

            <AlertDialogFooter>
              <button data-testid="cancel-button" ref={leastDestructiveRef}>
                cancel
              </button>

              <button data-testid="delete-button">delete</button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    const { getByLabelText } = render(<ModalTest />);
    const closeButton = getByLabelText('Close the alert dialog');

    fireEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  describe('overlay click', () => {
    it('should call onClickOutside and not onClose when closeOnOverlayClick is true and onClickOutside is a function', async () => {
      const mockOnClickOutside = jest.fn();
      const mockOnClose = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onClickOutside={mockOnClickOutside}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByRole } = render(<ModalTest />);

      const modal = getByRole('alertdialog');

      fireEvent.click(modal.parentElement!);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onClickOutside and not onClose when closeOnOverlayClick is true, onClickOutside is a function and closeOnEsc is false', async () => {
      const mockOnClickOutside = jest.fn();
      const mockOnClose = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            closeOnEsc={false}
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onClickOutside={mockOnClickOutside}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByRole } = render(<ModalTest />);

      const modal = getByRole('alertdialog');

      fireEvent.click(modal.parentElement!);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onClose nor onClickOutside when closeOnOverlayClick is false', async () => {
      const mockOnClose = jest.fn();
      const mockOnClickOutside = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            closeOnOverlayClick={false}
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onClickOutside={mockOnClickOutside}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByRole } = render(<ModalTest />);

      const modal = getByRole('alertdialog');

      fireEvent.click(modal.parentElement!);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnClickOutside).not.toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('esc key', () => {
    it('should call onEscPress and not onClose when closeOnEsc is true and onEscPress is a function', async () => {
      const mockOnClose = jest.fn();
      const mockEscPress = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onEscPress={mockEscPress}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      render(<ModalTest />);

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockEscPress).toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should call onEscPress and not onClose when closeOnEsc is true and onEscPress is a function and closeOnOverlayClick is false', async () => {
      const mockOnClose = jest.fn();
      const mockEscPress = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            closeOnOverlayClick={false}
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onEscPress={mockEscPress}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <button data-testid="cancel-button" ref={leastDestructiveRef}>
                  cancel
                </button>
                <button data-testid="delete-button">delete</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      render(<ModalTest />);

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockEscPress).toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should not call onClose nor onEscPress when closeOnEsc is false', async () => {
      const mockOnClose = jest.fn();
      const mockOnEscPress = jest.fn();
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            closeOnEsc={false}
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockOnClose}
            onEscPress={mockOnEscPress}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>
                <input />
              </AlertDialogBody>

              <AlertDialogFooter>
                <button ref={leastDestructiveRef}>cancel</button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      render(<ModalTest />);

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnEscPress).not.toHaveBeenCalled();
      });
    });
  });

  describe('focus', () => {
    // NOTE: failing test, error below
    //
    // Expected element with focus:
    //   <button data-testid="open-button" type="button">Open</button>
    // Received element with focus:
    //   <body><div><button data-testid="open-button" type="button">Open</button></div></body>
    //
    // Not sure why the body and div are also focused.
    it.skip('should give focus back to the trigger element by default', async () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
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

            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      }

      const { getByLabelText, getByTestId } = render(<ModalTest />);
      const openButton = getByTestId('open-button');

      // open modal
      fireEvent.click(openButton);

      const closeButton = getByLabelText('Close the alert dialog');

      // close modal
      fireEvent.click(closeButton);

      // open button should be focused when Modal has closed
      await waitFor(() => expect(openButton).toHaveFocus());
    });

    it('should give focus to the leastDestructiveRef by default', () => {
      function ModalTest() {
        const leastDestructiveRef = React.useRef(null);

        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={jest.fn()}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>header</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <AlertDialogButton
                  data-testid="cancel-button"
                  ref={leastDestructiveRef}
                >
                  cancel
                </AlertDialogButton>

                <AlertDialogButton data-testid="delete-button">
                  delete
                </AlertDialogButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByTestId } = render(<ModalTest />);
      const cancelButton = getByTestId('cancel-button');

      expect(cancelButton).toHaveFocus();
    });

    it('should return focus to the finalFocusRef element', async () => {
      function ModalTest() {
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

            <button
              data-testid="final-button"
              ref={finalFocusRef}
              type="button"
            >
              Receive focus
            </button>

            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              finalFocusRef={finalFocusRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      }

      const { getByLabelText, getByTestId } = render(<ModalTest />);
      const openButton = getByTestId('open-button');
      const finalButton = getByTestId('final-button');

      // click the button
      fireEvent.click(openButton);

      const closeButton = getByLabelText('Close the alert dialog');

      fireEvent.click(closeButton);

      // final button should be focused when Modal has closed
      await waitFor(() => expect(finalButton).toHaveFocus());
    });

    it('should keep the active element focused when closeOnOverlayClick is false', async () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
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

            <AlertDialog
              closeOnOverlayClick={false}
              leastDestructiveRef={leastDestructiveRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      }

      const { getByRole, getByTestId, getByText } = render(<ModalTest />);
      const openButton = getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const modal = getByRole('alertdialog');
      const cancelButton = getByTestId('cancel-button');
      const deleteButton = getByTestId('delete-button');
      const body = getByText('body');

      expect(cancelButton).toHaveFocus();

      fireEvent.click(modal.parentElement!);
      expect(cancelButton).toHaveFocus();

      // shouldn't loose focus when clicking in side the dialog
      userEvent.click(body);
      expect(cancelButton).toHaveFocus();

      userEvent.tab();

      fireEvent.click(modal.parentElement!);
      expect(deleteButton).toHaveFocus();
    });
  });

  describe('keyboard navigation', () => {
    describe('Tab', () => {
      it('should focus the next tabbable element and wrap around to the first by default', () => {
        function ModalTest() {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }

        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the alert dialog');

        expect(cancelButton).toHaveFocus();

        userEvent.tab();
        expect(deleteButton).toHaveFocus();

        userEvent.tab();
        // focus the last tabbable element
        expect(closeButton).toHaveFocus();
      });

      it('should focus the next tabbable element and NOT wrap around to the first when trapFocus is false', () => {
        function ModalTest() {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the alert dialog');

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
        function ModalTest() {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>

                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the alert dialog');

        expect(cancelButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // focus the last tabbable element
        expect(closeButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the last element
        expect(deleteButton).toHaveFocus();
      });

      it('should focus the previous tabbable element and NOT wrap around to the last when trapFocus is false', () => {
        function ModalTest() {
          const leastDestructiveRef = React.useRef(null);

          return (
            <AlertDialog
              leastDestructiveRef={leastDestructiveRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>header</AlertDialogHeader>

                <AlertDialogCloseButton />

                <AlertDialogBody>body</AlertDialogBody>

                <AlertDialogFooter>
                  <button data-testid="cancel-button" ref={leastDestructiveRef}>
                    cancel
                  </button>
                  <button data-testid="delete-button">delete</button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        }
        const { getByLabelText, getByTestId } = render(<ModalTest />);
        const cancelButton = getByTestId('cancel-button');
        const deleteButton = getByTestId('delete-button');
        const closeButton = getByLabelText('Close the alert dialog');

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

  describe('with AlertDialogButton', () => {
    it('should call modal button onclick functions', async () => {
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();
      function Test() {
        const leastDestructiveRef = React.useRef(null);
        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={() => {}}
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Testing</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <AlertDialogButton aria-label="cancel" onClick={mockCancel}>
                  Cancel
                </AlertDialogButton>
                <AlertDialogButton aria-label="save" onClick={mockSubmit}>
                  Save
                </AlertDialogButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByText } = render(<Test />);
      const cancelButton = getByText('Cancel');
      const saveButton = getByText('Save');

      fireEvent.click(cancelButton);
      await waitFor(() => expect(mockCancel).toHaveBeenCalledTimes(1));

      fireEvent.click(saveButton);
      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    });

    it('should not call the modal onClose function', async () => {
      const mockClose = jest.fn();
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();
      function Test() {
        const leastDestructiveRef = React.useRef(null);
        return (
          <AlertDialog
            leastDestructiveRef={leastDestructiveRef}
            isOpen
            onClose={mockClose}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Testing</AlertDialogHeader>

              <AlertDialogCloseButton />

              <AlertDialogBody>body</AlertDialogBody>

              <AlertDialogFooter>
                <AlertDialogButton aria-label="cancel" onClick={mockCancel}>
                  Cancel
                </AlertDialogButton>
                <AlertDialogButton aria-label="save" onClick={mockSubmit}>
                  Save
                </AlertDialogButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      }

      const { getByText } = render(<Test />);

      const cancelButton = getByText('Cancel');
      const saveButton = getByText('Save');

      fireEvent.click(cancelButton);
      await waitFor(() => expect(mockClose).not.toHaveBeenCalled());

      fireEvent.click(saveButton);
      await waitFor(() => expect(mockClose).not.toHaveBeenCalled());
    });
  });
});
