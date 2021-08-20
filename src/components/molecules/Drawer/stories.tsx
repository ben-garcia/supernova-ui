/* eslint react/jsx-wrap-multilines: 0 */
import { Meta } from '@storybook/react';
import React, { useRef, useState } from 'react';

import Drawer from '.';
import DrawerFooter from './DrawerFooter';
import DrawerBody from './DrawerBody';
import DrawerHeader from './DrawerHeader';
import Button from '../../atoms/Button';
import TextInput from '../../atoms/TextInput';

export default {
  component: Drawer,
  title: 'Supernova UI/Molecules/Drawer',
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

      <Drawer onClose={handleClose} isOpen={isOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>

            <Button onClick={handleClose}>Save</Button>
          </>
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
          <>
            <Button onClick={handleClose} margin="0 sm 0 0" variant="outline">
              Cancel
            </Button>

            <Button onClick={handleClose}>Signup</Button>
          </>
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
          <>
            <Button
              onClick={() => setBottomIsOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </Button>

            <Button onClick={() => setBottomIsOpen(false)}>Save</Button>
          </>
        </DrawerFooter>
      </Drawer>

      <Drawer onClose={() => setLeftIsOpen(false)} isOpen={leftIsOpen}>
        <DrawerHeader>Drawer Title</DrawerHeader>
        <DrawerBody>This is a drawer</DrawerBody>
        <DrawerFooter>
          <>
            <Button
              onClick={() => setLeftIsOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </Button>

            <Button onClick={() => setLeftIsOpen}>Save</Button>
          </>
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
          <>
            <Button
              onClick={() => setRightIsOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </Button>

            <Button onClick={() => setRightIsOpen(false)}>Save</Button>
          </>
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
          <>
            <Button
              onClick={() => setTopIsOpen(false)}
              margin="0 sm 0 0"
              variant="outline"
            >
              Cancel
            </Button>

            <Button onClick={() => setTopIsOpen(false)}>Save</Button>
          </>
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
          </DrawerFooter>
        </Drawer>
      </div>
    </div>
  );
};
