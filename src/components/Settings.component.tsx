import { SettingsIcon } from '@chakra-ui/icons';
import { Drawer } from '@chakra-ui/modal';
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { prop } from 'fp-tools';
import { USER } from '../redux/_keys';
import { Preferences } from './Preferences.component';
import { User } from '../types/User.type';
import { Footer } from './Footer.component';

interface SettingsProps {}
export const Settings: React.FC<SettingsProps> = () => {
  // [dependencies]
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const settingsBtn = React.useRef(null);

  // [component]
  const user: User = useSelector(prop(USER));

  return (
    <>
      <IconButton
        aria-label="Open Settings"
        bg="transparent"
        border="1px solid #333"
        borderRadius="5px"
        mr="1rem"
        tabIndex={0}
        icon={<SettingsIcon />}
        onClick={onOpen}
        ref={settingsBtn}
      />
      <Drawer
        finalFocusRef={settingsBtn}
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Preferences</DrawerHeader>

          <DrawerBody>
            <Preferences {...user} />
          </DrawerBody>

          <DrawerFooter>
            <Footer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
