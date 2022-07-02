import React from 'react';

import Drawer from '.';
import DrawerBody from './DrawerBody';
import DrawerButton from './DrawerButton';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';
import {
  a11yTest,
  fireEvent,
  mockMatchMedia,
  render,
  screen,
  userEvent,
  waitFor, // wait for the set timeout function to be called
} from '../../../test-utils';

describe('<Drawer />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    await a11yTest(
      <Drawer isOpen onClose={jest.fn()}>
        <DrawerHeader>Testing</DrawerHeader>
        <DrawerBody>body</DrawerBody>
        <DrawerFooter>footer</DrawerFooter>
      </Drawer>
    );
  });

  it('should contain the proper aria attributes', () => {
    render(
      <Drawer isOpen onClose={jest.fn()}>
        <DrawerHeader>header</DrawerHeader>
        <DrawerBody>body</DrawerBody>
        <DrawerFooter>footer</DrawerFooter>
      </Drawer>
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
      <Drawer isOpen onClose={mockOnClose}>
        <DrawerHeader>Testing</DrawerHeader>
        <DrawerBody>body</DrawerBody>
        <DrawerFooter>footer</DrawerFooter>
      </Drawer>
    );

    const closeButton = screen.getByLabelText(/Close the modal/);

    fireEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  describe('overlay click', () => {
    it('should call the onClose function when the overlay window is clicked', async () => {
      const mockOnClose = jest.fn();

      render(
        <Drawer isOpen onClose={mockOnClose}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>footer</DrawerFooter>
        </Drawer>
      );
      const drawer = screen.getByRole('dialog');

      fireEvent.click(drawer.parentElement!);

      await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
    });

    it('should not call the onClose function when closeOnOverlayClick is false', async () => {
      const mockOnClose = jest.fn();

      render(
        <Drawer closeOnOverlayClick={false} isOpen onClose={mockOnClose}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>footer</DrawerFooter>
        </Drawer>
      );
      const drawer = screen.getByRole('dialog');

      fireEvent.click(drawer.parentElement!);

      await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(0));
    });
  });

  describe('esc key', () => {
    it('should call the onClose function when the esc key is pressed', async () => {
      const mockOnClose = jest.fn();

      render(
        <Drawer isOpen onClose={mockOnClose}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>footer</DrawerFooter>
        </Drawer>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
    });

    it('should not call the onClose function when closeOnEsc is false', async () => {
      const mockOnClose = jest.fn();

      render(
        <Drawer closeOnEsc={false} isOpen onClose={mockOnClose}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>footer</DrawerFooter>
        </Drawer>
      );

      fireEvent.keyDown(window, { key: 'Escape' });

      await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(0));
    });
  });

  describe('focus', () => {
    it('should give focus to the close button by default', () => {
      const ModalTest = () => (
        <Drawer isOpen onClose={jest.fn()}>
          <DrawerHeader>header</DrawerHeader>
          <DrawerBody>
            <input />
          </DrawerBody>
          <DrawerFooter>footer</DrawerFooter>
        </Drawer>
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

            <Drawer
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={jest.fn()}
            >
              <DrawerHeader>header</DrawerHeader>
              <DrawerBody>
                <input data-testid="modal-input" ref={initialFocusRef} />
              </DrawerBody>
              <DrawerFooter>footer</DrawerFooter>
            </Drawer>
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

    it('should give focus to initialFocusRef as <DrawerButton>', () => {
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
            <Drawer
              initialFocusRef={initialFocusRef}
              isOpen={isOpen}
              onClose={jest.fn()}
            >
              <DrawerHeader>header</DrawerHeader>
              <DrawerBody>
                <input data-testid="modal-input" ref={initialFocusRef} />
              </DrawerBody>
              <DrawerFooter>
                <DrawerButton ref={initialFocusRef}>focus</DrawerButton>
              </DrawerFooter>
            </Drawer>
          </>
        );
      };
      render(<ModalTest />);
      const openButton = screen.getByTestId('open-button');

      // click the button
      fireEvent.click(openButton);

      const drawerButton = screen.getByText('focus');

      // drawer button should be focused
      expect(drawerButton).toHaveFocus();
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

            <Drawer
              finalFocusRef={finalFocusRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <DrawerHeader>header</DrawerHeader>
              <DrawerBody>
                <input />
              </DrawerBody>
              <DrawerFooter>footer</DrawerFooter>
            </Drawer>
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
          <Drawer isOpen onClose={jest.fn()}>
            <DrawerHeader>header</DrawerHeader>
            <DrawerBody>
              <input data-testid="modal-input1" />
              <input data-testid="modal-input2" />
            </DrawerBody>
            <DrawerFooter>footer</DrawerFooter>
          </Drawer>
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
          <Drawer isOpen onClose={jest.fn()} trapFocus={false}>
            <DrawerHeader>header</DrawerHeader>
            <DrawerBody>
              <input data-testid="modal-input1" />
              <input data-testid="modal-input2" />
            </DrawerBody>
            <DrawerFooter>footer</DrawerFooter>
          </Drawer>
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
            <Drawer
              initialFocusRef={initialFocusRef}
              isOpen
              onClose={jest.fn()}
            >
              <DrawerHeader>header</DrawerHeader>
              <DrawerBody>
                <input data-testid="modal-input1" />
                <input data-testid="modal-input2" ref={initialFocusRef} />
              </DrawerBody>
              <DrawerFooter>footer</DrawerFooter>
            </Drawer>
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
            <Drawer
              initialFocusRef={initialFocusRef}
              isOpen
              onClose={jest.fn()}
              trapFocus={false}
            >
              <DrawerHeader>header</DrawerHeader>
              <DrawerBody>
                <input data-testid="modal-input1" />
                <input data-testid="modal-input2" ref={initialFocusRef} />
              </DrawerBody>
              <DrawerFooter>footer</DrawerFooter>
            </Drawer>
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

  describe('with <DrawerButton>', () => {
    it('should call drawer button onclick functions', async () => {
      const mockCancel = jest.fn();
      const mockSubmit = jest.fn();

      render(
        <Drawer isOpen onClose={() => {}}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>
            <DrawerButton aria-label="cancel" onClick={mockCancel}>
              Cancel
            </DrawerButton>
            <DrawerButton aria-label="save" onClick={mockSubmit}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
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
        <Drawer isOpen onClose={mockClose}>
          <DrawerHeader>Testing</DrawerHeader>
          <DrawerBody>body</DrawerBody>
          <DrawerFooter>
            <DrawerButton aria-label="cancel" onClick={mockCancel}>
              Cancel
            </DrawerButton>
            <DrawerButton aria-label="save" onClick={mockSubmit}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
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
