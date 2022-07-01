/* eslint react/jsx-wrap-multilines: 0 */
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import Drawer from '.';
import DrawerBody from './DrawerBody';
import DrawerButton from './DrawerButton';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';

export default {
  component: Drawer,
  title: 'Supernova UI/Molecules/Drawer',
} as Meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    console.log('handle close');
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Button onClick={() => setIsOpen(true)} margin="0 sm">
          Open
        </Button>
      </div>

      <Drawer onClose={handleClose} isOpen={isOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => {
              console.log('cancel');
              setIsOpen(false);
            }}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton
            onClick={() => {
              console.log('save');
              setIsOpen(false);
            }}
          >
            Save
          </DrawerButton>
        </DrawerFooter>
      </Drawer>
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

      <Drawer
        finalFocusRef={finalFocusRef}
        initialFocusRef={initialFocusRef}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <DrawerHeader>Create an account</DrawerHeader>

        <DrawerBody>
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
        </DrawerBody>

        <DrawerFooter>
          <DrawerButton
            onClick={handleClose}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton onClick={handleClose}>Signup</DrawerButton>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const Position = () => {
  const [bottomIsOpen, setBottomIsOpen] = useState(false);
  const [leftIsOpen, setLeftIsOpen] = useState(false);
  const [rightIsOpen, setRightIsOpen] = useState(false);
  const [topIsOpen, setTopIsOpen] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setBottomIsOpen(true)} margin="0 sm">
          Open bottom
        </Button>

        <Button onClick={() => setLeftIsOpen(true)} margin="0 sm">
          Open left
        </Button>

        <Button onClick={() => setRightIsOpen(true)} margin="0 sm">
          Open right
        </Button>

        <Button onClick={() => setTopIsOpen(true)} margin="0 sm">
          Open top
        </Button>
      </div>

      <Drawer
        onClose={() => setBottomIsOpen(false)}
        isOpen={bottomIsOpen}
        position="bottom"
      >
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => setBottomIsOpen(false)}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton onClick={() => setBottomIsOpen(false)}>
            Save
          </DrawerButton>
        </DrawerFooter>
      </Drawer>

      <Drawer onClose={() => setLeftIsOpen(false)} isOpen={leftIsOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => setLeftIsOpen(false)}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton onClick={() => setLeftIsOpen}>Save</DrawerButton>
        </DrawerFooter>
      </Drawer>

      <Drawer
        onClose={() => setRightIsOpen(false)}
        isOpen={rightIsOpen}
        position="right"
      >
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => setRightIsOpen(false)}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton onClick={() => setRightIsOpen(false)}>
            Save
          </DrawerButton>
        </DrawerFooter>
      </Drawer>

      <Drawer
        onClose={() => setTopIsOpen(false)}
        isOpen={topIsOpen}
        position="top"
      >
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <DrawerButton
            onClick={() => setTopIsOpen(false)}
            margin="0 sm 0 0"
            variant="outline"
          >
            Cancel
          </DrawerButton>

          <DrawerButton onClick={() => setTopIsOpen(false)}>Save</DrawerButton>
        </DrawerFooter>
      </Drawer>
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

        <Drawer
          isOpen={isXsModalOpen}
          onClose={() => setIsXsModalOpen(false)}
          size="xs"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsXsModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>

            <DrawerButton onClick={() => setIsXsModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>

      <div>
        <Button onClick={() => setIsSmModalOpen(true)} margin="0 sm">
          Open sm
        </Button>

        <Drawer
          isOpen={isSmModalOpen}
          onClose={() => setIsSmModalOpen(false)}
          size="sm"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsSmModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>
            <DrawerButton onClick={() => setIsSmModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>

      <div>
        <Button onClick={() => setIsMdModalOpen(true)} margin="0 sm">
          Open md
        </Button>

        <Drawer
          isOpen={isMdModalOpen}
          onClose={() => setIsMdModalOpen(false)}
          size="md"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsMdModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>

            <DrawerButton onClick={() => setIsMdModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>

      <div>
        <Button onClick={() => setIsLgModalOpen(true)} margin="0 sm">
          Open lg
        </Button>

        <Drawer
          isOpen={isLgModalOpen}
          onClose={() => setIsLgModalOpen(false)}
          size="lg"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsLgModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>

            <DrawerButton onClick={() => setIsLgModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>

      <div>
        <Button onClick={() => setIsXlModalOpen(true)} margin="0 sm">
          Open xl
        </Button>

        <Drawer
          isOpen={isXlModalOpen}
          onClose={() => setIsXlModalOpen(false)}
          size="xl"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsXlModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>

            <DrawerButton onClick={() => setIsXlModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>

      <div>
        <Button onClick={() => setIsXxlModalOpen(true)} margin="0 sm">
          Open xxl
        </Button>

        <Drawer
          isOpen={isXxlModalOpen}
          onClose={() => setIsXxlModalOpen(false)}
          size="xxl"
        >
          <DrawerHeader>Modal Title</DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>

          <DrawerFooter>
            <DrawerButton
              onClick={() => setIsXxlModalOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </DrawerButton>

            <DrawerButton onClick={() => setIsXxlModalOpen(false)}>
              Save
            </DrawerButton>
          </DrawerFooter>
        </Drawer>
      </div>
    </div>
  );
};
