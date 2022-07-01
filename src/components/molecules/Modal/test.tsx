import React from 'react';

import Modal from '.';
import ModalBody from './ModalBody';
import ModalButton from './ModalButton';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  screen,
  userEvent,
  waitFor, // wait for the set timeout function to be called
} from '../../../test-utils';

describe('<Modal />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    await a11yTest(
      <Modal isOpen onClose={jest.fn()}>
        <ModalHeader>Testing</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );
  });

  it('should contain the proper aria attributes', () => {
    render(
      <Modal isOpen onClose={jest.fn()}>
        <ModalHeader>header</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );

    const modal = screen.getByRole('dialog');

    // should have 'aria-modal' set to 'true' and 'role' of 'dialog'
    expect(modal).toHaveAttribute('aria-modal', 'true');

    // the id of `body` should equal the `aria-describedby` of the modal
    expect(screen.getByText('body').id).toEqual(
      modal.getAttribute('aria-describedby')
    );

    // the id of `header` should equal the `aria-labelledby` of the modal
    expect(screen.getByText('header').id).toEqual(
      modal.getAttribute('aria-labelledby')
    );
  });

  it('should call the onClose function when the close button is clicked', async () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen onClose={mockOnClose}>
        <ModalHeader>Testing</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );
    const closeButton = screen.getByLabelText('Close the modal');

    fireEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  describe('overlay click', () => {
    it('should call the onClose function when the overlay window is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal isOpen onClose={mockOnClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );
      const modal = screen.getByRole('dialog');

      fireEvent.click(modal.parentElement!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClose function when closeOnOverlayClick is false', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal closeOnOverlayClick={false} isOpen onClose={mockOnClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );
      const modal = screen.getByRole('dialog');

      fireEvent.click(modal.parentElement!);

      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('esc key', () => {
    it('should call the onClose function when the esc key is pressed', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal isOpen onClose={mockOnClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClose function when closeOnEsc is false', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal closeOnEsc={false} isOpen onClose={mockOnClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('focus', () => {
    it('should give focus to the close button by default', () => {
      const ModalTest = () => (
        <Modal isOpen onClose={jest.fn()}>
          <ModalHeader>header</ModalHeader>
          <ModalBody>
            <input />
          </ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );
      render(<ModalTest />);
      const closeButton = screen.getByRole('button');

      expect(closeButton).toHaveFocus();
    });

    it('should give focus to the initialFocusRef element', () => {
      const ModalTest = () => {
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
            <Modal
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={jest.fn()}
            >
              <ModalHeader>header</ModalHeader>
              <ModalBody>
                <input data-testid="modal-input" ref={initialFocusRef} />
              </ModalBody>
              <ModalFooter>footer</ModalFooter>
            </Modal>
          </>
        );
      };
      render(<ModalTest />);
      const openButton = screen.getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const modalInput = screen.getByTestId('modal-input');

      // modal input should be focused
      expect(modalInput).toHaveFocus();
    });

    it('should give focus to initialFocusRef as <ModalButton>', () => {
      const ModalTest = () => {
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
            <Modal
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={jest.fn()}
            >
              <ModalHeader>header</ModalHeader>
              <ModalBody>
                <input data-testid="modal-input" ref={initialFocusRef} />
              </ModalBody>
              <ModalFooter>
                <ModalButton ref={initialFocusRef}>focus</ModalButton>
              </ModalFooter>
            </Modal>
          </>
        );
      };
      render(<ModalTest />);
      const openButton = screen.getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const modalButton = screen.getByText('focus');

      // modal button should be focused
      expect(modalButton).toHaveFocus();
    });

    it('should return focus to the finalFocusRef element', async () => {
      const ModalTest = () => {
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
            <Modal
              finalFocusRef={finalFocusRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <ModalHeader>header</ModalHeader>
              <ModalBody>
                <input />
              </ModalBody>
              <ModalFooter>footer</ModalFooter>
            </Modal>
          </>
        );
      };
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
  });

  describe('keyboard navigation', () => {
    describe('Tab', () => {
      it('should focus the next tabbable element and wrap around to the first by default', () => {
        const ModalTest = () => (
          <Modal isOpen onClose={jest.fn()}>
            <ModalHeader>header</ModalHeader>
            <ModalBody>
              <input data-testid="modal-input1" />
              <input data-testid="modal-input2" />
            </ModalBody>
            <ModalFooter>footer</ModalFooter>
          </Modal>
        );

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
        const ModalTest = () => (
          <Modal isOpen onClose={jest.fn()} trapFocus={false}>
            <ModalHeader>header</ModalHeader>
            <ModalBody>
              <input data-testid="modal-input1" />
              <input data-testid="modal-input2" />
            </ModalBody>
            <ModalFooter>footer</ModalFooter>
          </Modal>
        );
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
        const ModalTest = () => {
          const initialFocusRef = React.useRef(null);

          return (
            <Modal initialFocusRef={initialFocusRef} isOpen onClose={jest.fn()}>
              <ModalHeader>header</ModalHeader>
              <ModalBody>
                <input data-testid="modal-input1" />
                <input data-testid="modal-input2" ref={initialFocusRef} />
              </ModalBody>
              <ModalFooter>footer</ModalFooter>
            </Modal>
          );
        };

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
        const ModalTest = () => {
          const initialFocusRef = React.useRef(null);

          return (
            <Modal
              initialFocusRef={initialFocusRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <ModalHeader>header</ModalHeader>
              <ModalBody>
                <input data-testid="modal-input1" />
                <input data-testid="modal-input2" ref={initialFocusRef} />
              </ModalBody>
              <ModalFooter>footer</ModalFooter>
            </Modal>
          );
        };

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

  describe('with ModalButton', () => {
    it('should call modal button onclick functions', async () => {
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();

      render(
        <Modal isOpen onClose={() => {}}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>
            <ModalButton aria-label="cancel" onClick={mockCancel}>
              Cancel
            </ModalButton>
            <ModalButton aria-label="save" onClick={mockSubmit}>
              Save
            </ModalButton>
          </ModalFooter>
        </Modal>
      );
      const cancelButton = screen.getByLabelText('cancel');
      const saveButton = screen.getByLabelText('save');

      fireEvent.click(cancelButton);
      await waitFor(() => expect(mockCancel).toHaveBeenCalledTimes(1));

      fireEvent.click(saveButton);
      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    });

    it('should not call the modal onClose function', async () => {
      const mockClose = jest.fn();
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();

      render(
        <Modal isOpen onClose={mockClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>
            <ModalButton aria-label="cancel" onClick={mockCancel}>
              Cancel
            </ModalButton>
            <ModalButton aria-label="save" onClick={mockSubmit}>
              Save
            </ModalButton>
          </ModalFooter>
        </Modal>
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
