/* eslint react/jsx-wrap-multilines: 0 */
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import Modal from '.';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';

export default {
  component: Modal,
  title: 'Supernova UI/Molecules/Modal',
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
      </div>
      <Modal onClose={handleClose} isOpen={isOpen}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>This is a modal</ModalBody>
        <ModalFooter>
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Save</Button>
          </>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const InitialAndFinalRefs = () => {
  const [isOpen, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const finalFocusRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setOpen(true)} margin="0 sm">
          Open
        </Button>
        <Button ref={finalFocusRef} variant="outline">
          finalFocusRef
        </Button>
      </div>
      <Modal
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <ModalHeader>Create an account</ModalHeader>
        <ModalBody>
          <form>
            <TextInput
              floatLabel
              label="Email"
              margin="sm 0"
              ref={initialFocusRef}
              typeOf="email"
            />
            <TextInput
              floatLabel
              label="Password"
              margin="sm 0"
              typeOf="password"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Signup</Button>
          </>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Overflow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
      </div>
      <Modal onClose={handleClose} isOpen={isOpen}>
        <ModalHeader>Modal with overflow</ModalHeader>
        <ModalBody>
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vulputate porttitor orci, quis vulputate felis suscipit tempus.
              Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
              lacinia auctor et elementum lectus.
            </p>
            <p>
              Cras at ante eu diam cursus pellentesque et a quam. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Sed in consequat risus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vulputate porttitor orci, quis vulputate felis suscipit tempus.
              Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
              lacinia auctor et elementum lectus.
            </p>
            <p>
              Cras at ante eu diam cursus pellentesque et a quam. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Sed in consequat risus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vulputate porttitor orci, quis vulputate felis suscipit tempus.
              Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
              lacinia auctor et elementum lectus.
            </p>
            <p>
              Cras at ante eu diam cursus pellentesque et a quam. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Sed in consequat risus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vulputate porttitor orci, quis vulputate felis suscipit tempus.
              Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
              lacinia auctor et elementum lectus.
            </p>
            <p>
              Cras at ante eu diam cursus pellentesque et a quam. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Sed in consequat risus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              vulputate porttitor orci, quis vulputate felis suscipit tempus.
              Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
              lacinia auctor et elementum lectus.
            </p>
            <p>
              Cras at ante eu diam cursus pellentesque et a quam. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Sed in consequat risus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
          </>
        </ModalBody>
        <ModalFooter>
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Save</Button>
          </>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Sizes = () => {
  const [isXsModalOpen, setIsXsModalOpen] = useState(false);
  const [isSmModalOpen, setIsSmModalOpen] = useState(false);
  const [isMdModalOpen, setIsMdModalOpen] = useState(false);
  const [isLgModalOpen, setIsLgModalOpen] = useState(false);
  const [isXlModalOpen, setIsXlModalOpen] = useState(false);
  const [isXxlModalOpen, setIsXxlModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Button onClick={() => setIsXsModalOpen(true)} margin="0 sm">
          Open xs
        </Button>
        <Modal
          isOpen={isXsModalOpen}
          onClose={() => setIsXsModalOpen(false)}
          size="xs"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsXsModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsXsModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsSmModalOpen(true)} margin="0 sm">
          Open sm
        </Button>
        <Modal
          isOpen={isSmModalOpen}
          onClose={() => setIsSmModalOpen(false)}
          size="sm"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsSmModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsSmModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsMdModalOpen(true)} margin="0 sm">
          Open md
        </Button>
        <Modal
          isOpen={isMdModalOpen}
          onClose={() => setIsMdModalOpen(false)}
          size="md"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsMdModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsMdModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsLgModalOpen(true)} margin="0 sm">
          Open lg
        </Button>
        <Modal
          isOpen={isLgModalOpen}
          onClose={() => setIsLgModalOpen(false)}
          size="lg"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsLgModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsLgModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsXlModalOpen(true)} margin="0 sm">
          Open xl
        </Button>
        <Modal
          isOpen={isXlModalOpen}
          onClose={() => setIsXlModalOpen(false)}
          size="xl"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsXlModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsXlModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Button onClick={() => setIsXxlModalOpen(true)} margin="0 sm">
          Open xxl
        </Button>
        <Modal
          isOpen={isXxlModalOpen}
          onClose={() => setIsXxlModalOpen(false)}
          size="xxl"
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vulputate porttitor orci, quis vulputate felis suscipit tempus.
                Morbi sollicitudin aliquet eleifend. Aenean eget enim ut arcu
                lacinia auctor et elementum lectus.
              </p>
              <p>
                Cras at ante eu diam cursus pellentesque et a quam. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Sed in consequat risus. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos.
              </p>
            </>
          </ModalBody>
          <ModalFooter>
            <>
              <Button
                onClick={() => setIsXxlModalOpen(false)}
                margin="0 sm 0 0"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsXxlModalOpen(false)}>Save</Button>
            </>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
