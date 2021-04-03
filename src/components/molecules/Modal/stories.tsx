/* eslint react/jsx-wrap-multilines: 0 */
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import Modal from '.';
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
      <Modal
        body={<>This is a modal</>}
        footer={
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Save</Button>
          </>
        }
        header="Modal Title"
        onClose={handleClose}
        isOpen={isOpen}
      />
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
        body={
          <form>
            <TextInput
              floatLabel
              label="Email"
              margin="sm 0"
              ref={initialFocusRef}
            />
            <TextInput floatLabel label="Password" margin="sm 0" />
          </form>
        }
        footer={
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Signup</Button>
          </>
        }
        finalFocusRef={finalFocusRef}
        header="Create an account"
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      />
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
      <Modal
        body={
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
        }
        footer={
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClose}>Save</Button>
          </>
        }
        header="Modal with overflow"
        onClose={handleClose}
        isOpen={isOpen}
      />
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
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isXsModalOpen}
          onClose={() => setIsXsModalOpen(false)}
          size="xs"
        />
      </div>

      <div>
        <Button onClick={() => setIsSmModalOpen(true)} margin="0 sm">
          Open sm
        </Button>
        <Modal
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isSmModalOpen}
          onClose={() => setIsSmModalOpen(false)}
          size="sm"
        />
      </div>

      <div>
        <Button onClick={() => setIsMdModalOpen(true)} margin="0 sm">
          Open md
        </Button>
        <Modal
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isMdModalOpen}
          onClose={() => setIsMdModalOpen(false)}
          size="md"
        />
      </div>

      <div>
        <Button onClick={() => setIsLgModalOpen(true)} margin="0 sm">
          Open lg
        </Button>
        <Modal
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isLgModalOpen}
          onClose={() => setIsLgModalOpen(false)}
          size="lg"
        />
      </div>

      <div>
        <Button onClick={() => setIsXlModalOpen(true)} margin="0 sm">
          Open xl
        </Button>
        <Modal
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isXlModalOpen}
          onClose={() => setIsXlModalOpen(false)}
          size="xl"
        />
      </div>

      <div>
        <Button onClick={() => setIsXxlModalOpen(true)} margin="0 sm">
          Open xxl
        </Button>
        <Modal
          body={
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
          }
          footer={
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
          }
          header="Modal Title"
          isOpen={isXxlModalOpen}
          onClose={() => setIsXxlModalOpen(false)}
          size="xxl"
        />
      </div>
    </div>
  );
};
