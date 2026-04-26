import React from 'react';

import { Drawer } from '@components';
import {
  a11yTest,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor, // wait for the set timeout function to be called
} from '@test-utils';

describe('<Drawer />', () => {
  it('should pass a11y tests', async () => {
    await waitFor(() => {
      a11yTest(
        <Drawer.Root isOpen onClose={jest.fn()}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
    });
  });

  it('should contain the proper aria attributes', () => {
    render(
      <Drawer.Root isOpen onClose={jest.fn()}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>header</Drawer.Header>
          <Drawer.CloseButton />
          <Drawer.Body>body</Drawer.Body>
          <Drawer.Footer>footer</Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    );

    const drawer = screen.getByRole('dialog');

    expect(drawer).toHaveAttribute('aria-modal', 'true');

    // the id of `body` should equal the `aria-describedby` of the drawer
    expect(screen.getByText('body').id).toEqual(
      drawer.getAttribute('aria-describedby')
    );

    // the id of `header` should equal the `aria-labelledby` of the drawer
    expect(screen.getByText('header').id).toEqual(
      drawer.getAttribute('aria-labelledby')
    );
  });

  it('should call the onClose function when the close button is clicked', async () => {
    const mockOnClose = jest.fn();

    render(
      <Drawer.Root isOpen onClose={mockOnClose}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>Testing</Drawer.Header>
          <Drawer.CloseButton />
          <Drawer.Body>body</Drawer.Body>
          <Drawer.Footer>footer</Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    );

    const closeButton = screen.getByLabelText(/Close the modal/);

    userEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  describe('overlay click', () => {
    it('should call onClickOutside and not onClose when closeOnOverlayClick is true and onClickOutside is a function', async () => {
      const mockOnClickOutside = jest.fn();
      const mockOnClose = jest.fn();

      render(
        <Drawer.Root
          isOpen
          onClose={mockOnClose}
          onClickOutside={mockOnClickOutside}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
      const drawer = screen.getByRole('dialog');

      fireEvent.click(drawer.parentElement!);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    it('should call onClickOutside and not onClose when closeOnOverlayClick is true, onClickOutside is a function and closeOnEsc is false', async () => {
      const mockOnClickOutside = jest.fn();
      const mockOnClose = jest.fn();

      render(
        <Drawer.Root
          closeOnEsc={false}
          isOpen
          onClose={mockOnClose}
          onClickOutside={mockOnClickOutside}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
      const drawer = screen.getByRole('dialog');

      fireEvent.click(drawer.parentElement!);

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockOnClickOutside).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onClose nor onClickOutside when closeOnOverlayClick is false', async () => {
      const mockOnClickOutside = jest.fn();
      const mockOnClose = jest.fn();

      render(
        <Drawer.Root
          closeOnOverlayClick={false}
          isOpen
          onClose={mockOnClose}
          onClickOutside={mockOnClickOutside}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
      const drawer = screen.getByRole('dialog');

      fireEvent.click(drawer.parentElement!);

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

      render(
        <Drawer.Root isOpen onClose={mockOnClose} onEscPress={mockEscPress}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockEscPress).toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should call onEscPress and not onClose when closeOnEsc is true and onEscPress is a function and closeOnOverlayClick is false', async () => {
      const mockOnClose = jest.fn();
      const mockEscPress = jest.fn();

      render(
        <Drawer.Root
          closeOnOverlayClick={false}
          isOpen
          onClose={mockOnClose}
          onEscPress={mockEscPress}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockEscPress).toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should not call the onClose function when closeOnEsc is false', async () => {
      const mockOnClose = jest.fn();
      const mockEscPress = jest.fn();

      render(
        <Drawer.Root
          closeOnEsc={false}
          isOpen
          onClose={mockOnClose}
          onEscPress={mockEscPress}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>footer</Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => {
        expect(mockEscPress).not.toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });

  describe('focus', () => {
    it('should give focus back to the trigger element by default', async () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button
              type="button"
              data-testid="open-button"
              onClick={() => setIsOpen(true)}
            >
              Open
            </button>

            <Drawer.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <Drawer.Overlay />

              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </>
        );
      }
      render(<ModalTest />);

      const openButton = screen.getByTestId('open-button');

      // click the button
      userEvent.click(openButton);

      const closeButton = await screen.findByLabelText('Close the modal');

      userEvent.click(closeButton);

      // final button should be focused when Modal has closed
      await waitFor(() => expect(openButton).toHaveFocus());
    });

    it('should give focus to the close button by default', () => {
      function ModalTest() {
        return (
          <Drawer.Root isOpen onClose={jest.fn()}>
            <Drawer.Overlay />
            <Drawer.Content>
              <Drawer.Header>header</Drawer.Header>
              <Drawer.CloseButton />
              <Drawer.Body>
                <input />
              </Drawer.Body>
              <Drawer.Footer>footer</Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        );
      }
      render(<ModalTest />);

      const closeButton = screen.getByRole('button');

      expect(closeButton).toHaveFocus();
    });

    it('should give focus to the initialFocusRef element', () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
        const initialFocusRef = React.useRef(null);
        return (
          <>
            <button
              type="button"
              data-testid="open-button"
              onClick={() => setIsOpen(true)}
            >
              Open
            </button>

            <Drawer.Root
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={jest.fn()}
            >
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input data-testid="modal-input" ref={initialFocusRef} />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </>
        );
      }
      render(<ModalTest />);

      const openButton = screen.getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const modalInput = screen.getByTestId('modal-input');

      // modal input should be focused
      expect(modalInput).toHaveFocus();
    });

    it('should return focus to the finalFocusRef element', async () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
        const finalFocusRef = React.useRef(null);
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

            <Drawer.Root
              finalFocusRef={finalFocusRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Drawer.Overlay />

              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </>
        );
      }

      render(<ModalTest />);

      const openButton = screen.getByTestId('open-button');
      const finalButton = screen.getByTestId('final-button');

      // click the button
      fireEvent.click(openButton);

      const closeButton = screen.getByLabelText('Close the modal');

      fireEvent.click(closeButton);

      // final button should be focused when Modal has closed
      await waitFor(() => expect(finalButton).toHaveFocus());
    });

    it('should keep the active element focused when closeOnOverlayClick is false', async () => {
      function ModalTest() {
        const [isOpen, setIsOpen] = React.useState(false);
        const initialFocusRef = React.useRef(null);

        return (
          <>
            <button
              type="button"
              data-testid="open-button"
              onClick={() => setIsOpen(true)}
            >
              Open
            </button>

            <Drawer.Root
              closeOnOverlayClick={false}
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>body</Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Button
                    data-testid="cancel-button"
                    ref={initialFocusRef}
                  >
                    cancel
                  </Drawer.Button>
                  <Drawer.Button data-testid="delete-button">
                    delete
                  </Drawer.Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          </>
        );
      }

      const { getByRole, getByTestId, getByText } = render(<ModalTest />);
      const openButton = getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const modal = getByRole('dialog');
      const cancelButton = getByTestId('cancel-button');
      const deleteButton = getByTestId('delete-button');
      const body = getByText('body');

      expect(cancelButton).toHaveFocus();

      fireEvent.click(modal.parentElement!);
      expect(cancelButton).toHaveFocus();

      // shouldn't loose focus when clicking in side the drawer
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
          return (
            <Drawer.Root isOpen onClose={jest.fn()}>
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input data-testid="modal-input1" />
                  <input data-testid="modal-input2" />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          );
        }

        render(<ModalTest />);
        const closeButton = screen.getByRole('button');
        const modalInput1 = screen.getByTestId('modal-input1');
        const modalInput2 = screen.getByTestId('modal-input2');

        expect(closeButton).toHaveFocus();

        userEvent.tab();
        expect(modalInput1).toHaveFocus();

        userEvent.tab();
        // focus the last tabbable element
        expect(modalInput2).toHaveFocus();

        userEvent.tab();
        // return focus to the first element
        expect(closeButton).toHaveFocus();
      });

      it('should focus the next tabbable element and NOT wrap around to the first when trapFocus is false', () => {
        function ModalTest() {
          return (
            <Drawer.Root isOpen onClose={jest.fn()} trapFocus={false}>
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input data-testid="modal-input1" />
                  <input data-testid="modal-input2" />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          );
        }
        render(<ModalTest />);
        const closeButton = screen.getByRole('button');
        const modalInput1 = screen.getByTestId('modal-input1');
        const modalInput2 = screen.getByTestId('modal-input2');

        expect(closeButton).toHaveFocus();

        userEvent.tab();
        expect(modalInput1).toHaveFocus();

        userEvent.tab();
        // focus the last tabbable element
        expect(modalInput2).toHaveFocus();

        // tab outside the modal
        userEvent.tab();
        expect(closeButton).not.toHaveFocus();
        expect(modalInput1).not.toHaveFocus();
        expect(modalInput2).not.toHaveFocus();
      });
    });

    describe('Shift+Tab', () => {
      it('should focus the previous tabbable element and wrap around to the last by default', () => {
        function ModalTest() {
          const initialFocusRef = React.useRef(null);

          return (
            <Drawer.Root
              initialFocusRef={initialFocusRef}
              isOpen
              onClose={jest.fn()}
            >
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input data-testid="modal-input1" />
                  <input data-testid="modal-input2" ref={initialFocusRef} />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          );
        }

        render(<ModalTest />);
        const closeButton = screen.getByRole('button');
        const modalInput1 = screen.getByTestId('modal-input1');
        const modalInput2 = screen.getByTestId('modal-input2');

        expect(modalInput2).toHaveFocus();

        userEvent.tab({ shift: true });
        // focus the last tabbable element
        expect(modalInput1).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the first element
        expect(closeButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the last element
        expect(modalInput2).toHaveFocus();
      });

      it('should focus the previous tabbable element and NOT wrap around to the last when trapFocus is false', () => {
        function ModalTest() {
          const initialFocusRef = React.useRef(null);

          return (
            <Drawer.Root
              initialFocusRef={initialFocusRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <Drawer.Overlay />
              <Drawer.Content>
                <Drawer.Header>header</Drawer.Header>
                <Drawer.CloseButton />
                <Drawer.Body>
                  <input data-testid="modal-input1" />
                  <input data-testid="modal-input2" ref={initialFocusRef} />
                </Drawer.Body>
                <Drawer.Footer>footer</Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          );
        }

        render(<ModalTest />);
        const closeButton = screen.getByRole('button');
        const modalInput1 = screen.getByTestId('modal-input1');
        const modalInput2 = screen.getByTestId('modal-input2');

        expect(modalInput2).toHaveFocus();

        userEvent.tab({ shift: true });
        // focus the last tabbable element
        expect(modalInput1).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the first element
        expect(closeButton).toHaveFocus();

        userEvent.tab({ shift: true });
        // return focus to the last element
        expect(modalInput2).not.toHaveFocus();
      });
    });
  });

  describe('with <Drawer.Button>', () => {
    it('should call drawer button onclick functions', async () => {
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();

      render(
        <Drawer.Root isOpen onClose={() => {}}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>
              <Drawer.Button aria-label="cancel" onClick={mockCancel}>
                Cancel
              </Drawer.Button>
              <Drawer.Button aria-label="save" onClick={mockSubmit}>
                Save
              </Drawer.Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
      const cancelButton = screen.getByLabelText('cancel');
      const saveButton = screen.getByLabelText('save');

      fireEvent.click(cancelButton);
      await waitFor(() => expect(mockCancel).toHaveBeenCalledTimes(1));

      fireEvent.click(saveButton);
      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    });

    it('should not call the drawer onClose function', async () => {
      const mockClose = jest.fn();
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();

      render(
        <Drawer.Root isOpen onClose={mockClose}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>Testing</Drawer.Header>
            <Drawer.CloseButton />
            <Drawer.Body>body</Drawer.Body>
            <Drawer.Footer>
              <Drawer.Button aria-label="cancel" onClick={mockCancel}>
                Cancel
              </Drawer.Button>
              <Drawer.Button aria-label="save" onClick={mockSubmit}>
                Save
              </Drawer.Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Root>
      );
      const cancelButton = screen.getByLabelText('cancel');
      const saveButton = screen.getByLabelText('save');

      fireEvent.click(cancelButton);
      await waitFor(() => expect(mockClose).not.toHaveBeenCalled());

      fireEvent.click(saveButton);
      await waitFor(() => expect(mockClose).not.toHaveBeenCalled());
    });
  });
});
