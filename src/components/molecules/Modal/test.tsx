/* eslint react/jsx-wrap-multilines: 0 */
import React from 'react';

import Modal from '.';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
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
    const { getByTestId, getByText } = render(
      <Modal data-testid="modal" isOpen onClose={jest.fn()}>
        <ModalHeader>header</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );

    const modal = getByTestId('modal');

    // should have 'aria-modal' set to 'true' and 'role' of 'dialog'
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('role', 'dialog');

    // the id of `body` should equal the `aria-describedby` of the modal
    expect(getByText('body').parentElement!.id).toEqual(
      modal.getAttribute('aria-describedby')
    );

    // the id of `header` should equal the `aria-labelledby` of the modal
    expect(getByText('header').id).toEqual(
      modal.getAttribute('aria-labelledby')
    );
  });

  it('should call the onClose function when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    const { getByLabelText } = render(
      <Modal data-testid="modal" isOpen onClose={mockOnClose}>
        <ModalHeader>Testing</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );
    const closeButton = getByLabelText('Close the modal');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  describe('overlay click', () => {
    it('should call the onClose function when the overlay window is clicked', () => {
      const mockOnClose = jest.fn();
      const { getByTestId } = render(
        <Modal data-testid="modal" isOpen onClose={mockOnClose}>
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );
      const modal = getByTestId('modal');

      fireEvent.click(modal.parentElement!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClose function when closeOnOverlayClick is false', () => {
      const mockOnClose = jest.fn();
      const { getByTestId } = render(
        <Modal
          closeOnOverlayClick={false}
          data-testid="modal"
          isOpen
          onClose={mockOnClose}
        >
          <ModalHeader>Testing</ModalHeader>
          <ModalBody>body</ModalBody>
          <ModalFooter>footer</ModalFooter>
        </Modal>
      );
      const modal = getByTestId('modal');

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
    const { getByTestId } = render(<ModalTest />);
    const openButton = getByTestId('open-button');

    // click the button
    fireEvent.click(openButton);

    const modalInput = getByTestId('modal-input');

    // modal input should be focused
    expect(modalInput).toHaveFocus();
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
          <button data-testid="final-button" ref={finalFocusRef} type="button">
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
    const { getByLabelText, getByTestId } = render(<ModalTest />);
    const openButton = getByTestId('open-button');
    const finalButton = getByTestId('final-button');

    // click the button
    fireEvent.click(openButton);

    const closeButton = getByLabelText('Close the modal');

    fireEvent.click(closeButton);

    // final button should be focused when Modal has closed
    // await waitFor(() => expect(finalButton).toHaveFocus());
    expect(finalButton).toHaveFocus();
  });
});
